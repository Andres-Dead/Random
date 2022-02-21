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

  // order
  public arrTalentos: any[] = [];
  public arrTalentosInactive: any[] = [];
  public elegido: string = 'Tipo de trabajo';

  constructor(private readonly recrutierService: RecruiterServiceService) {}

  ngOnInit(): void {
    this.getDataPortalActive();
    this.getDataPortalInactive();
  }

  // get vacants active
  getDataPortalActive() {
    this.recrutierService.getWorkTableVacants(this.token).subscribe(
      (data) => {
        // this.arrTalentos = data['data'];
        for (const key in data['data']) {
          this.arrTalentos.push(data['data'][key]);
        }
        console.log(this.arrTalentos);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getDataPortalInactive() {
    this.recrutierService.getWorkTableVacantsInactive(this.token).subscribe(
      (data) => {
        for (const key in data['data']) {
          this.arrTalentosInactive.push(data['data'][key]);
        }
        console.log(this.arrTalentosInactive, 'INACCCC');

        // this.vacant_inactive = data['data'];
        // console.log(data, 'INACTIVE');
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

  // order vacants
  public ordSalarioMin() {
    this.arrTalentos.sort((a, b) => {
      if (a.min_salary < b.min_salary) {
        return 1;
      }
      if (a.min_salary > b.min_salary) {
        return -1;
      }
      return 0;
    });
    return this.arrTalentos, (this.elegido = 'Salario Minimo');
  }

  public ordSalarioMinInactive() {
    this.arrTalentosInactive.sort((a, b) => {
      if (a.min_salary < b.min_salary) {
        return 1;
      }
      if (a.min_salary > b.min_salary) {
        return -1;
      }
      return 0;
    });
    return this.arrTalentosInactive, (this.elegido = 'Salario Minimo');
  }
}
