import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from '../../login/services/session.service';
import { catchError, timeout } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacantService {

  constructor(
    private httpService : HttpClient,
    private session     : SessionService
      
    ) { }

  public addNewVacant(token, vacante){
    console.log(token+" "+vacante);
    return this.httpService.post(`${this.session.API}vacants`,vacante,{
      headers: new HttpHeaders({ Authorization: token }),
    }).pipe(timeout(3000), catchError(err =>{
      console.log(err)
      return of(null);
    }));
  }

  public getCategories(){
    return this.httpService.get(`${this.session.API}getCategories`)
    .pipe(timeout(3000), catchError(err =>{
      console.log(err);
      return of(null);
    }))
  }

  public getEducations(){
    return this.httpService.get(`${this.session.API}getEducation`)
    .pipe(timeout(3000), catchError(err =>{
      console.log(err);
      return of(null);
    }))
  }

  public getModalities(){
    return this.httpService.get(`${this.session.API}getModalities`)
    .pipe(timeout(3000), catchError(err =>{
      console.log(err);
      return of(null);
    }))
  }

  public getJobType(){
    return this.httpService.get(`${this.session.API}getJobType`)
    .pipe(timeout(3000), catchError(err =>{
      console.log(err);
      return of(null);
    }))
  }

  public getCountries(){
    return this.httpService.get(`${this.session.API}getCountries`)
    .pipe(timeout(5000), catchError(err =>{
      console.log(err);
      return of(null);
    }))
  }

  public getStates(id){
    return this.httpService.get(`${this.session.API}getStates?country=${id}`)
    .pipe(timeout(5000), catchError(err =>{
      console.log(err);
      return of(null);
    }))
  }

  public getCities(id){
    return this.httpService.get(`${this.session.API}getCities?state=${id}`)
    .pipe(timeout(5000), catchError(err =>{
      console.log(err);
      return of(null);
    }))
  }

  getVacant(token, id){
    return this.httpService.get(`${this.session.API}vacant/${id}`,{
      headers: new HttpHeaders({ Authorization: token })})
    .pipe(timeout(5000), catchError(err =>{
      console.log(err);
      return of(null);
    }))
  }


}
