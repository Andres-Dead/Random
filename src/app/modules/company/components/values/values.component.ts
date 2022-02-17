import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CompanyServiceService } from '../../services/company-service.service';

@Component({
  selector: 'app-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.css']
})
export class ValuesComponent implements OnInit {
  public readOnly: boolean = true;

  information: any;

  info = this.fb.group({
    business_values: ['', Validators.required],
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
          business_values: this.information.business_values
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
