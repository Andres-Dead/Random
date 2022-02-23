import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TalentServiceService } from '../../services/talent.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.css'],
})
export class WorkExperienceComponent implements OnInit {
  public readOnly: boolean = true;

  information: any;
  workExperienceForms: FormGroup;
  profileForm: FormGroup;

  constructor(private fb: FormBuilder, private service: TalentServiceService) {
  }
  
  ngOnInit(): void {
    this.getInfo();
    this.profileForm = this.fb.group({
    work_experience: this.fb.array([]),
    });
  }
  loadForm(data){
    for(let i = 0; i<data.length; i++){
      const wEArray = this.profileForm.get('work_experience') as FormArray;
      wEArray.push(this.work_experience);
    }

    this.profileForm.patchValue(data);
    console.log(this.profileForm.get('work_experience').value)

  }


  get work_experience(){
    return this.fb.group({
      ID            :['',Validators.required],
      id_user       :['',Validators.required],
      role          :['',Validators.required],
      company_name  :['',Validators.required],
      start_date    :['',Validators.required],
      end_date      :['',Validators.required],
      active        :['',Validators.required], 
      location      :['',Validators.required],
      details       :['',Validators.required]
    })
  }


  disabled() {
    return (this.readOnly = false);
  }

  getInfo() {
    Swal.fire({
      title: 'Cargando...',
      html: 'Espere un momento por favor',
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
        return this.service
          .getInfo(localStorage.getItem('token'))
          .subscribe((response) => {
            Swal.close();
            this.information = response['data'];
            this.loadForm(this.information.work_experience)
          });
          //AHORA QUE HAGO XDDDDD
      },
    });
  }
}
