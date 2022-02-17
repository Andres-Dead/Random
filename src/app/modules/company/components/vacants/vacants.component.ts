import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { CompanyServiceService } from '../../services/company-service.service';

@Component({
  selector: 'app-vacants',
  templateUrl: './vacants.component.html',
  styleUrls: ['./vacants.component.css']
})
export class VacantsComponent implements OnInit {
  public arrResources: any = [];
  public arrActivas: any = [];
  public arrExpiradas: any = [];
  public arrInactive: any = [];
  public arrDrafts: any = [];
  public elegido: string = 'Mas recientes';
  public objRecludadores: any = {};
  //paginación
  public p: number = 1;
  public p2: number = 1;
  public p3: number = 1;
  public p4: number = 1;
  public numPages: number = 4;

  constructor(private servicio: CompanyServiceService) {}

  ngOnInit(): void {
    if (localStorage.getItem('token') == null) {
      //si no hay token redirecciona al login
      window.location.href = '/login';
    } else {
      this.getResources();
      this.getVacantes();
      this.getReclutadores();
    }

    /*     console.log(
      this.arrResources,
      this.arrActivas,
      this.arrExpiradas,
      this.arrInactive,
      this.arrDrafts
    ); */
  }

  public getReclutadores() {
    //obtenemos los reclutadores
    Swal.fire({
      title: 'Obteniendo Reclutadores...',
      html: 'Espera un momento por favor',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        this.servicio
          .getRecruiters(localStorage.getItem('token'))
          .subscribe((data: Data) => {
            Object.entries(data['data']).forEach(([key, value]) => {
              //llenamos el objeto con los reclutadores
              this.objRecludadores[value['id_user']] = value['name'];
            });
          });
      },
    });
  }

  public getVacantes() {
    //obtenemos las vacantes
    Swal.fire({
      title: 'Obteniendo Vacantes...',
      html: 'Espera un momento por favor',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        this.servicio
          .getVacantes(localStorage.getItem('token'))
          .subscribe((data: Data) => {
            for (let item of data['data'].active) {
              //obtenemos las vacantes activas
              this.arrActivas.push(item);
            }
            for (let item of data['data'].expired) {
              //obtenemos las vacantes expiradas
              this.arrExpiradas.push(item);
            }
            for (let item of data['data'].inactive) {
              //obtenemos las vacantes inactivas
              this.arrInactive.push(item);
            }
            for (let item of data['data'].drafts) {
              //obtenemos las vacantes en borrador
              this.arrDrafts.push(item);
            }
            Swal.close();
          });
      },
    });
  }

  public getResources() {
    //obtenemos los Recursos disponibles
    Swal.fire({
      title: 'Obteniendo recursos...',
      html: 'Espera un momento por favor',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        this.servicio
          .getResources(localStorage.getItem('token'))
          .subscribe((data: Data) => {
            Object.entries(data['data']).forEach(([key, value]) => {
              //llenamos el objeto con los reclutadores
              this.arrResources[key] = value;
            });
          });
      },
    });
  }

  public setConfidencial(id: number, ban: boolean) {
    //cambiamos el estado de confidencialidad
    if (!ban) {
      //si no esta confidencial
      Swal.fire({
        title: '¡Estás por usar una de tus vacantes confidenciales!',
        html: 'Tu vacante será confidencial, eso significa que no será visible el perfil ni la información de tu empresa para los talentos que la vean.',
        showCancelButton: true,
        confirmButtonText: 'Hacer esta vacante conficencial',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
        imageUrl: '../../assets/img/iconoModalConf.svg',
        showCloseButton: true,
        focusConfirm: false,
      }).then((result) => {
        //si acepta
        if (result.isConfirmed) {
          //mostramos un dialogo de espera
          Swal.fire({
            title: 'Convirtiendo a confindecial...',
            html: 'Espera un momento por favor',
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
              this.servicio
                .setConfidential(localStorage.getItem('token'), id)
                .subscribe((data: Data) => {
                  if (data != null) {
                    Swal.fire({
                      title: 'Recurso Confidencial',
                      html: 'El recurso ha sido marcado como confidencial',
                      icon: 'success',
                      showConfirmButton: false,
                      timer: 1500,
                    });
                    Swal.close();
                    window.location.reload();
                  }
                });
            },
          });
        }
      });
    } else {
      Swal.fire({
        title: 'Cargando...',
        html: 'Espera un momento por favor',
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          this.servicio
            .setConfidential(localStorage.getItem('token'), id)
            .subscribe((data: Data) => {
              if (data != null) {
                Swal.fire({
                  title: 'Recurso Confidencial',
                  html: 'El recurso ha sido marcado como confidencial',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 1500,
                });
                window.location.reload();
                Swal.close();
              }
            });
        },
      });
    }
  }

  public setDestacada(id: number, ban: boolean) {
    if (!ban) {
      Swal.fire({
        title: '¡Estás por usar una de tus vacantes destacada!',
        html: 'Tu publicación tendrá mayor visibilidad entre las demás',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Crear vacante destacada',
        reverseButtons: true,
        imageUrl: '../../assets/img/iconoModalDestaca.svg',
        showCloseButton: true,
        focusConfirm: false,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Cargando...',
            html: 'Espera un momento por favor',
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
              this.servicio
                .setFeature(localStorage.getItem('token'), id)
                .subscribe((data: Data) => {
                  if (data != null) {
                    Swal.fire({
                      title: 'Recurso Confidencial',
                      html: 'El recurso ha sido marcado como confidencial',
                      icon: 'success',
                      showConfirmButton: false,
                      timer: 1500,
                    });
                    window.location.reload();
                    Swal.close();
                  }
                });
            },
          });
        }
      });
    } else {
      Swal.fire({
        title: 'Cargando...',
        html: 'Espera un momento por favor',
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
          this.servicio
            .setFeature(localStorage.getItem('token'), id)
            .subscribe((data: Data) => {
              console.log(data);
              if (data != null) {
                Swal.fire({
                  title: 'Recurso Confidencial',
                  html: 'El recurso ha sido marcado como confidencial',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 1500,
                });
                window.location.reload();
                Swal.close();
              }
            });
        },
      });
    }
  }

  public sumarDias(fecha: string, dias: number) {
    let fechaE = new Date(fecha);
    fechaE.setDate(fechaE.getDate() + dias);
    return fechaE.toLocaleDateString();
  }

  public setInactiva(id: number) {
    Swal.fire({
      title: '¡Estás por desactivar una vacante!',
      html: 'Al desactivar esta vacante ya no será visible por el talento pero puedes reactivarla cuando quieras. <br> La vacante y sus datos recabados seguirán disponibles en la pestaña de vacantes inactivas',
      showCancelButton: true,
      confirmButtonText: 'Desactivar vacante',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      imageUrl: '../../assets/img/iconoModalDes.svg',
      showCloseButton: true,
      focusConfirm: false,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Cargando...',
          html: 'Espera un momento por favor',
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
            this.servicio
              .setInactive(localStorage.getItem('token'), id)
              .subscribe((data: Data) => {
                window.location.reload();
                Swal.close();
              }),
              (error: HttpErrorResponse) => {
                console.log(error);
              };
          },
        });
      }
    });
  }

  public setExtender(id: number) {
    Swal.fire({
      title: '¡Estás por extender la vigencia de tu vacante!',
      html: 'Si decides extender su vigencia, la vacante contará con 60 días más en estado activo.',
      showCancelButton: true,
      confirmButtonText: 'Extender vigencia',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      imageUrl: '../../assets/img/iconoModalDes.svg',
      showCloseButton: true,
      focusConfirm: false,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Cargando...',
          html: 'Espera un momento por favor',
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
            this.servicio
              .setExtend(localStorage.getItem('token'), id)
              .subscribe((data: Data) => {
                window.location.reload();
                Swal.close();
              }),
              (error: HttpErrorResponse) => {
                console.log(error);
              };
          },
        });
      }
    });
  }

  public deleteVacante(id: number) {
    Swal.fire({
      title: 'Estás por borrar esta vacante',
      html: 'La información de esta y los datos recabados se eliminarán definitivamente.',
      showCancelButton: true,
      confirmButtonText: 'Eliminar definitivamente',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      imageUrl: '../../assets/img/iconoModalDes.svg',
      showCloseButton: true,
      focusConfirm: false,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Cargando...',
          html: 'Espera un momento por favor',
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
            this.servicio
              .deleteVacant(localStorage.getItem('token'), id)
              .subscribe((data: Data) => {
                if(data != null){
                  window.location.reload();
                  Swal.close();
                }
              });
          },
        });
      }
    });
  }

  public activarVacante(id: number) {
    Swal.fire({
      title: '¡Estás por activar esta vacante!',
      html: 'La vacante se activará y podrá ser vista por el talento ',
      input: 'select',
      inputOptions: {
        Type: {
          0: 'Estandar',
          1: 'Confidencial',
          2: 'destacada',
          3: 'Ambos',
        },
      },
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      showCloseButton: true,
      focusConfirm: false,
      imageUrl: '../../assets/img/iconoModalActiva.svg',
      inputValidator: (value) => {
        return !value && 'Debes seleccionar un tipo de vacante';
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Cargando...',
          html: 'Espera un momento por favor',
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
            this.servicio
              .activateVacant(localStorage.getItem('token'), id, result.value)
              .subscribe((data: Data) => {
                if (data != null) {
                  window.location.reload();
                  Swal.close();
                }
              });
          },
        });
      }
    });
  }

  public cambiaReclutador(id: number) {
    Swal.fire({
      title: 'Reasignar vacante',
      html: 'Elige al reclutador al que le quieres reasignar la vacante',
      input: 'select',
      inputOptions: {
        Type: {
          ...this.objRecludadores,
        },
      },
      showCancelButton: false,
      confirmButtonText: 'Asignar',
      cancelButtonText: 'Cancelar',
      showCloseButton: true,
      inputValidator: (value) => {
        return !value && 'Debes seleccionar un tipo de vacante';
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Cargando...',
          html: 'Espera un momento por favor',
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
            this.servicio
              .changeRecruiter(localStorage.getItem('token'), id, result.value)
              .subscribe((data: Data) => {
                window.location.reload();
                Swal.close();
              });
          },
        });
      }
    });
  }

  public ExpiraEn(fecha: string) {
    let fechaE = new Date(fecha);
    let fechaActual = new Date();
    let dias = fechaE.getTime() - fechaActual.getTime();
    let diasR = Math.round(dias / (1000 * 60 * 60 * 24));
    return diasR;
  }

  public ordenarFecha() {
    this.arrActivas.sort((a, b) => {
      if (a.date_published < b.date_published) {
        return 1;
      }
      if (a.date_published > b.date_published) {
        return -1;
      }
      return 0;
    });
    return this.arrActivas, (this.elegido = 'Más recientes');
  }

  public ordenarFecha2() {
    this.arrActivas.sort((a, b) => {
      if (a.date_published < b.date_published) {
        return -1;
      }
      if (a.date_published > b.date_published) {
        return 1;
      }
      return 0;
    });
    return this.arrActivas, (this.elegido = 'Más antiguas');
  }

  public ordenarFechaExp() {
    this.arrExpiradas.sort((a, b) => {
      if (a.date_published < b.date_published) {
        return 1;
      }
      if (a.date_published > b.date_published) {
        return -1;
      }
      return 0;
    });
    return this.arrExpiradas, (this.elegido = 'Más recientes');
  }

  public ordenarFecha2Exp() {
    this.arrExpiradas.sort((a, b) => {
      if (a.date_published < b.date_published) {
        return -1;
      }
      if (a.date_published > b.date_published) {
        return 1;
      }
      return 0;
    });
    return this.arrExpiradas, (this.elegido = 'Más antiguas');
  }

  public ordenarFechaInac() {
    this.arrInactive.sort((a, b) => {
      if (a.date_published < b.date_published) {
        return 1;
      }
      if (a.date_published > b.date_published) {
        return -1;
      }
      return 0;
    });
    return this.arrInactive, (this.elegido = 'Más recientes');
  }

  public ordenarFecha2Inac() {
    this.arrInactive.sort((a, b) => {
      if (a.date_published < b.date_published) {
        return -1;
      }
      if (a.date_published > b.date_published) {
        return 1;
      }
      return 0;
    });
    return this.arrInactive, (this.elegido = 'Más antiguas');
  }

  public ordenarFechaDraf() {
    this.arrDrafts.sort((a, b) => {
      if (a.date_published < b.date_published) {
        return 1;
      }
      if (a.date_published > b.date_published) {
        return -1;
      }
      return 0;
    });
    return this.arrDrafts, (this.elegido = 'Más recientes');
  }

  public ordenarFecha2Draf() {
    this.arrDrafts.sort((a, b) => {
      if (a.date_published < b.date_published) {
        return -1;
      }
      if (a.date_published > b.date_published) {
        return 1;
      }
      return 0;
    });
    return this.arrDrafts, (this.elegido = 'Más antiguas');
  }

}
