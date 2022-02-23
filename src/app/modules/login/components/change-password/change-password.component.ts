import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  NgForm,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { RegisterService } from '../.././services/register.service';
import { Reset } from '../../../login/interfaces/reset';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  formGroup: FormGroup;
  codigo: string;
  email: string;
  npass: string;
  npassconfirm: string;

  params: any;

  constructor(
    private reset: RegisterService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.params = this.route.snapshot.queryParams; //obtiene los parametros de la url
    this.iniciarFormulario();
  }

  iniciarFormulario(): void {
    this.formGroup = this.formBuilder.group({
      email: [''],
      codigo: this.params.token, //introducimos el codigo que nos envia el correo
      npass: [''],
      npassconfirm: [''],
    });
  }

  changePass(): void {
    //metodo para cambiar la contraseña
    //recopilamos todos los datos del formulario
    this.email = this.formGroup.get('email').value;
    this.codigo = this.formGroup.get('codigo').value;
    this.npass = this.formGroup.get('npass').value;
    this.npassconfirm = this.formGroup.get('npassconfirm').value;
    //si los campos estan vacios
    if (
      this.email === '' ||
      this.codigo === '' ||
      this.npass === '' ||
      this.npassconfirm === ''
    ) {
      //mensaje de error
      Swal.fire({
        icon: 'warning',
        title: 'Datos Insuficientes',
        text: 'Por Favor llena todos los campos',
        confirmButtonColor: '#1c4a83',
        focusConfirm: false,
      });
      return;
    } else {
      //validamos el correo
      if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(this.email)) {
        //si no es valido envia un mensaje de error
        Swal.fire({
          icon: 'warning',
          title: 'Correo Invalido',
          text: 'Por favor ingresa un correo valido',
          confirmButtonColor: '#1c4a83',
          focusConfirm: false,
        });
        return;
      } else {
        if (
          //si la contraseña es menor a 8 caracteres
          !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g.test(
            this.npass
          )
        ) {
          //mensaje de error
          Swal.fire({
            icon: 'warning',
            title: 'Contraseña Invalida',
            text: 'Minimo 8 caracteres, 1 letra, un numero y un caracter especial',
            confirmButtonColor: '#1c4a83',
            focusConfirm: false,
          });
          return;
        } else {
          //si las contraseñas no coinciden
          if (this.npass != this.formGroup.get('npassconfirm').value) {
            //mensaje de error
            Swal.fire({
              icon: 'error',
              title: 'Contraseña Invalida',
              text: 'Las contraseñas no coinciden',
              confirmButtonColor: '#1c4a83',
              focusConfirm: false,
            });
          } else {
            //creamos un objeto de tipo reset
            let reset = new Reset(this.codigo, this.email, this.npass);
            /* console.log(this.formGroup.value, reset); */
            Swal.fire({
              title: 'Cambiando contraseña...',
              html: 'Espere un momento por favor...',
              allowEscapeKey: false,
              allowOutsideClick: false,
              didOpen: () => {
                Swal.showLoading();
                //llamamos al servicio que cambia la contraseña
                this.reset.resetPassword(reset).subscribe(
                  (data: Data) => {
                    if (data != null) {
                      Swal.close();
                      Swal.fire({
                        icon: 'success',
                        title: 'Contraseña Cambiada',
                        text: 'Contraseña Cambiada con exito',
                        confirmButtonColor: '#1c4a83',
                        focusConfirm: false,
                      }).then((isConfirm) => {
                        if (isConfirm) {
                          window.open('/login', '_self');
                        }
                      });
                    }
                  },
                  //si hay un error
                  (error: HttpErrorResponse) => {
                    /* console.log(error.error); */
                    if (error.status == 401) {
                      //mensaje de error
                      Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: error.error.error,
                        confirmButtonColor: '#1c4a83',
                        focusConfirm: false,
                      });
                    }
                  }
                );
              },
            });
          }
        }
      }
    }
  }
}
