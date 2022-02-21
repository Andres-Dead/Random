import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RecruiterServiceService } from '../../services/recruiter-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  token: string = localStorage.getItem('token');
  public formGroup: FormGroup;
  public passGroup: FormGroup;
  profile: any;

  constructor(
    private readonly service: RecruiterServiceService,
    private readonly _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formProfile();
    this.formPassword();
    this.getProfile();
  }

  // reactive form
  formProfile(): void {
    this.formGroup = this._formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });
  }

  formPassword(): void {
    this.passGroup = this._formBuilder.group({
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
    });
  }

  // services
  getProfile() {
    this.service.getInfo(this.token).subscribe(
      (data) => {
        this.profile = data['data'].recruiter_info;
        this.formGroup.patchValue({
          name: data['data'].recruiter_info.name,
          email: data['data'].recruiter_info.email,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  editName() {
    const body = {
      name: this.formGroup.getRawValue().name,
      location: this.profile.location,
    };
    this.service.UpdateInfo(this.token, body).subscribe(
      (data) => {
        console.log(data);
        return data;
      },
      (res) => {
        console.log(res);
        return false;
      }
    );
  }

  editEmail() {
    const body = {
      email: this.formGroup.getRawValue().email,
    };
    this.service.updateEmail(this.token, body).subscribe(
      (data) => {
        console.log(data);
        return data;
      },
      (res) => {
        console.log(res);
        return false;
      }
    );
  }

  editPassword() {
    if (
      this.passGroup.getRawValue().password ===
      this.passGroup.getRawValue().confirm_password
    ) {
      const body = {
        password: this.passGroup.getRawValue().password,
      };
      this.service.updatePassword(this.token, body).subscribe(
        (data) => {
          Swal.fire({
            icon: 'success',
            title: 'Cambio de contraseña',
            text: 'La contraseña se ha actualizado con éxito!',
          });
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las contraseñas no coinciden',
      });
    }
  }

  editProfile() {
    this.editName();
    this.editEmail();
  }
}
