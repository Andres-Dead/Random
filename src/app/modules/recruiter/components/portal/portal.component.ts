import { Component, OnInit } from '@angular/core';
import { RecruiterServiceService } from '../../services/recruiter-service.service';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css'],
})
export class PortalComponent implements OnInit {
  token: string = localStorage.getItem('token');

  result: any;

  constructor(private readonly recrutierService: RecruiterServiceService) {}

  ngOnInit(): void {
    this.getDataPortal();
  }

  // get data to portal
  getDataPortal() {
    this.recrutierService.getWorkTableVacants(this.token).subscribe(
      (data) => {
        this.result = data;
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
