import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Data } from '@angular/router';
import { Categories } from 'src/app/modules/recruiter/interfaces/categories';
import { CompanyServiceService } from '../../services/company-service.service';

@Component({
  selector: 'app-about-company',
  templateUrl: './about-company.component.html',
  styleUrls: ['./about-company.component.css']
})
export class AboutCompanyComponent implements OnInit {
  public readOnly: boolean = true;

  information: any;
  categorias: Categories[] = [];

  info = this.fb.group({
    category: [0, Validators.required],
    num_workers: [0,Validators.required],
    description: ['',Validators.required]
  });

  constructor(
    private service: CompanyServiceService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getInfo();
    this.getCategories();
  }
  getInfo() {
    return this.service
      .getInfo(localStorage.getItem('token'))
      .subscribe((response) => {
        this.information = response['data'].company_info;
        this.info.patchValue({
          category: this.information.category,
          num_workers: this.information.num_workers,
          description: this.information.description  
        })
      });
  }

  getCategories() {
    return this.service.getCategories().subscribe((categorias: Data) => {
      for (let categoria of categorias['categories']) {
        this.categorias.push(categoria);
      }
    });
  }

  updateInfo() {
    return this.service
      .updateInfo(localStorage.getItem('token'), this.info.value)
      .subscribe(() => {
        this.readOnly = true;
      },(err)=>{console.warn(err)});
  }
  disabled() {
    return (this.readOnly = false);
  }

}
