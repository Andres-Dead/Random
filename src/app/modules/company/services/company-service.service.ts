import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, timeout } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import Swal from 'sweetalert2';
import { SessionService } from '../../login/services/session.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompanyServiceService {
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

  public getCategories() {
    return this.httpService.get(`${this.session.API}getCategories`).pipe(
      timeout(3000),
      catchError((err) => {
        console.log(err);
        return of(null);
      })
    );
  }

  public updateInfo(token: any, args: object) {
    return this.httpService.put(`${this.session.API}updateCompanyInfo`, args, {
      headers: new HttpHeaders({ Authorization: token }),
    });
  }

  public getTalentList(token: string): Observable<any> {
    return this.httpService
      .get(`${this.session.API}/talentList `, {
        headers: new HttpHeaders({ Authorization: token }),
      })
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          
          if (e.error.error == 'Usuario no Autorizado') {
            Swal.fire({
              icon: 'error',
              title: '404',
              text: e.error.error ? e.error.error : 'Tiempo agotado',
              confirmButtonColor: '#1c4a83',
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = '/home';
              }
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: '404',
              text: e.error.error ? e.error.error : 'Tiempo agotado',
              confirmButtonColor: '#1c4a83',
            });
          }
          return of(null);
        })
      );


  }

  public getTalentListVacant(token: string, id: number): Observable<any> {
    return this.httpService
      .get(`${this.session.API}/talentListVacant/${id}`, {
        headers: new HttpHeaders({ Authorization: token }),
      })
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: '404',
            text: e.error.error ? e.error.error : 'Tiempo agotado',
            confirmButtonColor: '#1c4a83',
          });
          return of(null);
        })
      );
  }

  public getStates(country: number): Observable<any> {
    return this.httpService
      .get(`${this.session.API}/getStates`, {
        params: new HttpParams().set('country', country.toString()),
      })
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: '404',
            text: e.error.error ? e.error.error : 'Tiempo agotado',
            confirmButtonColor: '#1c4a83',
          });
          return of(null);
        })
      );
  }

  public getSavedTalent(token: string, id: number): Observable<any> {
    return this.httpService
      .get(`${this.session.API}savedTalent/${id}`, {
        headers: new HttpHeaders({ Authorization: token }),
      })
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: '404',
            text: e.error.error ? e.error.error : 'Tiempo agotado',
            confirmButtonColor: '#1c4a83',
          });
          return of(null);
        })
      );
  }

  public getVacantList(token: string): Observable<any> {
    return this.httpService
      .get(`${this.session.API}vacantNamesList `, {
        headers: new HttpHeaders({ Authorization: token }),
      })
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: '404',
            text: e.error.error ? e.error.error : 'Tiempo agotado',
            confirmButtonColor: '#1c4a83',
          });
          return of(null);
        })
      );
  }

  public getTalent(token: string, id_v: number, id_p: number): Observable<any> {
    return this.httpService
      .get(`${this.session.API}talent/${id_v}/${id_p}`, {
        headers: new HttpHeaders({ Authorization: token }),
      })
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          if (e.error.error == 'Usuario no Autorizado') {
            Swal.fire({
              icon: 'error',
              title: '404',
              text: e.error.error ? e.error.error : 'Tiempo agotado',
              confirmButtonColor: '#1c4a83',
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = '/home';
              }
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: '404',
              text: e.error.error ? e.error.error : 'Tiempo agotado',
              confirmButtonColor: '#1c4a83',
            });
          }
          return of(null);
        })
      );
  }

  public insertSaveTalent(token: string, id_user: number): Observable<any> {
    let json = {
      id_user,
    };
    return this.httpService
      .post(`${this.session.API}savedTalent`, JSON.stringify(json), {
        headers: new HttpHeaders({ Authorization: token }),
      })
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: '404',
            text: e.error.error ? e.error.error : 'Tiempo agotado',
            confirmButtonColor: '#1c4a83',
          });
          return of(null);
        })
      );
  }

  public saveTalent(token: string, data: any): Observable<any> {
    return this.httpService
      .post(`${this.session.API}saveTalent `, JSON.stringify(data), {
        headers: new HttpHeaders({ Authorization: token }),
      })
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: '404',
            text: e.error.error ? e.error.error : 'Tiempo agotado',
            confirmButtonColor: '#1c4a83',
          });
          return of(null);
        })
      );
  }

  public putSelectTalent(
    token: string,
    id_v: number,
    id_p: number,
    msg: string
  ): Observable<any> {
    let json = {
      id_vacant: id_v,
      id_profile: id_p,
      message: msg,
    };
    return this.httpService
      .put(`${this.session.API}talentSelected`, JSON.stringify(json), {
        headers: new HttpHeaders({ Authorization: token }),
      })
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: '404',
            text: e.error.error ? e.error.error : 'Tiempo agotado',
            confirmButtonColor: '#1c4a83',
          });
          return of(null);
        })
      );
  }

  public putDiscardTalent(
    token: string,
    id_v: number,
    id_p: number,
    msg: string
  ) {
    let json = {
      id_vacant: id_v,
      id_profile: id_p,
      message: msg,
    };
    return this.httpService
      .put(`${this.session.API}talentDiscarded`, JSON.stringify(json), {
        headers: new HttpHeaders({ Authorization: token }),
      })
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: '404',
            text: e.error.error ? e.error.error : 'Tiempo agotado',
            confirmButtonColor: '#1c4a83',
          });
          return of(null);
        })
      );
  }

  public putViewTalent(id: number, token: string): Observable<any> {
    let json = { id_profile: id };

    return this.httpService
      .put(`${this.session.API}setVisualization`, JSON.stringify(json), {
        headers: new HttpHeaders({ Authorization: token }),
      })
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            text: e.error.error ? e.error.error : 'Tiempo Agotado',
            confirmButtonColor: '#1c4a83',
          });
          return of(e);
        })
      );
  }

  public getRecruiters(token: string): Observable<any> {
    return this.httpService
      .get(`${this.session.API}getRecruitersNames`, {
        headers: new HttpHeaders({ Authorization: token }),
      })
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            text: e.error.error ? e.error.error : 'Tiempo agotado',
            confirmButtonColor: '#1c4a83',
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = '/home';
            }
          });
          return of(null);
        })
      );
  }

  public changeRecruiter(
    token: string,
    id: number,
    idRecruiter: number
  ): Observable<any> {
    return this.httpService
      .put(
        `${this.session.API}changeRecruiter/${id}/${idRecruiter}`,
        {},
        {
          headers: new HttpHeaders({ Authorization: token }),
        }
      )
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: '404',
            text: e.error.error ? e.error.error : 'Tiempo agotado',
            confirmButtonColor: '#1c4a83',
          });
          return of(null);
        })
      );
  }

  public getVacantes(token: string): Observable<any> {
    return this.httpService
      .get(`${this.session.API}vacantList`, {
        headers: new HttpHeaders({ Authorization: token }),
      })
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: '404',
            text: e.error.error ? e.error.error : 'Tiempo agotado',
            confirmButtonColor: '#1c4a83',
          });
          return of(null);
        })
      );
  }

  public getResources(token: string): Observable<any> {
    return this.httpService
      .get(`${this.session.API}workTable/getResources`, {
        headers: new HttpHeaders({ Authorization: token }),
      })
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: '404',
            text: e.error.message ? e.error.message : 'Tiempo agotado',
            confirmButtonColor: '#1c4a83',
          });
          return of(null);
        })
      );
  }

  public setConfidential(token: string, id: number): Observable<any> {
    return this.httpService
      .put(
        `${this.session.API}setConfidential/${id}`,
        {},
        {
          headers: new HttpHeaders({ Authorization: token }),
        }
      )
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: '404',
            text: e.error.error ? e.error.error : 'Tiempo agotado',
            confirmButtonColor: '#1c4a83',
          });
          return of(null);
        })
      );
  }

  public setFeature(token: string, id: number): Observable<any> {
    return this.httpService
      .put(
        `${this.session.API}setFeature/${id}`,
        {},
        {
          headers: new HttpHeaders({ Authorization: token }),
        }
      )
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: '404',
            text: e.error.error ? e.error.error : 'Tiempo agotado',
            confirmButtonColor: '#1c4a83',
          });
          return of(null);
        })
      );
  }

  public setInactive(token: string, id: number): Observable<any> {
    return this.httpService
      .put(
        `${this.session.API}setInactive/${id}`,
        {},
        {
          headers: new HttpHeaders({ Authorization: token }),
        }
      )
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.fire({
            icon: 'error',
            title: '404',
            text: e.error.error ? e.error.error : 'Tiempo agotado',
            confirmButtonColor: '#1c4a83',
          });
          return of(null);
        })
      );
  }

  public setExtend(token: string, id: number): Observable<any> {
    return this.httpService
      .put(
        `${this.session.API}extendExpiration/${id}`,
        {},
        {
          headers: new HttpHeaders({ Authorization: token }),
        }
      )
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.fire({
            icon: 'error',
            title: '404',
            text: e.error.error ? e.error.error : 'Tiempo agotado',
            confirmButtonColor: '#1c4a83',
          });
          return of(null);
        })
      );
  }

  public deleteVacant(token: string, id: number): Observable<any> {
    return this.httpService
      .delete(`${this.session.API}vacants/${id}`, {
        headers: new HttpHeaders({ Authorization: token }),
      })
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.fire({
            icon: 'error',
            title: '404',
            text: e.error.error ? e.error.error : 'Tiempo agotado',
            confirmButtonColor: '#1c4a83',
          });
          return of(null);
        })
      );
  }

  public activateVacant(
    token: string,
    id: number,
    tp: number
  ): Observable<any> {
    return this.httpService
      .put(
        `${this.session.API}activateVacant/${id}/${tp}`,
        {},
        {
          headers: new HttpHeaders({ Authorization: token }),
        }
      )
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.fire({
            icon: 'error',
            title: '404',
            text: e.error.error ? e.error.error : 'Tiempo agotado',
            confirmButtonColor: '#1c4a83',
          });
          return of(null);
        })
      );
  }

  public getPaquetes(): Observable<any> {
    return this.httpService.get(`${this.session.API}packages`).pipe(
      timeout(30000),
      catchError((e) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: '404',
          text: e.error.error ? e.error.error : 'Tiempo agotado',
          confirmButtonColor: '#1c4a83',
        });
        return of(null);
      })
    );
  }

  public getInfoPayment(token: string, id_package): Observable<any> {
    return this.httpService
      .get(`${this.session.API}payment/${id_package}`, {
        headers: new HttpHeaders({ Authorization: token }),
      })
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: '404',
            text: e.error.error ? e.error.error : 'Tiempo agotado',
            confirmButtonColor: '#1c4a83',
          });
          return of(null);
        })
      );
  }

}
