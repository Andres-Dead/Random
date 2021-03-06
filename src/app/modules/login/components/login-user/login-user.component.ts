import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SocialUser, SocialAuthService } from 'angularx-social-login';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
} from 'angularx-social-login';
import Swal from 'sweetalert2';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css'],
})
export class LoginUserComponent implements OnInit {
  formGroup: FormGroup;
  trys: number = 0;

  //google
  user: SocialUser;
  loggedIn: boolean;

  submitted = false;

  userLogin = {
    email: '',
    password: '',
  };

  constructor(
    private session: SessionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.router.navigate(['/']);
    } else {
      this.startForm();
    }
  }

  startForm(): void {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  validateUser(token: any) {
    this.session.getInfo(token).subscribe((datos: Data) => {
      //llama al servicio de getinfo y le pasa el token
      console.log(datos['data']);
      this.session.getGroup(token).subscribe((tipo: Data) => {
        Swal.close();
        if (tipo['group'] == 1) {
          localStorage.setItem('group', '1');
          if (datos['data'].complete == false) {
            this.router.navigate(['/talento/bienvenido']);
            console.log(datos['data'].complete);
          } else {
            this.router.navigate(['/']);
          }
        } else if (tipo['group'] == 2) {
          localStorage.setItem('group', '2');
          if (datos['data'].complete == false) {
            this.router.navigate(['/empresa/bienvenido']);
            console.log(datos['data'].complete);
          } else {
            this.router.navigate(['/empresa/mesa_trabajo']);
          }
        } else if (tipo['group'] == 4) {
          localStorage.setItem('group', '4');
          if (datos['data'].complete == false) {
            this.router.navigate(['/inicio']);
            console.log(datos['data'].complete);
          } else {
            this.router.navigate(['/recruiters']);
          }
        } else {
          console.log('No tienes permisos');
        }
      });
    });
  }

  normalLogin() {
    this.userLogin.email = this.formGroup.get('email').value; //guardamos el email en el userLogin
    this.userLogin.password = this.formGroup.get('password').value; //guardamos el password en el userLogin
    if (this.userLogin.email == '' || this.userLogin.password == '') {
      //si el email o el password estan vacios
      Swal.fire({
        //mostramos un mensaje de error
        icon: 'warning',
        title: 'Datos insuficientes',
        text: 'Por favor ingresa tu correo y contrase??a',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#1c4a83',
        focusConfirm: false,
      });
      return;
    } else {
      //si el email o el password no estan vacios
      Swal.fire({
        title: 'Iniciando Sesi??n...',
        html: 'Espera un momento por favor',
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
          this.session.loginUser(this.userLogin).subscribe(
            (data) => {
              ///llama al servicio de login y le pasa el email y el password
              //if(data['resultado'] != 'ok')
              /* console.log(data);   */
              localStorage.setItem('token', data['token']); //se guarda el token en el localstorage
              //se verifica que el perfil est?? lleno
              this.validateUser(localStorage.getItem('token'));
              /* this.router.navigate(['/bienvenido']); */
            },
            (error: HttpErrorResponse) => {
              if (error.status === 401) {
                //si el resultado es 401
                //console.log(error);
                this.trys++; //aumentamos el numero de intentos
                if (!(this.trys > 3)) {
                  //si el numero de intentos es menor a 3
                  Swal.fire({
                    //mostramos un mensaje de error
                    icon: 'error',
                    title: 'Error en el inicio de sesion',
                    text: `${error.error.message}`,
                    confirmButtonColor: '#1c4a83',
                  }).then((result) => {
                    if (result.isConfirmed) {
                      /*  window.open(`http://localhost:8080/API/resendActivationCode?login=${this.userLogin.email}`).setTimeout(()=>{
                      window.close()
                    },2000); */
                      this.session
                        .verifyAccount(this.userLogin.email)
                        .subscribe(); //llama al servicio de verifyAccount y envia el email
                    }
                  });
                } else {
                  //si el numero de intentos es mayor a 3
                  Swal.fire({
                    //mostramos un mensaje de error
                    icon: 'error',
                    title: 'Ups intentos superados',
                    text: `Puedes restablecer tu contrase??a`,
                    confirmButtonColor: '#1c4a83',
                  }).then((isConfirm) => {
                    if (isConfirm) {
                      this.router.navigate(['/forgot_pass']); //redirecciona a la pagina de restablecer contrase??a
                    }
                  });
                  this.trys = 0; //reiniciamos el numero de intentos
                }
              }
            }
          );
        },
      });
    }
  }
  //google
  loginGoogle() {
    //Iniciar sesion con google
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((userData) => {
        //llamamos al servicio de google y guardamos lo que nos devuelve en userData
        this.user = userData;
        this.loggedIn = true;
        let gemail = userData.email;
        let gpass = userData.id;
        this.userLogin.email = userData.email; //guardamos el email en el formulario
        this.userLogin.password = userData.id; //guardamos el password en el formulario
        console.log(this.user);
        Swal.fire({
          title: 'Iniciando Sesi??n...',
          html: 'Espera un momento por favor',
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
            this.session.loginUser(this.userLogin).subscribe(
              (data) => {
                //
                if (data['resultado'] != 'ok')
                  if (HttpErrorResponse[1] != 401) {
                    //si el resultado no es ok
                    //si el error no es 401
                    /* console.log(data); */
                    localStorage.setItem('token', data['token']); //guardamos el token en el localstorage
                    //checamos que todo este lleno
                    this.validateUser(localStorage.getItem('token'));
                    /* this.router.navigate(['/bienvenido']); */
                  }
              },
              (error: HttpErrorResponse) => {
                //si el resultado es 401
                if (error.status === 401) {
                  this.trys++; //aumentamos el numero de intentos
                  if (!(this.trys > 3)) {
                    //si el numero de intentos no es mayor a 3
                    Swal.fire({
                      //mostramos un mensaje de error
                      icon: 'error',
                      title: 'Error en el inicio de sesion',
                      text: `${error.error.message}`,
                      confirmButtonColor: '#1c4a83',
                      /*       confirmButtonText: 'Reenviar Correo' */
                    }).then((result) => {
                      //si el usuario da click en reenviar correo
                      if (result.isConfirmed) {
                        this.session
                          .verifyAccount(this.userLogin.email)
                          .subscribe(); //llamamos al sevicio de verifyacount para reenviar el correo
                      }
                    });
                  } else {
                    //si el numero de intentos es mayor a 3
                    Swal.fire({
                      //mostramos un mensaje de error
                      icon: 'error',
                      title: 'Ups intentos superados',
                      text: `Puedes restablecer tu contrase??a`,
                      confirmButtonColor: '#1c4a83',
                    }).then((isConfirm) => {
                      if (isConfirm) {
                        //si el usuario da click en restablecer contrase??a
                        this.router.navigate(['/forgot_pass']); //redireccionamos a la pagina de restablecer contrase??a
                      }
                    });
                    this.trys = 0; //reiniciamos el numero de intentos
                  }
                }
              }
            );
          },
        });
      });
  }

  //facebook
  loginFacebook() {
    //Iniciar sesion con facebook
    this.socialAuthService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((userData) => {
        //llamamos al servicio de facebook y guardamos lo que nos devuelve en userData
        this.user = userData;
        this.loggedIn = true;
        let femail = userData.email; //guardamos el email en el formulario
        let fpass = userData.id; //guardamos el password en el formulario
        this.userLogin.email = userData.email;
        this.userLogin.password = userData.id;
        /* console.log(this.user); */
        Swal.fire({
          title: 'Iniciando Sesi??n...',
          html: 'Espera un momento por favor',
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
            this.session.loginUser(this.userLogin).subscribe(
              (data) => {
                //llamamos al servicio de loginUs y guardamos lo que nos devuelve en data
                if (data['resultado'] != 'ok')
                  if (HttpErrorResponse[1] != 401) {
                    //si el resultado no es 401
                    /* console.log(data); */
                    localStorage.setItem('token', data['token']); //guardamos el token en el localstorage
                    //se checa que este todo lleno
                    this.validateUser(localStorage.getItem('token'));
                    /* this.router.navigate(['/bienvenido']); */
                  }
              },
              (error: HttpErrorResponse) => {
                if (error.status === 401) {
                  //si el resultado es 401
                  this.trys++; //aumentamos el numero de intentos
                  if (!(this.trys > 3)) {
                    //si el numero de intentos no es mayor a 3
                    Swal.fire({
                      //mostramos un mensaje de error
                      icon: 'error',
                      title: 'Error en el inicio de sesion',
                      text: `${error.error.message}`,
                      confirmButtonColor: '#1c4a83',
                      /*confirmButtonText: 'Reenviar Correo' */
                    }).then((result) => {
                      if (result.isConfirmed) {
                        //si el usuario da click en reenviar correo
                        this.session
                          .verifyAccount(this.userLogin.email)
                          .subscribe(); //llamamos al sevicio de verifyacount para reenviar el correo
                      }
                    });
                  } else {
                    //si el numero de intentos es mayor a 3
                    Swal.fire({
                      //mostramos un mensaje de error
                      icon: 'error',
                      title: 'Ups intentos superados',
                      text: `Puedes restablecer tu contrase??a`,
                      confirmButtonColor: '#1c4a83',
                    }).then((isConfirm) => {
                      if (isConfirm) {
                        this.router.navigate(['/forgot_pass']); //redireccionamos a la pagina de restablecer contrase??a
                      }
                    });
                    this.trys = 0; //reiniciamos el numero de intentos
                  }
                }
              }
            );
          },
        });
      });
  }
}
