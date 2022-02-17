import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { RegisterService } from '../../../login/services/register.service';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {
  public formGroup: FormGroup;
  public id_company: number;
  public isfollow = false;
  public empactual: number;
  public favs: any;
  public params: any;
  //arreglos de datos
  public arrVacancies: any = [];
  public allVacancies: any = [];
  public arrReviews: any[] = [];
  public arrInfo: any[] = [];
  public avg: number;
  public elegido: string = 'Mas recientes';
  public vacio: boolean = true;
  //paginacion
  public p: number = 1;
  public numPages: number = 2;
  public paginas: number;

  public txtBuscar: string = null;

  public fecha: Date = new Date();
  public fechaHoy =
    this.fecha.getUTCFullYear() +
    '-' +
    (this.fecha.getUTCMonth() + 1) +
    '-' +
    this.fecha.getUTCDate();
  public fechaAyer =
    this.fecha.getUTCFullYear() +
    '-' +
    (this.fecha.getUTCMonth() + 1) +
    '-' +
    (this.fecha.getUTCDate() - 1);
  public fechaSemPas =
    this.fecha.getUTCFullYear() +
    '-' +
    (this.fecha.getUTCMonth() + 1) +
    '-' +
    (this.fecha.getUTCDate() - 7);
  public fechaUlQui =
    this.fecha.getUTCFullYear() +
    '-' +
    (this.fecha.getUTCMonth() + 1) +
    '-' +
    (this.fecha.getUTCDate() - 15);

  constructor(
    private servicio: RegisterService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.iniciarForm(); //inicializar el formulario
    this.params = this.route.snapshot.params; //obtener los parametros de la url
    this.id_company = this.params.id; //Me traigo el id de la compañia
    this.getEmpresa(); //obtener la empresa
    console.log(this.arrReviews);
    console.log(this.arrInfo);
    console.log(this.arrVacancies);
  }

  iniciarForm(): void {
    this.formGroup = this.fb.group({
      min: [''],
      max: [''],
    });
  }

  public seguirEmpresa(idEmpresa: number) {
    this.arrReviews = [];
    if (localStorage.getItem('token') != null) {
      this.servicio
        .seguirEmpresas(localStorage.getItem('token'), idEmpresa)
        .subscribe((data: Data) => {
          this.ngOnInit();
          console.log(data);
          this.isfollow = false;
        }),
        (error: HttpErrorResponse) => {
          console.log(error);
        };
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Debes iniciar sesión para seguir a esta empresa',
        confirmButtonColor: '#1c4a83',
        confirmButtonText: 'Iniciar sesión',
        focusConfirm: false,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/login';
        }
      });
    }
  }

  public olvidarEmpresa(idFavorito: number) {
    this.arrReviews = [];
    this.servicio
      .olvidarEmpresas(localStorage.getItem('token'), idFavorito)
      .subscribe((data: Data) => {
        this.ngOnInit();
        console.log(data);
      }),
      (error: HttpErrorResponse) => {
        console.log(error);
      };
  }

  public verificarSeguir(empactual: number) {
    //si el usuario esta logueado
    if (localStorage.getItem('token') != null) {
      this.servicio.getFavs(localStorage.getItem('token')).subscribe(
        (data: Data) => {
          console.log(data);
          //verificar si la empresa esta en favoritos
          this.favs = data['data'].companies.filter(
            (fav) => fav.id_fav == empactual
          );
          //si esta en favoritos, cambiar el estado de isfollow a true
          if (this.favs.length == 0) this.isfollow = true;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    } else {
      //si no esta logueado, cambiar el estado de isfollow a true,
      // para que  el boton de seguir aparezca y poder mostrarle al usuario un modal
      //invitandolo a seguir la empresa
      this.isfollow = true;
    }
    return empactual;
  }

  public getEmpresa() {
    this.arrVacancies = [];
    Swal.fire({
      title: 'Obteniendo datos de la empresa.',
      html: 'Espera un momento por favor',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        return this.servicio
          .getDatosCompañia(this.id_company, localStorage.getItem('token'))
          .subscribe(
            (data: Data) => {
              Swal.close();
              console.log(data);
              for (let item of data['data'].reviews) {
                this.arrReviews.push(item);
              }
              for (let item of data['data'].vacancies) {
                this.arrVacancies.push(item);
                this.allVacancies.push(item);
              }
              Object.entries(data['data'].info).forEach(([key, value]) => {
                this.arrInfo[key] = value;
                this.arrInfo['profile_pic']= 'https://capitalempleo.com/profile_pic/'+ data['data'].info['profile_pic'];
              });
              this.empactual = data['data'].follow.id_follow;
              this.paginas = Math.ceil(
                this.arrVacancies.length / this.numPages
              );
              this.verificarSeguir(this.empactual);
            },
            (error: HttpErrorResponse) => {
              Swal.close();
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salió mal, intentalo de nuevo',
                confirmButtonColor: '#1c4a83',
                confirmButtonText: 'Ok',
                focusConfirm: false,
              });
            }
          );
      },
    });
  }

  public fakeArray(numero: number) {
    let arrf = [];
    for (let i = 0; i < Math.floor(numero); i++) {
      arrf.push(i);
    }
    return arrf;
  }

  public ordenarScoreMay() {
    this.arrReviews.sort((a, b) => {
      if (a.score < b.score) {
        return 1;
      }
      if (a.score > b.score) {
        return -1;
      }
      return 0;
    });
    return this.arrReviews, (this.elegido = 'Mayor calificación');
  }

  public ordenarScoreMen() {
    this.arrReviews.sort((a, b) => {
      if (a.score < b.score) {
        return -1;
      }
      if (a.score > b.score) {
        return 1;
      }
      return 0;
    });
    return this.arrReviews, (this.elegido = 'Menor calificación');
  }

  public ordenarFecha() {
    this.arrReviews.sort((a, b) => {
      if (a.datetime < b.datetime) {
        return 1;
      }
      if (a.datetime > b.datetime) {
        return -1;
      }
      return 0;
    });
    return this.arrReviews, (this.elegido = 'Más recientes');
  }

  public ordenarFecha2() {
    this.arrReviews.sort((a, b) => {
      if (a.datetime < b.datetime) {
        return -1;
      }
      if (a.datetime > b.datetime) {
        return 1;
      }
      return 0;
    });
    return this.arrReviews, (this.elegido = 'Más antiguos');
  }

  public ordenarVacanciesSm() {
    this.arrVacancies.sort((a, b) => {
      if (a.min_salary < b.min_salary) {
        return 1;
      }
      if (a.min_salary > b.min_salary) {
        return -1;
      }
      return 0;
    });
    return this.arrReviews, (this.elegido = 'Salario minimo');
  }

  public ordenarVacanciesSmax() {
    this.arrVacancies.sort((a, b) => {
      if (a.min_salary < b.min_salary) {
        return -1;
      }
      if (a.min_salary > b.min_salary) {
        return 1;
      }
      return 0;
    });
    return this.arrReviews, (this.elegido = 'Salario maximo');
  }

  public buscar() {
    this.arrVacancies = this.allVacancies.filter((vac) =>
      vac.location.toLowerCase().includes(this.txtBuscar.toLowerCase())
    );
    this.paginas = Math.ceil(this.arrVacancies.length / this.numPages);
    return this.arrVacancies;
  }

  public fechaPublicacion(param: any) {
    this.arrVacancies = this.allVacancies.filter((vac) =>
      vac.date_published.includes(param)
    );
    this.paginas = Math.ceil(this.arrVacancies.length / this.numPages);
    return this.arrVacancies;
  }

  public tipodeTrabajo(param: string) {
    this.arrVacancies = this.allVacancies.filter((vac) =>
      vac.job_type.includes(param)
    );
    this.paginas = Math.ceil(this.arrVacancies.length / this.numPages);
    return this.arrVacancies;
  }

  public modoEmpleo(param: string) {
    this.arrVacancies = this.allVacancies.filter((vac) =>
      vac.modality.includes(param)
    );
    this.paginas = Math.ceil(this.arrVacancies.length / this.numPages);
    return this.arrVacancies;
  }

  public nivelEducativo(param: string) {
    this.arrVacancies = this.allVacancies.filter((vac) =>
      vac.education.includes(param)
    );
    this.paginas = Math.ceil(this.arrVacancies.length / this.numPages);
    return this.arrVacancies;
  }

  public limpiar() {
    this.arrVacancies = [];
    this.arrVacancies = this.allVacancies;
    this.paginas = Math.ceil(this.arrVacancies.length / this.numPages);
    this.formGroup.reset();
    return this.arrVacancies;
  }

  public rango() {
    if (
      this.formGroup.get('min').value == '' ||
      this.formGroup.get('max').value == ''
    ) {
      console.log('no selecciono nada');
    } else {
      this.arrVacancies = this.allVacancies.filter(
        (vac) =>
          (this.formGroup.get('min').value >= vac.min_salary &&
            this.formGroup.get('max').value <= vac.max_salary) ||
          (this.formGroup.get('min').value <= vac.max_salary &&
            this.formGroup.get('max').value >= vac.min_salary)
      );
    }
    return this.arrVacancies;
  }

}
