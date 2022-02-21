import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { timeout, catchError } from 'rxjs/operators';
import { SessionService } from './../../login/services/session.service';
import Swal from 'sweetalert2';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root',
})
export class RecruiterServiceService {
  constructor(
    private httpService: HttpClient,
    private session: SessionService
  ) {}

  // service GET portal component active
  public getWorkTableVacants(token) {
    return this.httpService
      .get(`${this.session.API}recruiterTable/getActiveVacants`, {
        headers: new HttpHeaders({ Authorization: token }),
      })
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: '404',
            text: e.error.message ? e.error.message : this.session.excededTime,
            confirmButtonColor: '#1c4a83',
          });
          return of(null);
        })
      );
  }

  // service GET portal component inactive
  public getWorkTableVacantsInactive(token) {
    return this.httpService
      .get(`${this.session.API}recruiterTable/getInactiveVacants`, {
        headers: new HttpHeaders({ Authorization: token }),
      })
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: '404',
            text: e.error.message ? e.error.message : this.session.excededTime,
            confirmButtonColor: '#1c4a83',
          });
          return of(null);
        })
      );
  }

  public getWorkTableInactiveVacants(token) {
    return this.httpService
      .get(`${this.session.API}recruiterTable/getInactiveVacants`, {
        headers: new HttpHeaders({ Authorization: token }),
      })
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: '404',
            text: e.error.message ? e.error.message : this.session.excededTime,
            confirmButtonColor: '#1c4a83',
          });
          return of(null);
        })
      );
  }

  public getLastTalent(token) {
    return this.httpService
      .get(`${this.session.API}recruiterTable/getLastTalent`, {
        headers: new HttpHeaders({ Authorization: token }),
      })
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: '404',
            text: e.error.message ? e.error.message : this.session.excededTime,
            confirmButtonColor: '#1c4a83',
          });
          return of(null);
        })
      );
  }

  public getResources(token) {
    return this.httpService
      .get(`${this.session.API}recruiterTable/getResources`, {
        headers: new HttpHeaders({ Authorization: token }),
      })
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: '404',
            text: e.error.message ? e.error.message : this.session.excededTime,
            confirmButtonColor: '#1c4a83',
          });
          return of(null);
        })
      );
  }

  public getCompany(token) {
    return this.httpService
      .get(`${this.session.API}recruiterTable/getCompany`, {
        headers: new HttpHeaders({ Authorization: token }),
      })
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: '404',
            text: e.error.message ? e.error.message : this.session.excededTime,
            confirmButtonColor: '#1c4a83',
          });
          return of(null);
        })
      );
  }

  // get info profile reclutier
  getInfo(token) {
    return this.httpService
      .get(`${this.session.API}getInfo`, {
        headers: new HttpHeaders({ Authorization: token }),
      })
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: '404',
            text: e.error.message ? e.error.message : this.session.excededTime,
            confirmButtonColor: '#1c4a83',
          });
          return of(null);
        })
      );
  }

  UpdateInfo(token: string, body: any) {
    return this.httpService
      .put(`${this.session.API}updateInfo`, body, {
        headers: new HttpHeaders({ Authorization: token }),
      })
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: '404',
            text: e.error.message ? e.error.message : this.session.excededTime,
            confirmButtonColor: '#1c4a83',
          });
          return of(null);
        })
      );
  }

  updateEmail(token: string, body: any) {
    return this.httpService
      .put(`${this.session.API}email`, body, {
        headers: new HttpHeaders({ Authorization: token }),
      })
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: '404',
            text: e.error.message ? e.error.message : this.session.excededTime,
            confirmButtonColor: '#1c4a83',
          });
          return of(null);
        })
      );
  }

  updatePassword(token: string, body: any) {
    return this.httpService
      .put(`${this.session.API}password`, body, {
        headers: new HttpHeaders({ Authorization: token }),
      })
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: '404',
            text: e.error.message ? e.error.message : this.session.excededTime,
            confirmButtonColor: '#1c4a83',
          });
          return of(null);
        })
      );
  }
}
