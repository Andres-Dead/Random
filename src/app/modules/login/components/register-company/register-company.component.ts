import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Empresas } from '../../interfaces/empresas';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.css']
})
export class RegisterCompanyComponent implements OnInit {
  formGroup: FormGroup;

  ban: boolean = false;

  username: string;
  razonSocial: string;
  rfc: string;
  email: string;
  password: any;
  pwdrep: any;

  constructor(
    public fb: FormBuilder,
    private registrar: RegisterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.iniciarForm();
  }

  iniciarForm(): void {
    this.formGroup = this.fb.group({
      username: ['', Validators.required],
      razonSocial: ['', Validators.required],
      rfc: ['', Validators.required],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      pwdrep: ['', [Validators.required]],
    });
  }

  registrarEmpresa(): void {
    this.username = this.formGroup.get('username').value;
    this.razonSocial = this.formGroup.get('razonSocial').value;
    this.rfc = this.formGroup.get('rfc').value;
    this.email = this.formGroup.get('email').value;
    this.password = this.formGroup.get('password').value;
    this.pwdrep = this.formGroup.get('pwdrep').value;

    if (
      this.username == '' ||
      this.razonSocial == '' ||
      this.rfc == '' ||
      this.email == '' ||
      this.password == '' ||
      this.pwdrep == ''
    ) {
      Swal.fire({
        icon: 'warning',
        title: 'Datos Insuficientes',
        text: 'Por favor ingresa todos tus datos',
        confirmButtonColor: '#1c4a83',
        focusConfirm: false,
      });
      return;
    } else {
      if (
        !/^([A-Z,Ñ,&]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[A-Z|\d]{3})$/gi.test(
          this.rfc
        )
      ) {
        Swal.fire({
          icon: 'warning',
          title: 'RFC Invalido',
          text: 'Por favor ingresa un RFC valido',
          confirmButtonColor: '#1c4a83',
          focusConfirm: false,
        });
        return;
      } else {
        this.ban = true;
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(this.email)) {
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
            !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g.test(
              this.password
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
            if (this.password != this.formGroup.get('pwdrep').value) {
              Swal.fire({
                icon: 'error',
                title: 'Contraseña Invalida',
                text: 'Las contraseñas no coinciden',
                confirmButtonColor: '#1c4a83',
                focusConfirm: false,
              });
              return;
            }
          }
        }
      }
    }
    if (this.ban === true) {
      //validar RFC con API
      let nuevaEmpresa = new Empresas(
        this.username,
        this.razonSocial,
        this.rfc,
        this.email,
        this.password,
        'Empresa'
      );
      console.log(nuevaEmpresa);

      Swal.fire({
        title: 'Registrando',
        html: 'Espera un momento por favor',
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
          this.registrar.registrarEmpresa(nuevaEmpresa).subscribe(
            (data) => {
              Swal.close();
              Swal.fire({
                icon: 'success',
                title: 'Registro Exitoso',
                text: 'Verifica tu email para activar tu cuenta',
                confirmButtonColor: '#1c4a83',
                confirmButtonText: `Iniciar Sesion`,
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
                });
              }
            }
          );
          console.log(nuevaEmpresa);
        },
      });
    }

    console.log(this.formGroup.value);
  }

}
