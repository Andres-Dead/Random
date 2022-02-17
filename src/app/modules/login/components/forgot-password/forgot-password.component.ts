import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { SessionService } from '../../services/session.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  email: string;

  formGroup = this.fb.group({
    email: ['',[Validators.required, Validators.email]]
  })

  constructor(
    private session: SessionService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {

  }


  passwordReset(): void {
    this.email = this.formGroup.get('email').value;
    if (this.email == '') {
      Swal.fire({
        icon: 'warning',
        title: 'Datos Insuficientes',
        text: 'Por Favor Ingresa tu correo',
        confirmButtonColor: '#1c4a83',
        focusConfirm: false,
      });
      return;
    } else {
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
        Swal.fire({
          title: 'Enviando correo...',
          html: 'Tranquilo... ¡ya recuperarás tu cuenta!',
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
            this.session
              .forgotPassword(this.formGroup.value)
              .subscribe((data) => {
                if (data instanceof HttpErrorResponse) {
                  Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.error.error,
                    confirmButtonColor: '#1c4a83',
                    focusConfirm: false,
                  });
                } else {
                  console.log(data);
                  Swal.close();
                  Swal.fire({
                    icon: 'success',
                    title: 'Correo Enviado',
                    text: 'Por favor revisa tu correo',
                    confirmButtonColor: '#1c4a83',
                    focusConfirm: false,
                  });
                }
              });
          },
        });
      }
    }
  }
}
