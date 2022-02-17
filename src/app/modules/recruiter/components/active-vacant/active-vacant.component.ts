import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { Recruiter } from '../../interfaces/reclutador';
import { RecruiterServiceService } from '../../services/recruiter-service.service';

@Component({
  selector: 'app-active-vacants',
  templateUrl: './active-vacants.component.html',
  styleUrls: ['./active-vacants.component.css']
})
export class ActiveVacantsComponent implements OnInit {

  recurso       : any;

  constructor(
    private session   : RecruiterServiceService
  ) { }

  ngOnInit(): void {

  }

  getResouces(){
    this.session.getResources(localStorage.getItem('token'))
    .subscribe((res)=>{this.recurso = res['data']})
  }



}
