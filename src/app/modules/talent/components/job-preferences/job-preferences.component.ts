import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { TalentServiceService } from '../../services/talent.service';
import { PersonaInfo } from '../../interfaces/persona-info';
import { Data } from '@angular/router';
import { VacantService } from 'src/app/modules/company/services/vacant.service';
import { TiposDeTrabajo } from 'src/app/modules/recruiter/interfaces/tipos-de-trabajo';

@Component({
  selector: 'app-job-preferences',
  templateUrl: './job-preferences.component.html',
  styleUrls: ['./job-preferences.component.css']
})
export class JobPreferencesComponent implements OnInit {
  tipos       : TiposDeTrabajo  [] = [];
  public readOnly: boolean = true;

  information: any;

  profileForm = this.fb.group({
    ID:[''],
    role: ['', Validators.required],
    job_type    : this.fb.array([]),
    laboral_exp:[0, Validators.required],
    expected_salary:[0, Validators.required],
    expected_period:[0, Validators.required]
  });


  jobTypeForm   : any;

  constructor(private fb: FormBuilder,
    private servicev: VacantService,  
    private service: TalentServiceService) {}

  ngOnInit(): void {
    this.getInfo();
    this.updateInfo();
    this.jobTypeForm = this.fb.group({
      ID : [0, Validators.required],
      ID1: [0, Validators.required],
      ID2: [0, Validators.required]
    });
  }

  get job_type(){
    return this.profileForm.controls["job_type"] as FormArray;
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
          ID              :this.information['job_preferences'].ID,
          role            :this.information['job_preferences'].role,
          job_type        :this.information['job_preferences'].job_type,
          laboral_exp     :this.information['job_preferences'].laboral_exp,
          expected_salary :this.information['job_preferences'].expected_salary,
          expected_period :this.information['job_preferences'].expected_period,
        });
      });
  }

  updateInfo(){
    this.job_type.push(this.jobTypeForm);
    return this.service.updateJob(localStorage.getItem('token'),this.profileForm.value)
  }

  getJobType() {
    return this.servicev.getJobType().subscribe((tipos: Data) => {
      for (let tipo of tipos['job_type']) {
        this.tipos.push(tipo);
      }
    });
  }


}
