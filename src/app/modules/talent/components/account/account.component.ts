import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Data } from '@angular/router';
import Swal from 'sweetalert2';
import { RegisterService } from '../../../login/services/register.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  formGroup = new FormGroup({
    visibilidad: new FormControl('', Validators.required),
  });
  formGroupE = new FormGroup({
    token: new FormControl('', Validators.required),
  });

  public cvVisibility: boolean;
  public email: string;

  public visible: string;
  public invisible: string;

  constructor(private service: RegisterService) {}

  ngOnInit(): void {
    this.getVisibility();
    console.log(this.cvVisibility);
  }
  //formulario Visiblidiad
  get f() {
    return this.formGroup.controls;
  }
  //formulario para eliminar
  get fe() {
    return this.formGroupE.controls;
  }

  public setVisibility() {
    console.log(this.formGroup.value);
    Swal.fire({
      title: 'Cambiando visibilidad',
      html: 'Espera un momento por favor',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        return this.service
          .cvInvisibilty(
            localStorage.getItem('token'),
            this.formGroup.value.visibilidad
          )
          .subscribe((data: Data) => {
            window.location.reload();
          });
      },
    });
  }

  public getVisibility() {
    Swal.fire({
      title: 'Cargando talento',
      html: 'Espere por favor',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        return this.service
          .cvVisibilty(localStorage.getItem('token'))
          .subscribe((data: Data) => {
            Swal.close();
            console.log(data);
            if (data != null) {
              this.email = data['visibility'].email;
              if (data['visibility'].visibiliy == 1) {
                this.cvVisibility = true;
              } else {
                this.cvVisibility = false;
              }
              console.log(this.cvVisibility);
            }
          });
      },
    });
  }

  public deleteAccount() {
    if (this.formGroupE.value.token == true) {
      Swal.fire({
        title: 'Estas segur@?',
        text: 'Si eliminas tu cuenta no podras recuperarla',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1C4A83',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Eliminando cuenta',
            html: 'Espera un momento por favor',
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
              return this.service
                .deleteAccount(localStorage.getItem('token'))
                .subscribe((data: Data) => {
                  Swal.close();
                  console.log(data);
                  if (data != null) {
                    Swal.fire({
                      title: 'Cuenta eliminada',
                      html: 'Tu cuenta ha sido eliminada',
                      icon: 'success',
                      showCancelButton: false,
                      confirmButtonColor: '#3085d6',
                      confirmButtonText: 'Ok',
                    }).then((result) => {
                      if (result.isConfirmed) {
                        localStorage.clear();
                        window.location.href = '/home';
                      }
                    });
                  }
                });
            },
          });
        }
      });
    }
  }

  public changePass() {
    Swal.fire({
      title: 'Cambiando contraseña',
      html: `<input type="password" id="password" class="swal2-input" placeholder="Contraseña">
      <input type="password" id="passwordC" class="swal2-input" placeholder="Confirma la contraseña">`,
      confirmButtonText: 'Cambiar contraseña',
      showCancelButton: true,
      focusConfirm: false,
      allowOutsideClick: false,
      preConfirm: () => {
        const password = (
          Swal.getPopup().querySelector('#password') as HTMLInputElement
        ).value;
        const passwordC = (
          Swal.getPopup().querySelector('#passwordC') as HTMLInputElement
        ).value;
        if (!password || !passwordC) {
          Swal.showValidationMessage(
            `Por favor escribe la contraseña y confirmala!`
          );
        } else if (password != passwordC) {
          Swal.showValidationMessage(`Las contraseñas no coinciden!`);
        } else if (
          //al menos 8 caracteres, una letra, un numero y un caracter especial
          !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g.test(
            password
          )
        ) {
          Swal.showValidationMessage(
            `La contraseña debe tener al menos 8 caracteres, una letra, un numero y un caracter especial`
          );
        }
        return { password: password, passwordC: passwordC };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Cambiando contraseña',
          html: 'Espera un momento por favor',
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
            return this.service
              .changePassword(
                localStorage.getItem('token'),
                result.value.password
              )
              .subscribe((data: Data) => {
                Swal.close();
                console.log(data);
                if (data != null) {
                  Swal.fire({
                    title: 'Contraseña cambiada',
                    html: 'Tu contraseña ha sido cambiada',
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Ok',
                  });
                }
              });
          },
        });
      }
    });
  }
}
