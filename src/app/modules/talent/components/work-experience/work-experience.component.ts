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
  workE: any;
  lessonsForm: any;
  experiencias = [];
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
    const lessonForm = this.fb.group({
      company_name: ['', Validators.required],
      role: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      active: [false, Validators.required],
      location: ['', Validators.required],
      details: ['', Validators.required],
    });
    this.lesson.push(lessonForm);
    console.log(this.form.value);
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
            this.workE = this.information.work_experience;
            this.fillForm(this.workE);
          });
      },
    });
  }

  fillForm(data) {
    this.experiencias.push(data);
    console.log(this.experiencias);
  }
}
