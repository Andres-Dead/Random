import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  educationForm = this.fb.group({
    education: this.fb.array([])
  });

  constructor(
    private fb : FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  get education(){
    return this.educationForm.controls["education"] as FormArray;
  }

  addEducation(){
    const formEducation = this.fb.group({
      ID              : [''],
      id_user         : [''],
      institution     : ['', Validators.required],
      academic_level  : ['', Validators.required],
      title           : ['', Validators.required],
      start_date      : ['', Validators.required],
      end_date        : ['', Validators.required],
      student         : ['', Validators.required],
      location        : ['', Validators.required]
    });
    this.education.push(formEducation);
  }

  deleteEducation(educationIndex  : number){
    this.education.removeAt(educationIndex);
  }

}
