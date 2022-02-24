import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TalentServiceService } from '../../services/talent.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.css'],
})
export class WorkExperienceComponent implements OnInit{
  public readOnly: boolean = true;

  information: any;
  // workExperienceForms: FormGroup;
  form: FormGroup = this.fb.group({
    lesson: this.fb.array([this.fb.control('', [Validators.required])]),
  });

  constructor(private fb: FormBuilder, private service: TalentServiceService) {}

  ngOnInit(): void {
  this.getInfo();
  }

  get lesson() {
    return this.form.get('lesson') as FormArray;
  }

  AddWorkExperience() {
    this.lesson.push(this.fb.control('', [Validators.required]));
    // const lessonForm = this.fb.group({
    // company_name: ['', Validators.required],
    // role: ['', Validators.required],
    // start_date: ['', Validators.required],
    // end_date: ['', Validators.required],
    // active: [false, Validators.required],
    // location: ['', Validators.required],
    // details: ['', Validators.required],
    // });
  }

  // deleteWorkExperience(experienceIndex) {
  // this.work_experience.removeAt(experienceIndex);
  // }

  // disabled() {
  // return (this.readOnly = false);
  // }

  getInfo() {
<<<<<<< HEAD
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
  });
  },
  });
=======
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
      },
    });
>>>>>>> 95ca9909048148e83b77453b83d80ecc2f0c2f4e
  }
}
