import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Data } from '@angular/router'
import { CompanyServiceService } from '../../services/company-service.service';
@Component({
  selector: 'app-talent-profile',
  templateUrl: './talent-profile.component.html',
  styleUrls: ['./talent-profile.component.css']
})
export class TalentProfileComponent implements OnInit {
  public id_talento: number;
  public id_vacan: any;
  public arrProfile: any[] = [];
  public arrApplication: any[] = [];
  public showInfoTalento: boolean = false;
  public selected: boolean = false;
  public objVacantes: any = {};

  constructor(
    private route: ActivatedRoute,
    private servicio: CompanyServiceService
  ) {}

  ngOnInit(): void {
    this.id_talento = this.route.snapshot.params['id']; //obtener el id de la vacante
    this.id_vacan = this.route.snapshot.params['idv']; //obtener el id de la vacante
    this.viewTalent(this.id_talento);
    this.getStatus();
    this.getVacantList();
    this.getTalento();
    /*     console.log(
      this.arrProfile,
      this.showInfoTalento,
      this.arrApplication,
      this.objVacantes
    ); */
  }

  public getStatus() {
    //llamamos el servicio para saber si ya se desbloqueo el talento
    this.servicio
      .getSavedTalent(localStorage.getItem('token'), this.id_talento)
      .subscribe((data: Data) => {
        if (data != null) {
          if (data['data'] == 1) {
            //si ya se desbloqueo el talento entonces se muestra la informacion
            this.showInfoTalento = true;
          }
        }
      });
  }

  public getVacantList() {
    //se llama al servicio para obtener la lista de vacantes
    this.servicio
      .getVacantList(localStorage.getItem('token'))
      .subscribe((data: Data) => {
        //si data es diferente de null entonces se carga la informacion
        if (data != null) {
          Object.entries(data['data']).forEach(([key, value]) => {
            this.objVacantes[value['id_vacant']] = value['name'];
          });
        }
      });
  }

  public getTalento() {
    //mostramos un loader mientras se carga la informacion
    Swal.fire({
      title: 'Cargando talento',
      html: 'Espere por favor',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        this.servicio
          .getTalent(
            localStorage.getItem('token'),
            this.id_vacan == '' ? null : this.id_vacan,
            this.id_talento
          )
          .subscribe((data: Data) => {
            //si data es diferente de null entonces se carga la informacion y se oculta el loader
            if (data != null) {
              Swal.close();
              //sacamos la informacion del talento y la guardamos en un arreglo (arrProfile)
              Object.entries(data['data'].profile).forEach(([key, value]) => {
                this.arrProfile[key] = value;
              });
              //sacamos la informacion de las aplicaciones y la guardamos en un arreglo (arrApplication)
              Object.entries(data['data'].application).forEach(([key, value]) => {
                this.arrApplication[key] = value;
              });
              //si el status del talento es == 2 entonces ya esta seleccionado y se muestra la info
              if (this.arrApplication['status'] == 2) {
                this.selected = true;
              }
            }
          });
      },
    });
  }

  public anios(fecha: string) {
    let fecha_inicio = new Date(fecha);
    let fecha_actual = new Date();
    //sacamos los años restandole al año actual el año de la fecha de inicio
    let añosTrabajando =
      fecha_actual.getFullYear() - fecha_inicio.getFullYear();
    return añosTrabajando;
  }

  public alertaSeleccionar() {
    //alerta para seleccionar una vacante
    Swal.fire({
      title: 'Ver datos de contacto',
      html: 'Estas seguro que deseas visualizar a este talento? Esto gastará un credito',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      showCloseButton: true,
      confirmButtonColor: '#1c4a83',
    }).then((result) => {
      //si se acepta la alerta entonces se procede a seleccionar la vacante
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Cargando talento',
          html: 'Espere por favor',
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
            this.servicio
              .insertSaveTalent(localStorage.getItem('token'), this.id_talento)
              .subscribe((data: Data) => {
                //si data es diferente de null significa que se guardo correctamente
                if (data != null) {
                  //cerramos el loader
                  Swal.close();
                  console.log(data);
                  //y refrescamos la pagina
                  window.location.reload();
                }
              });
          },
        });
      }
    });
  }

  public async guardarTalento() {
    //alerta para guardar el talento
    Swal.fire({
      title: 'Guardar talento',
      html: 'Selecciona la vacante que deseas guardar el talento',
      input: 'select',
      inputOptions: {
        //se cargan las vacantes en el input utilzando el objeto objVacantes
        Vacantes: {
          ...this.objVacantes,
        },
      },
      showCancelButton: false,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      showCloseButton: true,
      inputValidator: (value) => {
        return !value && 'Debes seleccionar una vacante';
      },
    }).then((result) => {
      if (result.isConfirmed) {
        //si se acepta la alerta entonces se procede a guardar el talento
        Swal.fire({
          title: 'Cargando...',
          html: 'Espera un momento por favor',
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
            this.servicio
              .saveTalent(localStorage.getItem('token'), {
                id_vacant: result.value,
                id_profile: this.id_talento,
              })
              .subscribe((data: Data) => {
                if (data != null) {
                  //si data es diferente de null significa que se guardo correctamente
                  Swal.close();
                  //cerramos el loader y enseguida mostramos una alerta de exito
                  Swal.fire({
                    icon: 'success',
                    title: 'Guardado',
                    text: 'El talento se ha guardado correctamente',
                    confirmButtonColor: '#1c4a83',
                  });
                }
              });
          },
        });
      }
    });
  }

  public async seleccionar() {
    //alerta para seleccionar una vacante
    Swal.fire({
      title: 'Seleccionar talento',
      html: 'Estas seguro que deseas seleccionar este talento? Esto gastará un credito',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      showCloseButton: true,
      confirmButtonColor: '#1c4a83',
    }).then(async (result) => {
      if (result.isConfirmed) {
        //si se acepta la alerta entonces se procede a seleccionar la vacante
        const { value: text } = await Swal.fire({
          title: 'Seleccionar talento',
          html: 'Enviaremos un mensaje de aceptación de tu parte al candidato.',
          input: 'textarea',
          inputLabel: 'Mensaje',
          inputValue:
            '¡Felicidades! Haz sido seleccionado. Nos pondremos en contacto contigo a la brevedad',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          allowOutsideClick: false,
        });
        if (text) {
          //si el mensaje no esta vacio entonces procedemos a enviar el mensaje
          Swal.fire({
            title: 'Enviando mensaje...',
            html: 'Espere por favor',
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
              this.servicio
                .putSelectTalent(
                  localStorage.getItem('token'),
                  this.id_vacan,
                  this.id_talento,
                  text
                )
                .subscribe((data: Data) => {
                  if (data != null) {
                    //si data es diferente de null significa que se selecciono correctamente
                    Swal.close();
                    //cerramos el loader y enseguida mostramos una alerta de exito
                    Swal.fire(
                      'Mensaje enviado',
                      'El mensaje ha sido enviado con éxito',
                      'success'
                    );
                    //y refrescamos la pagina
                    window.location.reload();
                  }
                });
            },
          });
        }
      }
    });
  }

  public async descartar() {
    //alerta para descartar una vacante
    const { value: text } = await Swal.fire({
      title: 'Descartar talento',
      html: 'Estas por descartar un talento de tu vacante, esto significa que ya no lo verás en tu lista de talentos postulados..',
      input: 'textarea',
      inputLabel: 'Mensaje',
      inputValue:
        'Esta vacante ya ha sido cubierta. Agradecemos tu interés. Sigue atento a nuevas vacantes',
      showCancelButton: true,
    });
    if (text) {
      //si el mensaje no esta vacio entonces procedemos a enviar el mensaje
      //Aqui va a ir la llamada
      Swal.fire({
        title: 'Enviando Mensaje...',
        html: 'Espere por favor',
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
          this.servicio
            .putDiscardTalent(
              localStorage.getItem('token'),
              this.id_vacan,
              this.id_talento,
              text
            )
            .subscribe((data: Data) => {
              if (data != null) {
                //si data es diferente de null significa que se descartó correctamente
                Swal.close();
                //cerramos el loader y enseguida mostramos una alerta de exito
                Swal.fire(
                  'Mensaje enviado',
                  'El mensaje ha sido enviado con éxito',
                  'success'
                );
              }
            });
          //y refrescamos la pagina
          window.location.reload();
        },
      });
    }
  }

  //vistas del talento
  public viewTalent(id_talent: number) {
    this.servicio
      .putViewTalent(id_talent, localStorage.getItem('token'))
      .subscribe((data: Data) => {
        console.log(data);
      });
  }

}
