import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CompanyServiceService } from '../../services/company-service.service';

@Component({
  selector: 'app-certificados',
  templateUrl: './certificados.component.html',
  styleUrls: ['./certificados.component.css']
})
export class CertificadosComponent implements OnInit {
  public readOnly: boolean = true;

  information: any;

  info = this.fb.group({
    cert: ['', Validators.required]
  });

  constructor(
    private service: CompanyServiceService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getInfo();
  }
  getInfo() {
    return this.service
      .getInfo(localStorage.getItem('token'))
      .subscribe((response) => {
        this.information = response['data'].company_info;
        this.info.patchValue({
          cert: this.information.cert
        })
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
