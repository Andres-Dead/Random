import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { WorkTableService } from '../../services/work-table.service';
import { LastTalent } from '../../interfaces/last-talent';
import { Recruiter } from '../../interfaces/recruiter';
import { VacanteActiva } from '../../interfaces/vacante-activa';
import { Review } from '../../interfaces/review';
@Component({
  selector: 'app-work-table',
  templateUrl: './work-table.component.html',
  styleUrls: ['./work-table.component.css']
})
export class WorkTableComponent implements OnInit {
  public vacante    : any;
  public recruiter  : any;
  public lastTalent : any;
  public review     : any;
  public resource   : any;
  public company    : any;
  
  public vacantesActivas  : VacanteActiva[] = [];
  public recruiters       : Recruiter[]     = [];
  public LastTalents      : LastTalent[]    = [];
  public resources        : Recruiter[]     = [];
  public reviews          : Review[]        = []


  constructor(
    private workTable : WorkTableService
  ) { }

  ngOnInit(): void {
    this.getInfoCompany();
    this.getInfoVacantes();
    this.getInfoRecruiters();
    this.getInfoLastVacants();
    this.getInfoResources();
    this.getInfoLastReviews();

  }

  getInfoCompany(){
    return this.workTable
    .getCompany(localStorage.getItem('token'))
    .subscribe((item)=>
    {this.company = item;})
  }

  getInfoVacantes(){
    return this.workTable
    .getWorkTableVacants(localStorage.getItem('token'))
    .subscribe((vacantesActivas: Data)=>
    { 
      for(let item of vacantesActivas['data']){
        this.vacantesActivas.push(item)
      }
    })
  }

  getInfoRecruiters(){
    return this.workTable
    .getRecruiters(localStorage.getItem('token'))
    .subscribe((recruiters: Data)=>
    { 
      for(let item of recruiters['data']){
        this.recruiters.push(item)
      }
    })
  }

  getInfoLastVacants(){
    return this.workTable
    .getLastTalent(localStorage.getItem('token'))
    .subscribe((LastTalents: Data)=>
    { 
      for(let item of LastTalents['data']){
        this.LastTalents.push(item)
        console.log(item);
        
      }
    })
  }

  getInfoResources(){
    return this.workTable
    .getResources(localStorage.getItem('token'))
    .subscribe((item)=>
    {this.resource = item;})
  }

  getInfoLastReviews(){
    return this.workTable
    .getLastReviews(localStorage.getItem('token'))
    .subscribe((reviews: Data)=>
    { 
      for(let item of reviews['data']){
        this.reviews.push(item)
      }
    })
  }

  score(number: number){
    for(let i = 0; i<number; i++){
      
    }
  }
}
