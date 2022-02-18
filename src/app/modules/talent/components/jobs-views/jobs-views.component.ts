import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RegisterService } from 'src/app/modules/login/services/register.service';

@Component({
  selector: 'app-jobs-views',
  templateUrl: './jobs-views.component.html',
  styleUrls: ['./jobs-views.component.css']
})
export class JobsViewsComponent implements OnInit {
  public formGroup: FormGroup;
  public arrApplications: any[] = [];
  public arrFavsVacancies: any[] = [];
  public allFavsVacancies: any[] = [];
  public arrCompanies: any[] = [];
  public arrVisualizations: any[] = [];
  public arrFavs: any[] = [];
  public visible: boolean;
  public arrVisible = [];
  public vacio: boolean = true;
  public elegido: string = 'Mas recientes';

  //paginacion
  public p: any = 1;
  public p1: any = 1;
  public p2: any = 1;
  public p3: any = 1;
  public pcompany: number = 1;
  public numPages: number = 2;
  public paginas: number;
  public paginas1: number;
  public paginas2: number;
  public paginas3: number;

  public txtBuscar: string = null;

  //Filtros por fecha
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
    (this.fecha.getUTCDate() - 7);
  public fechaUlQui =
    this.fecha.getUTCFullYear() +
    '-' +
    (this.fecha.getUTCMonth() + 1) +
    (this.fecha.getUTCDate() - 15);

  constructor(
    private servicio: RegisterService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      //limpiar Notificaciones
      this.updateNotify('applications');
      this.iniciarForm(); //inicializar el formulario de filtros de salario
      this.arrVisible = [true, false, false, false];
      this.obtenerFavoritos(); //obtener los empleos favoritos del usuario
      this.getFavsCompanies(); //obtener las empresas favoritas del usuario
      this.getVistas(); //obtener las visualizaciones del usuario
      this.getPostulaciones(); //obtener las aplicaciones del usuario
      /*     console.log(
      this.arrFavs,
      this.arrFavsVacancies,
      this.arrApplications,
      this.arrVisualizations,
      this.arrCompanies
    ); */
    } else {
      this.router.navigate(['/login']);
    }
  }

  public checkSession() {
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['/login']);
    }
  }

  iniciarForm(): void {
    this.formGroup = this.fb.group({
      min: [''],
      max: [''],
    });
  }

  public ordenar(narr: number) {
    if (narr == 1) {
      this.arrFavs.sort((a, b) => {
        if (a.id_fav_job < b.id_fav_job) {
          return 1;
        }
        if (a.id_fav_job > b.id_fav_job) {
          return -1;
        }
        return 0;
      });
      return this.arrFavs, (this.elegido = 'Mas recientes');
    } else if (narr == 2) {
      this.arrFavsVacancies.sort((a, b) => {
        if (a.new < b.new) {
          return 1;
        }
        if (a.new > b.new) {
          return -1;
        }
        return 0;
      });
      return this.arrFavsVacancies, (this.elegido = 'Mas recientes');
    } else if (narr == 0) {
      this.arrApplications.sort((a, b) => {
        if (a.applied_date < b.applied_date) {
          return 1;
        }
        if (a.applied_date > b.applied_date) {
          return -1;
        }
        return 0;
      });
      return this.arrApplications, (this.elegido = 'Mas recientes');
    }
  }

  public ordenaraz() {
    this.arrFavs.sort((a, b) => {
      if (a.vacant_name < b.vacant_name) {
        return -1;
      }
      if (a.vacant_name > b.vacant_name) {
        return 1;
      }
      return 0;
    });
    return this.arrFavs, (this.elegido = 'Ordenar A-Z');
  }

  public ordenarza() {
    this.arrFavs.sort((a, b) => {
      if (a.vacant_name < b.vacant_name) {
        return 1;
      }
      if (a.vacant_name > b.vacant_name) {
        return -1;
      }
      return 0;
    });
    return this.arrFavs, (this.elegido = 'Ordenar Z-A');
  }

  public ordSalarioMin(narr: number) {
    if (narr == 1) {
      this.arrFavs.sort((a, b) => {
        if (a.min_salary < b.min_salary) {
          return 1;
        }
        if (a.min_salary > b.min_salary) {
          return -1;
        }
        return 0;
      });
      return this.arrFavs, (this.elegido = 'Salario Minimo');
    } else if (narr == 2) {
      this.arrFavsVacancies.sort((a, b) => {
        if (a.min_salary < b.min_salary) {
          return 1;
        }
        if (a.min_salary > b.min_salary) {
          return -1;
        }
        return 0;
      });
      return this.arrFavsVacancies, (this.elegido = 'Salario Minimo');
    } else if (narr == 0) {
      this.arrApplications.sort((a, b) => {
        if (a.min_salary < b.min_salary) {
          return 1;
        }
        if (a.min_salary > b.min_salary) {
          return -1;
        }
        return 0;
      });
      return this.arrApplications, (this.elegido = 'Salario Minimo');
    }
  }

  public ordSalarioMax(narr: number) {
    if (narr == 1) {
      this.arrFavs.sort((a, b) => {
        if (a.min_salary < b.min_salary) {
          return -1;
        }
        if (a.min_salary > b.min_salary) {
          return 1;
        }
        return 0;
      });
      return this.arrFavs, (this.elegido = 'Salario Máximo');
    } else if (narr == 2) {
      this.arrFavsVacancies.sort((a, b) => {
        if (a.min_salary < b.min_salary) {
          return -1;
        }
        if (a.min_salary > b.min_salary) {
          return 1;
        }
        return 0;
      });
      return this.arrFavsVacancies, (this.elegido = 'Salario Máximo');
    } else if (narr == 0) {
      this.arrApplications.sort((a, b) => {
        if (a.min_salary < b.min_salary) {
          return -1;
        }
        if (a.min_salary > b.min_salary) {
          return 1;
        }
        return 0;
      });
      return this.arrApplications, (this.elegido = 'Salario Máximo');
    }
  }

  public fechaPublicacion(param: any) {
    this.arrFavsVacancies = this.allFavsVacancies.filter((vac) =>
      vac.date_published.includes(param)
    );
    this.paginas = Math.ceil(this.arrApplications.length / this.numPages);
    this.paginas1 = Math.ceil(this.arrFavs.length / this.numPages);
    this.paginas2 = Math.ceil(this.arrFavsVacancies.length / this.numPages);
    return this.arrFavsVacancies;
  }

  public tipodeTrabajo(param: string) {
    this.arrFavsVacancies = this.allFavsVacancies.filter((vac) =>
      vac.job_type.includes(param)
    );
    this.paginas = Math.ceil(this.arrApplications.length / this.numPages);
    this.paginas1 = Math.ceil(this.arrFavs.length / this.numPages);
    this.paginas2 = Math.ceil(this.arrFavsVacancies.length / this.numPages);
    return this.arrFavsVacancies;
  }

  public modoEmpleo(param: string) {
    this.arrFavsVacancies = this.allFavsVacancies.filter((vac) =>
      vac.modality.includes(param)
    );
    this.paginas = Math.ceil(this.arrApplications.length / this.numPages);
    this.paginas1 = Math.ceil(this.arrFavs.length / this.numPages);
    this.paginas2 = Math.ceil(this.arrFavsVacancies.length / this.numPages);
    return this.arrFavsVacancies;
  }

  public nivelEducativo(param: string) {
    this.arrFavsVacancies = this.allFavsVacancies.filter((vac) =>
      vac.education.includes(param)
    );
    this.paginas = Math.ceil(this.arrApplications.length / this.numPages);
    this.paginas1 = Math.ceil(this.arrFavs.length / this.numPages);
    this.paginas2 = Math.ceil(this.arrFavsVacancies.length / this.numPages);
    return this.arrFavsVacancies;
  }

  public buscar() {
    this.arrFavsVacancies = this.allFavsVacancies.filter((vac) =>
      vac.location.toLowerCase().includes(this.txtBuscar.toLowerCase())
    );
    this.paginas = Math.ceil(this.arrApplications.length / this.numPages);
    this.paginas1 = Math.ceil(this.arrFavs.length / this.numPages);
    this.paginas2 = Math.ceil(this.arrFavsVacancies.length / this.numPages);
    return this.arrFavsVacancies;
  }

  public limpiar() {
    this.arrFavsVacancies = [];
    this.arrFavsVacancies = this.allFavsVacancies;
    this.paginas = Math.ceil(this.arrApplications.length / this.numPages);
    this.paginas1 = Math.ceil(this.arrFavs.length / this.numPages);
    this.paginas2 = Math.ceil(this.arrFavsVacancies.length / this.numPages);
    this.formGroup.reset();
    return this.arrFavsVacancies;
  }

  public rango() {
    if (
      this.formGroup.get('min').value == '' ||
      this.formGroup.get('max').value == ''
    ) {
      Swal.fire({
        title: 'Error',
        text: 'Debe ingresar un rango de salario',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    } else {
      this.arrFavsVacancies = this.allFavsVacancies.filter(
        (vac) =>
          (this.formGroup.get('min').value >= vac.min_salary &&
            this.formGroup.get('max').value <= vac.max_salary) ||
          (this.formGroup.get('min').value <= vac.max_salary &&
            this.formGroup.get('max').value >= vac.min_salary)
      );
    }
    return this.arrFavsVacancies;
  }

  public obtenerFavoritos() {
    return this.servicio
      .obtenerFavoritos(localStorage.getItem('token'))
      .subscribe((data: Data) => {
        //recorro el arreglo de objetos que me devuelve el servicio y lo guardo en un arreglo de arreglos
        for (let item of data['favs']) {
          this.arrFavs.push(item);
        }
        if (this.arrFavs.length == 0) {
          this.vacio = false;
        }
        this.paginas1 = Math.ceil(this.arrFavs.length / this.numPages);
      });
  }

  public borrarFavorito(id: number) {
    Swal.fire({
      icon: 'warning',
      title: 'Seguro que quieres eliminar este empleo?',
      showDenyButton: true,
      confirmButtonText: 'Si, estoy seguro',
      denyButtonText: `Cancelar`,
      confirmButtonColor: '#1c4a83',
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicio
          .borrarFavorito(localStorage.getItem('token'), id)
          .subscribe((data: Data) => {
            Swal.fire({
              icon: 'success',
              title: `${data['msg']}`,
              showConfirmButton: false,
              timer: 700,
            });
            window.location.reload();
          });
      } else if (result.isDenied) {
        Swal.fire({
          icon: 'info',
          title: 'Tu empleo no se ha eliminado',
          showConfirmButton: false,
          timer: 700,
        });
      }
    });
  }

  public showMenus(index: number) {
    //si das click en el que estas, no hace nada
    if (this.arrVisible[index] == true) {
      this.arrVisible[index] = true;
    } else {
      //saco el valor de la posicion que se presiona
      this.visible = this.arrVisible[index];
      //cambio el valor de todas las posiciones al valor que se presiona
      this.arrVisible = [
        this.visible,
        this.visible,
        this.visible,
        this.visible,
      ];
      //alterno el valor booleano de la posicion que se presiona
      this.arrVisible[index] = !this.visible;
    }
  }

  public getFavsCompanies() {
    this.servicio
      .getFavs(localStorage.getItem('token'))
      .subscribe((data: Data) => {
        if (data != null) {
          data['data'].companies.forEach((element) => {
            element.profile_pic =
              'https://capitalempleo.com/profile_pic/' + element.profile_pic;
            this.arrCompanies.push(element);
          });
          data['data'].vacancies.forEach((element) => {
            this.arrFavsVacancies.push(element);
            this.allFavsVacancies.push(element);
          });
          this.paginas2 = Math.ceil(
            this.arrFavsVacancies.length / this.numPages
          );
        }
      });
  }

  public getVistas() {
    this.servicio
      .getVisualizations(localStorage.getItem('token'))
      .subscribe((data: Data) => {
        if (data != null) {
          data['data'].visualizations.forEach((element) => {
            element.profile_pic =
              'https://capitalempleo.com/profile_pic/' + element.profile_pic;
            this.arrVisualizations.push(element);
          });
        }
      });
  }

  public getPostulaciones() {
    Swal.fire({
      title: 'Obteniendo datos',
      html: 'Espera un momento por favor',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        this.servicio
          .getApplications(localStorage.getItem('token'))
          .subscribe((data: Data) => {
            if (data != null) {
              data['data'].applications.forEach((element) => {
                this.arrApplications.push(element);
              });
              this.paginas = Math.ceil(
                this.arrApplications.length / this.numPages
              );
              Swal.close();
            }
          });
      },
    });
  }

  public verMensaje(
    message: string,
    id_vacant: number,
    id_company: number,
    estado: string
  ) {
    Swal.fire({
      icon: 'info',
      title:
        estado == 'cubierta'
          ? 'Lo sentimos'
          : estado == 'aceptado'
          ? 'Felicitaciones'
          : 'Aviso',
      html: `<p>${message}</p>`,
      confirmButtonText: 'Ver perfil de la empresa',
      confirmButtonColor: '#1c4a83',
      showDenyButton: true,
      denyButtonText: 'Ver vacante',
      denyButtonColor: '#68B744',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/perfil_empresa', id_company]);
      } else if (result.isDenied) {
        this.router.navigate(['/detalle_trabajo', id_vacant]);
      }
    });
  }

  public linkToVacante(id: number) {
    this.router.navigate(['/detalle_trabajo', id]);
  }

  public linkToEmpresa(id: number) {
    this.router.navigate(['/perfil_empresa', id]);
  }

  //notificaciones
  public updateNotify(section: string) {
    this.servicio
      .viewNotificaciones(section, localStorage.getItem('token'))
      .subscribe((data: Data) => {});
  }

}
