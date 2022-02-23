import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TalentServiceService } from '../../services/talent.service';
import { PersonaInfo } from '../../interfaces/persona-info';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css'],
})
export class BasicInfoComponent implements OnInit {
  public readOnly: boolean = true;

  information: PersonaInfo;

  profileForm = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    gender: ['', Validators.required],
    birthdate: ['', Validators.required],
    country: [0, Validators.required],
    location: [0, Validators.required],
    handicap: [0, Validators.required],
    civil_status: [0, Validators.required],
    travel: [0, Validators.required],
    education: [0, Validators.required],
    has_car: [0, Validators.required],
    has_job: [0, Validators.required],
    license: ['', Validators.required],
    contact_email:['',Validators.required],
    linkedin:['', Validators.required],
    phone: ['', Validators.required],
    whatsapp: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private service: TalentServiceService) {}

  ngOnInit(): void {
    this.getInfo();
  }

  disabled() {
    return (this.readOnly = false);
  }

  getInfo() {
    return this.service
      .getInfo(localStorage.getItem('token'))
      .subscribe((response) => {
        this.information = response['data'];
        console.log(this.information);
        this.profileForm.patchValue({
          first_name: this.information['persona_info'].first_name,
          last_name:   this.information['persona_info'].last_name,
          gender:   this.information['persona_info'].gender,
          birthdate:   this.information['persona_info'].birthdate,
          country:  this.information['persona_info'].country,
          location:  this.information['persona_info'].state,
          handicap:  this.information['persona_info'].handicap,
          civil_status:  this.information['persona_info'].civil_status,
          travel:  this.information['persona_info'].travel,
          education:  this.information['persona_info'].education,
          has_car:  this.information['persona_info'].has_car,
          has_job:  this.information['persona_info'].has_job,
          license:   this.information['persona_info'].license,
          contact_email: this.information['persona_info'].contact_email,
          linkedin: this.information['persona_info'].linkedin,
          phone: this.information['persona_info'].phone,
          whatsapp: this.information['persona_info'].whatsapp
        });
      });
  }

  updateInfo(){
    return this.service.updateInfo(localStorage.getItem('token'),this.information['persona_info'].value)
  }

  MoveLocation() {
    if (this.profileForm.controls['move'].value == true) {
      this.profileForm.patchValue({
        move: 1,
      });
    } else {
      this.profileForm.patchValue({
        move: 0,
      });
    }
  }


}
