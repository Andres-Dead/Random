import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TalentServiceService } from '../../services/talent.service';
import { PersonaInfo } from '../../interfaces/persona-info';
import { Data } from '@angular/router';
import { VacantService } from 'src/app/modules/recruiter/services/vacant.service';

@Component({
  selector: 'app-person-info',
  templateUrl: './person-info.component.html',
  styleUrls: ['./person-info.component.css'],
})
export class PersonInfoComponent implements OnInit {

  educations : Array<any> = [];
  public readOnly: boolean = true;

  information: PersonaInfo;

  profileForm = this.fb.group({
    handicap: [0, Validators.required],
    travel  : [0, Validators.required],
    education:[0, Validators.required]
  });

  educationSelected = this.profileForm.controls['education'].value;

  constructor(
    private fb: FormBuilder, 
    private service: TalentServiceService,
    private edu: VacantService 
    ) {}

  ngOnInit(): void {
    this.getInfo();
    this.getEducation();
  }

  disabled() {
    return (this.readOnly = false);
  }

  getInfo() {
    return this.service
      .getInfo(localStorage.getItem('token'))
      .subscribe((response) => {
        this.information = response['data'];
        this.profileForm.patchValue({
          handicap: this.information['persona_info'].handicap,
          travel  : this.information['persona_info'].travel,
          education:this.information['persona_info'].education
        });
      });
  }

  getEducation() {
    return this.edu
      .getEducations()
      .subscribe((response : Data) => {
        for(let education of response['education']){
          this.educations.push(education)
        }
      });
  }

  updateInfo(){
    return this.service
    .updateInfo(localStorage.getItem('token'),this.profileForm.value)
    .subscribe(() => {
      this.readOnly = true;
    },(err)=>{console.warn(err)});
  }

  noHandicap(){
    this.profileForm.patchValue({
      handicap : 0
    });
  }

  handicap(){
    this.profileForm.patchValue({
      handicap : 1
    });
  }

  noTravel(){
    this.profileForm.patchValue({
      travel : 0
    });
  }

  travel(){
    this.profileForm.patchValue({
      travel : 1
    });
  }

  depends(){
    this.profileForm.patchValue({
      travel : 2
    });
  }

}
