import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { timeout, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { SessionService } from '../../login/services/session.service';
import { of } from 'rxjs/internal/observable/of';


@Injectable({
  providedIn: 'root'
})
export class WorkTableService {

  constructor(
    private httpService: HttpClient,
    private session : SessionService
    ) { }


  public getCompany(token){
    return this.httpService.get(`${this.session.API}workTable/getCompany`, {
      headers: new HttpHeaders({ Authorization: token }),
    }).pipe(timeout(30000), catchError(e=>{
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: '404',
        text: e.error.message?e.error.message:this.session.excededTime,
        confirmButtonColor: '#1c4a83',
      })
      return of(null);
    }));
  }

  public getWorkTableVacants(token){
    return this.httpService.get(`${this.session.API}workTable/getActiveVacants`, {
      headers: new HttpHeaders({ Authorization: token }),
    }).pipe(timeout(30000), catchError(e=>{
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: '404',
        text: e.error.message?e.error.message:this.session.excededTime,
        confirmButtonColor: '#1c4a83',
      })
      return of(null);
    }));
  }

  public getRecruiters(token){
    return this.httpService.get(`${this.session.API}workTable/getRecruiters`, {
      headers: new HttpHeaders({ Authorization: token }),
    }).pipe(timeout(30000), catchError(e=>{
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: '404',
        text: e.error.message?e.error.message:this.session.excededTime,
        confirmButtonColor: '#1c4a83',
      })
      return of(null);
    }));
  }

  public getLastTalent(token){
    return this.httpService.get(`${this.session.API}workTable/getLastTalent`, {
      headers: new HttpHeaders({ Authorization: token }),
    }).pipe(timeout(30000), catchError(e=>{
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: '404',
        text: e.error.message?e.error.message:this.session.excededTime,
        confirmButtonColor: '#1c4a83',
      })
      return of(null);
    }));
  }

  public getResources(token){
    return this.httpService.get(`${this.session.API}workTable/getResources`, {
      headers: new HttpHeaders({ Authorization: token }),
    }).pipe(timeout(30000), catchError(e=>{
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: '404',
        text: e.error.message?e.error.message:this.session.excededTime,
        confirmButtonColor: '#1c4a83',
      })
      return of(null);
    }));
  }

  public getLastReviews(token){
    return this.httpService.get(`${this.session.API}workTable/getLastReviews`, {
      headers: new HttpHeaders({ Authorization: token }),
    }).pipe(timeout(30000), catchError(e=>{
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: '404',
        text: e.error.message?e.error.message:this.session.excededTime,
        confirmButtonColor: '#1c4a83',
      })
      return of(null);
    }));
  }

}
