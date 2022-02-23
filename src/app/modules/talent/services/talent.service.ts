import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, timeout } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { SessionService } from '../../login/services/session.service';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root',
})
export class TalentServiceService {
  constructor(
    private httpService: HttpClient,
    private session: SessionService
  ) {}

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

  updateInfo(token, form) {
    return this.httpService.put(`${this.session.API}updateInfo`, form, {
      headers: new HttpHeaders({ Authorization: token }),
    });
  }

  updateJob(token, form) {
    return this.httpService.put(`${this.session.API}updateJob`, form, {
      headers: new HttpHeaders({ Authorization: token }),
    });
  }

  getEducation(token) {
    return this.httpService
      .get(`${this.session.API}getEducation`, {
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

  updateWorkExperience(token, form) {
    return this.httpService.put(`${this.session.API}/WorkExperience`, form, {
      headers: new HttpHeaders({ Authorization: token }),
    });
  }
}
