import { Data, Router, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Users } from '../../interfaces/users';
import { RegisterService } from '../../services/register.service';
import Swal from 'sweetalert2';

//Inicio de sesion con google y facebook
import { SocialAuthService } from 'angularx-social-login';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
} from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';

import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register-talent',
  templateUrl: './register-talent.component.html',
  styleUrls: ['./register-talent.component.css'],
})
export class RegisterTalentComponent implements OnInit {
  formGroup: FormGroup;

  email: String;
  primeroPass: any;
  segundoPass: any;

  user: SocialUser;
  loggedIn: boolean;

  constructor(
    public fb: FormBuilder,
    private registrar: RegisterService,
    private router: Router,
    private authService: SocialAuthService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.router.navigate(['/']);
    } else {
      this.iniciarForm();
    }
  }

  //Inicio de secion con facebook y google

  signInWithGoogle(): void {
    this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((userData) => {
        this.user = userData;
        this.loggedIn = true;
        let gemail = userData.email;
        let gpass = userData.id;
        let fname = userData.firstName;
        let lname = userData.lastName;
        let nuevoUsuarioGoogle = new Users(
          `${gemail}`,
          `${gpass}`,
          `${fname}`,
          `${lname}`,
          'Empleado'
        );
        Swal.fire({
          title: 'Registrando',
          html: 'Espera un momento por favor',
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
            this.registrar.registrarUsuario(nuevoUsuarioGoogle).subscribe(
              (data) => {
                Swal.close();
                Swal.fire({
                  icon: 'success',
                  title: 'Usuario Registrado',
                  text: 'Por favor inicia sesion',
                  confirmButtonColor: '#1c4a83',
                  focusConfirm: false,
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.router.navigate(['/login']);
                  }
                });
              },
              (error: HttpErrorResponse) => {
                if (error.status == 401) {
                  Swal.fire({
                    icon: 'error',
                    title: 'Usuario ya registrado',
                    text: 'Por favor inicia sesion',
                    confirmButtonText: 'Iniciar Sesión',
                    confirmButtonColor: '#1c4a83',
                    focusConfirm: false,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      this.router.navigate(['/login']);
                    }
                  });
                }
              }
            );
          },
        });
        /*  console.log(nuevoUsuarioGoogle); */
      });
  }

  signInWithFB(): void {
    this.authService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((userData) => {
        this.user = userData;
        this.loggedIn = true;
        let femail = userData.email;
        let fpass = userData.id;
        let fname = userData.firstName;
        let lname = userData.lastName;

        let nuevoUsuarioFacebook = new Users(
          `${femail}`,
          `${fpass}`,
          `${fname}`,
          `${lname}`,
          'Empleado'
        );
        Swal.fire({
          title: 'Registrando',
          html: 'Espera un momento por favor',
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
            this.registrar.registrarUsuario(nuevoUsuarioFacebook).subscribe(
              (data) => {
                Swal.close();
                Swal.fire({
                  icon: 'success',
                  title: 'Usuario Registrado',
                  text: 'Por favor inicia sesion',
                  confirmButtonColor: '#1c4a83',
                  focusConfirm: false,
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.router.navigate(['/login']);
                  }
                });
              },
              (error: HttpErrorResponse) => {
                if (error.status == 401) {
                  Swal.fire({
                    icon: 'error',
                    title: 'Usuario ya registrado',
                    text: 'Por favor inicia sesion',
                    confirmButtonText: 'Iniciar Sesión',
                    confirmButtonColor: '#1c4a83',
                    focusConfirm: false,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      this.router.navigate(['/login']);
                    }
                  });
                }
              }
            );
          },
        });
      });
  }

  signOut(): void {
    this.authService.signOut();
  }

  refreshToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  //Inicio de secion con facebook y google

  iniciarForm(): void {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      pwdrep: ['', [Validators.required]],
    });
  }
  //inicio de sesion con usuario y contraseña
  passIguales(): void {
    this.primeroPass = this.formGroup.get('password').value; //obtenemos el valor del campo password
    this.segundoPass = this.formGroup.get('pwdrep').value; //obtenemos el valor del campo pwdrep
    this.email = this.formGroup.get('email').value; //obtenemos el valor del campo email

    if (this.email == '' || this.primeroPass == '' || this.segundoPass == '') {
      //si algun campo esta vacio
      Swal.fire({
        //mostramos un mensaje de error
        icon: 'warning',
        title: 'Datos Insuficientes',
        text: 'Por Favor Ingresa tu correo y contraseña',
        confirmButtonColor: '#1c4a83',
        focusConfirm: false,
      });
      return;
    } else {
      //si todos los campos estan llenos
      if (
        !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g.test(
          this.primeroPass
        )
      ) {
        Swal.fire({
          icon: 'warning',
          title: 'Contraseña Invalida',
          text: 'Minimo 8 caracteres, 1 letra, un numero y un caracter especial',
          confirmButtonColor: '#1c4a83',
          focusConfirm: false,
        });
        return;
      } else {
        if (this.primeroPass != this.formGroup.get('pwdrep').value) {
          //si las contraseñas no coinciden
          Swal.fire({
            //mostramos un mensaje de error
            icon: 'error',
            title: 'Contraseña Invalida',
            text: 'Las contraseñas no coinciden',
            confirmButtonColor: '#1c4a83',
            focusConfirm: false,
          });
        } else {
          //si las contraseñas coinciden
          let nuevoUsuario = new Users( //creamos un nuevo usuario
            `${this.email}`,
            `${this.primeroPass}`,
            '',
            '',
            'Empleado'
          );
          Swal.fire({
            title: 'Registrando',
            html: 'Espera un momento por favor',
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
              this.registrar.registrarUsuario(nuevoUsuario).subscribe(
                //llamamos al servicio para registrar el usuario
                (data: Data) => {
                  console.log(data);
                  if (data != null) {
                    Swal.close();
                    Swal.fire({
                      icon: 'success',
                      title: 'Usuario Registrado',
                      text: 'Por favor, antes de iniciar sesion revisa tu correo para confirmar tu cuenta',
                      confirmButtonColor: '#1c4a83',
                      focusConfirm: false,
                    }).then((result) => {
                      if (result.isConfirmed) {
                        this.router.navigate(['/login']);
                      }
                    });
                  }
                },
                (error: HttpErrorResponse) => {
                  //si ocurre un error
                  if (error.status == 401) {
                    Swal.fire({
                      //mostramos un mensaje de error
                      icon: 'error',
                      title: 'Usuario ya registrado',
                      text: 'Por favor inicia sesion',
                      confirmButtonText: 'Iniciar Sesión',
                      confirmButtonColor: '#1c4a83',
                      focusConfirm: false,
                    }).then((result) => {
                      if (result.isConfirmed) {
                        this.router.navigate(['/login']);
                      }
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
