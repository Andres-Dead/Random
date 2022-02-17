import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { Postulados } from './../../interfaces/postulados';
import { Recursos } from './../../interfaces/recursos';
import { Recruiter } from './../../interfaces/reclutador';
import { Reviews } from './../../interfaces/reviews';
import { Vacante } from './../../interfaces/vacantes';
import { VacantesInactivas } from './../../interfaces/vacantes-inactivas';
import { RecruiterServiceService } from '../../services/recruiter-service.service';
import { SessionService } from '../../../login/services/session.service';

@Component({
  selector: 'app-work-table',
  templateUrl: './work-table.component.html',
  styleUrls: ['./work-table.component.css']
})
export class WorkTableComponent implements OnInit {

  postulado     : any;
  recurso       : any;
  reclutador    : any;
  review        : any;
  vacante       : any;
  inactiva      : any;
  fechaCreacion : Date;
  fechaExpirada : Date;
  company       : any;
  score         : any ;

  postulados   : Postulados[]  = [];
  recursos     : Recursos[]    = [];
  reclutadores : Recruiter[]  = [];
  reviews      : Reviews[]     = [];
  vacantes     : Vacante[]    = [];
  inactivas    : VacantesInactivas[]=[];
  
  constructor(
    private service: RecruiterServiceService,
    private session: SessionService
  ) { }

  ngOnInit(): void {
    this.getRecruiter();
    this.getInfoVacantes();
    this.getInactiveVacants();
    this.getLastTalent();
    this.getResources();
    this.getCompany();
  }

  getInfoVacantes(){
    return this.service
    .getWorkTableVacants(localStorage.getItem('token'))
    .subscribe((vacantes: Data)=>
    { 
      for(let item of vacantes['data']){
        this.vacantes.push(item);
      }
    })
  }

  getInactiveVacants(){
    return this.service
    .getWorkTableInactiveVacants(localStorage.getItem('token'))
    .subscribe((inactivas: Data)=>
    {
      for(let item of inactivas['data']){
        this.inactivas.push(item)
      }
    })
  }

  getResources(){
    return this.service
    .getResources(localStorage.getItem('token'))
    .subscribe((res)=>{this.recurso = res['data']})
  }

  getRecruiter(){
    return this.session
    .getInfo(localStorage.getItem('token'))
    .subscribe((res)=>{this.reclutador = res;})
  }

  getLastTalent(){
    return this.service
    .getLastTalent(localStorage.getItem('token'))
    .subscribe((postulados: Data)=>
    {
      for(let item of postulados['data']){
        this.postulados.push(item)
      }
    })
  }

  getCompany(){
    return this.service
    .getCompany(localStorage.getItem('token'))
    .subscribe((res)=>{this.company = res['data']})
  }

}
