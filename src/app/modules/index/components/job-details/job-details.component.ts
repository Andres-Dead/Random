import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { RegisterService } from '../../../login/services/register.service';
import { SessionService } from '../../../login/services/session.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
  public id_vacante: number;
  public vacanteAct: any;
  public grupo = {} as any;

  public arrInfo: any[] = [];

  public favs: any;
  public isfollow = false;

  constructor(
    private route: ActivatedRoute,
    private servicio: RegisterService,
    private group: SessionService
  ) {}

  ngOnInit(): void {
    this.obtenerGroup();
    this.id_vacante = this.route.snapshot.params['id']; //obtener el id de la vacante
    this.vacView();
    this.getVacante();
    console.log(this.arrInfo, this.id_vacante);
  }

  public obtenerGroup() {
    return this.group
      .getGroup(localStorage.getItem('token'))
      .subscribe((res: Data) => {
        Object.entries(res).forEach(([key, value]) => {
          //recorro el objeto y asigno el valor a la variable grupo
          this.grupo[key] = value;
        });
      });
  }

  public getVacante() {
    Swal.fire({
      title: 'Obteniendo datos de la vacante.',
      html: 'Espera un momento por favor',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        return this.servicio
          .getDatosTrabajo(this.id_vacante, localStorage.getItem('token'))
          .subscribe(
            (data: Data) => {
              if (localStorage.getItem('token') == null) Swal.close();
              console.log(data);
              Object.entries(data['data'].info).forEach(([key, value]) => {
                this.arrInfo[key] = value;
                this.arrInfo['profile_pic'] =
                  'https://capitalempleo.com/profile_pic/' +
                  data['data'].info['profile_pic'];
              });
              this.vacanteAct = data['data'].follow.id_follow;
              this.verificarSeguir(this.id_vacante);
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

  public verificarSeguir(vacActual: number) {
    //si el usuario esta logueado
    if (localStorage.getItem('token') != null) {
      this.servicio
        .getFavsJobs(localStorage.getItem('token'))
        .subscribe((data: Data) => {
          Swal.close();
          console.log(data['favs']);
          //verificar si el trabajo esta en favoritos
          this.favs = data['favs'].filter((fav) => fav.id_vacant == vacActual);
          console.log(this.favs);
          //si esta en favoritos, cambiar el estado de isfollow a true
          if (this.favs.length == 0) this.isfollow = true;
        });
    } else {
      //si no esta logueado, cambiar el estado de isfollow a true,
      // para que  el boton de seguir aparezca y poder mostrarle al usuario un modal
      //invitandolo a seguir la empresa
      this.isfollow = true;
    }
    return vacActual;
  }

  public seguirVacante(idVacante: number) {
    if (this.grupo.group == '2') {
      Swal.fire({
        icon: 'info',
        title: 'Lo sentimos',
        text: 'Solo los talentos pueden postularse',
        confirmButtonColor: '#1c4a83',
        confirmButtonText: 'Ok',
        focusConfirm: false,
      });
    } else {
      if (localStorage.getItem('token') != null) {
        this.servicio
          .seguirTrabajo(localStorage.getItem('token'), idVacante)
          .subscribe((data: Data) => {
            this.ngOnInit();
            console.log(data);
            this.isfollow = false;
          });
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Debes iniciar sesión para guardar esta vacante',
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
  }

  public olvidarVacante(idFavorito: number) {
    this.servicio
      .olvidarTrabajo(localStorage.getItem('token'), idFavorito)
      .subscribe((data: Data) => {
        console.log(data);
        this.ngOnInit();
        this.isfollow = true;
      });
  }

  public vacView() {
    return this.servicio
      .vacantView(this.id_vacante, localStorage.getItem('token'))
      .subscribe((data: Data) => {
        /* console.log(data); */
      });
  }

  public postular() {
    if (this.grupo.group == '2') {
      Swal.fire({
        icon: 'info',
        title: 'Lo sentimos',
        text: 'Solo los talentos pueden postularse',
        confirmButtonColor: '#1c4a83',
        confirmButtonText: 'Ok',
        focusConfirm: false,
      });
    } else {
      if (localStorage.getItem('token') != null) {
        Swal.fire({
          title: '¿Estás seguro?',
          text: '¡No podrás revertir esto!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#1c4a83',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar',
          reverseButtons: true,
        }).then((result) => {
          if (result.isConfirmed) {
            this.servicio
              .postular(localStorage.getItem('token'), this.id_vacante)
              .subscribe((data: Data) => {
                console.log(data);
                if (data != null) {
                  Swal.fire({
                    icon: 'success',
                    title: '¡Enviado!',
                    text: 'Tu postulación ha sido enviada',
                    confirmButtonColor: '#1c4a83',
                    confirmButtonText: 'Ok',
                    focusConfirm: false,
                  });
                }
              });
          }
        });
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Debes iniciar sesión para postular',
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
  }

  public fakeArray(numero: number) {
    let arrf = [];
    for (let i = 0; i < Math.floor(numero); i++) {
      arrf.push(i);
    }
    return arrf;
  }

  public viewCv() {
    //checo que la sesion este iniciada
    if (localStorage.getItem('token') != null) {
      //si esta iniciada
      window.location.href = '/perfil_usuario';
    } else {
      //si no esta iniciada
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Debes iniciar sesión para ver tu CV',
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

  public reportar() {
    if (localStorage.getItem('token') != null) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¡No podrás revertir esto!',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#1c4a83',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { value: text } = await Swal.fire({
            title: 'Reportar Vacante',
            html: 'Escribe el motivo de tu reporte',
            input: 'textarea',
            inputLabel: 'Mensaje',
            inputValue: 'Esta vacante me parece ofensiva o inapropiada por :',
            showCancelButton: true,
            allowOutsideClick: false,
          });
          if (text) {
            //Aqui va a ir la llamada
            Swal.fire({
              title: 'Enviando mensaje...',
              html: 'Espere por favor',
              allowEscapeKey: false,
              allowOutsideClick: false,
              didOpen: () => {
                Swal.showLoading();
                this.servicio
                  .report(
                    localStorage.getItem('token'),
                    this.id_vacante,
                    this.arrInfo['id_company'],
                    text
                  )
                  .subscribe((data: Data) => {
                    console.log(data);
                    Swal.fire({
                      icon: 'success',
                      title: '¡Enviado!',
                      text: 'Tu reporte ha sido enviado',
                      confirmButtonColor: '#1c4a83',
                      confirmButtonText: 'Ok',
                      focusConfirm: false,
                    });
                  });
              },
            });
          }
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Debes iniciar sesión para reportar',
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

}
