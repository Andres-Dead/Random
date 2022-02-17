import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CompanyServiceService } from '../../services/company-service.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {
  public readOnly: boolean = true;

  information: any;

  info = this.fb.group({
    state: ['', Validators.required],
    city: ['',Validators.required],
    cp: ['',Validators.required],
    web: ['',Validators.required],
    fb: ['',Validators.required],
    ig: ['',Validators.required],
    linkedin: ['',Validators.required],
    twitter: ['',Validators.required],
    contact_name: ['',Validators.required],
    contact_email: ['',Validators.required],
    phone: ['',Validators.required]
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
          state: this.information.state,
          city: this.information.city,
          cp: this.information.cp,
          web: this.information.web,
          fb: this.information.fb,
          ig: this.information.ig,
          linkedin: this.information.linkedin,
          twitter: this.information.twitter,
          contact_name: this.information.contact_name,
          contact_email: this.information.contact_email,
          phone: this.information.phone
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
