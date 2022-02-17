import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ChangeEmailService } from '../../services/change-email.service';
import { CompanyServiceService } from '../../services/company-service.service';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css'],
})
export class BasicInfoComponent implements OnInit {
  public readOnly: boolean = true;

  information: any;

  basicInfo = this.fb.group({
    display_name: ['', Validators.required],
    business_name: ['', Validators.required],
    rfc: ['', Validators.required],
    contact_email: ['', Validators.required],
  });

  constructor(
    private service: CompanyServiceService,
    private fb: FormBuilder,
    private serviceChageEmail: ChangeEmailService
  ) {}

  ngOnInit(): void {
    this.getInfo();
  }
  getInfo() {
    return this.service
      .getInfo(localStorage.getItem('token'))
      .subscribe((response) => {
        this.information = response['data'].company_info;
        this.basicInfo.patchValue({
          display_name: this.information.display_name,
          business_name: this.information.business_name,
          rfc: this.information.rfc,
          contact_email: this.information.contact_email,
        });
      });
  }

  updateInfo() {
    return this.service
      .updateInfo(localStorage.getItem('token'), this.basicInfo.value)
      .subscribe(
        () => {
          this.readOnly = true;
        },
        (err) => {
          console.warn(err);
        }
      );
  }
  disabled() {
    return (this.readOnly = false);
  }

  public async changeEmail() {
    const { value: text } = await Swal.fire({
      input: 'email',
      inputLabel: 'Ingresa tu nuevo correo',
      inputPlaceholder: 'Ingresa tu nuevo correo',
      confirmButtonColor: '#1C4A83',
      inputValidator: (value) => {
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value)) {
          return 'El correo no es valido';
        }
        return !value && 'El correo es requerido';
      },
      showCancelButton: true,
    });

    if (text) {
      Swal.fire({
        title: '¿Estas seguro?',
        text: 'Se cambiara tu correo',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1C4A83',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, cambiar!',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.value) {
          this.serviceChageEmail
            .changeEmail(localStorage.getItem('token'), text)
            .subscribe(
              () => {
                Swal.fire(
                  'Correo cambiado!',
                  'Tu correo ha sido cambiado con exito',
                  'success'
                );
                this.getInfo();
              },
              (err) => {
                Swal.fire('Error', 'Algo salio mal', 'error');
              }
            );
        }
      });
    }
  }
}
