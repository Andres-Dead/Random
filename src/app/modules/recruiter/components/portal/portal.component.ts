import { Component, OnInit } from '@angular/core';
import { RecruiterServiceService } from '../../services/recruiter-service.service';
import { Vacante } from '../../interfaces/vacantes';
import * as moment from 'moment';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css'],
})
export class PortalComponent implements OnInit {
  token: string = localStorage.getItem('token');

  // environment data vacant active
  vacant_active: any;
  // environment data vacant inactive
  vacant_inactive: any;
  // days expiration date
  expiration: number;

  constructor(private readonly recrutierService: RecruiterServiceService) {}

  ngOnInit(): void {
    this.getDataPortalActive();
    this.getDataPortalInactive();
  }

  // get vacants active
  getDataPortalActive() {
    this.recrutierService.getWorkTableVacants(this.token).subscribe(
      (data) => {
        this.vacant_active = data['data'];
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getDataPortalInactive() {
    this.recrutierService.getWorkTableVacantsInactive(this.token).subscribe(
      (data) => {
        this.vacant_inactive = data['data'];
        console.log(data, 'INACTIVE');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // get expiration date
  getExpirationDate(date) {
    const date_now = Date.now();
    const format_date = moment(date_now).format('YYYY-MM-DD');
    const diff = new Date(date).getTime() - new Date(format_date).getTime();
    const days = Math.round(diff / (1000 * 60 * 60 * 24));
    return days;
  }
}
