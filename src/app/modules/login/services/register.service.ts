import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../interfaces/users';
import { Reset } from '../interfaces/reset';
import { Empresas } from '../interfaces/empresas';
import { timeout, catchError } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  API: string = 'http://87ee-187-212-196-100.ngrok.io/API';
  constructor(private clienteHttp: HttpClient) {}
  public TiempoAgotado: string =
    'Tiempo de espera agotado. Intente de nuevo más tarde.';

  registrarUsuario(user: Users): Observable<any> {
    return this.clienteHttp.post(this.API + '/register', user).pipe(
      timeout(30000),
      catchError((e) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: '404',
          text: e.error.error ? e.error.error : this.TiempoAgotado,
          confirmButtonColor: '#1c4a83',
        });
        return of(null);
      })
    );
  }

  public resetPassword(info: Reset): Observable<any> {
    return this.clienteHttp.put(`${this.API}/resetPassword`, info).pipe(
      timeout(30000),
      catchError((e) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: '404',
          text: e.error.error ? e.error.error : this.TiempoAgotado,
          confirmButtonColor: '#1c4a83',
        });
        return of(null);
      })
    );
  }

  public registrarEmpresa(company: Empresas): Observable<any> {
    return this.clienteHttp.post(this.API + '/register', company).pipe(
      timeout(30000),
      catchError((e) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: '404',
          text: e.error.error ? e.error.error : this.TiempoAgotado,
          confirmButtonColor: '#1c4a83',
        });
        return of(null);
      })
    );
  }

  //Empleos Favoritos
  public obtenerFavoritos(token: string): Observable<any> {
    return this.clienteHttp
      .get(`${this.API}/favJobs`, {
        headers: new HttpHeaders({ Authorization: token }),
      })
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: '404',
            text: e.error.error ? e.error.error : this.TiempoAgotado,
            confirmButtonColor: '#1c4a83',
          });
          return of(null);
        })
      );
  }

  public borrarFavorito(token: string, ide: number): Observable<any> {
    return this.clienteHttp
      .delete(`${this.API}/favJobs?id=${ide}`, {
        headers: new HttpHeaders({ Authorization: token }),
      })
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: '404',
            text: e.error.error ? e.error.error : this.TiempoAgotado,
            confirmButtonColor: '#1c4a83',
          });
          return of(null);
        })
      );
  }

  public getApplications(token: string): Observable<any> {
    return this.clienteHttp
      .get(`${this.API}/applications`, {
        headers: new HttpHeaders({ Authorization: token }),
      })
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            text: e.error.error ? e.error.error : this.TiempoAgotado,
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

  public getVisualizations(token: string): Observable<any> {
    return this.clienteHttp
      .get(`${this.API}/visualizations`, {
        headers: new HttpHeaders({ Authorization: token }),
      })
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            text: e.error.error ? e.error.error : this.TiempoAgotado,
            confirmButtonColor: '#1c4a83',
          });
          return of(null);
        })
      );
  }

  //Perfil Empresas

  public seguirEmpresas(token: string, id_comp: number): Observable<any> {
    let json = { id_company: id_comp };
    return this.clienteHttp
      .post(`${this.API}/favCompanies`, JSON.stringify(json), {
        headers: new HttpHeaders({ Authorization: token }),
      })
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            text: e.error.error ? e.error.error : this.TiempoAgotado,
            confirmButtonColor: '#1c4a83',
          });
          return of(null);
        })
      );
  }

  public getFavs(token: string): Observable<any> {
    return this.clienteHttp
      .get(`${this.API}/favCompanies`, {
        headers: new HttpHeaders({ Authorization: token }),
      })
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            text: e.error.error ? e.error.error : this.TiempoAgotado,
            confirmButtonColor: '#1c4a83',
          });
          return of(null);
        })
      );
  }

  public olvidarEmpresas(token: string, ide: number): Observable<any> {
    return this.clienteHttp
      .delete(`${this.API}/favCompanies?id=${ide}`, {
        headers: new HttpHeaders({ Authorization: token }),
      })
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: '404',
            text: e.error.error ? e.error.error : this.TiempoAgotado,
            confirmButtonColor: '#1c4a83',
          });
          return of(null);
        })
      );
  }

  //Reviews

  public insertarReview(token: string, review: any): Observable<any> {
    return this.clienteHttp
      .post(`${this.API}/insertReview`, JSON.stringify(review), {
        headers: new HttpHeaders({ Authorization: token }),
      })
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            text: e.error.error ? e.error.error : this.TiempoAgotado,
            confirmButtonColor: '#1c4a83',
          });
          return of(null);
        })
      );
  }

  public getDatosCompañia(id: number, token?: string): Observable<any> {
    if (token == null) {
      return this.clienteHttp.get(`${this.API}/companyData/${id}`);
    } else {
      return this.clienteHttp.get(`${this.API}/companyData/${id}`, {
        headers: new HttpHeaders({ Authorization: token }),
      });
    }
  }

  //empleos
  public getVacancies(): Observable<any> {
    return this.clienteHttp.get(`${this.API}/vacancies`).pipe(
      timeout(30000),
      catchError((e) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          text: e.error.error ? e.error.error : this.TiempoAgotado,
          confirmButtonColor: '#1c4a83',
        });
        return of(null);
      })
    );
  }

  //home
  public getUserHome(): Observable<any> {
    return this.clienteHttp.get(`${this.API}/userHome`).pipe(
      timeout(30000),
      catchError((e) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          text: e.error.error ? e.error.error : this.TiempoAgotado,
          confirmButtonColor: '#1c4a83',
        });
        return of(null);
      })
    );
  }

  //listado_empresas
  public getCompanyNames(): Observable<any> {
    return this.clienteHttp.get(`${this.API}/CompanyNames`).pipe(
      timeout(30000),
      catchError((e) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          text: e.error.error ? e.error.error : this.TiempoAgotado,
          confirmButtonColor: '#1c4a83',
        });
        return of(null);
      })
    );
  }

  //cuenta

  public cvVisibilty(token: string): Observable<any> {
    return this.clienteHttp
      .get(`${this.API}/preferences`, {
        headers: new HttpHeaders({ Authorization: token }),
      })
      .pipe(
        timeout(30000),
        catchError((e) => {
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
            Swal.close();
            Swal.fire({
              icon: 'error',
              text: e.error.error ? e.error.error : this.TiempoAgotado,
              confirmButtonColor: '#1c4a83',
            });
          }
          return of(null);
        })
      );
  }

  public cvInvisibilty(token: string, v: number): Observable<any> {
    let json = { visibility: v };
    return this.clienteHttp
      .post(`${this.API}/cvVisibility`, JSON.stringify(json), {
        headers: new HttpHeaders({ Authorization: token }),
      })
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            text: e.error.error ? e.error.error : this.TiempoAgotado,
            confirmButtonColor: '#1c4a83',
          });
          return of(null);
        })
      );
  }

  public deleteAccount(token: string): Observable<any> {
    return this.clienteHttp
      .delete(`${this.API}/user`, {
        headers: new HttpHeaders({ Authorization: token }),
      })
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            text: e.error.error ? e.error.error : this.TiempoAgotado,
            confirmButtonColor: '#1c4a83',
          });
          return of(null);
        })
      );
  }

  public changePassword(token: string, password: any): Observable<any> {
    let json = { password: password };
    return this.clienteHttp
      .put(`${this.API}/password`, json, {
        headers: new HttpHeaders({ Authorization: token }),
      })
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            text: e.error.error ? e.error.error : this.TiempoAgotado,
            confirmButtonColor: '#1c4a83',
          });
          return of(null);
        })
      );
  }

  //detalle_trabajo

  public getDatosTrabajo(id: number, token?: string): Observable<any> {
    if (token == null) {
      return this.clienteHttp.get(`${this.API}/vacant/${id}`);
    } else {
      return this.clienteHttp.get(`${this.API}/vacant/${id}`, {
        headers: new HttpHeaders({ Authorization: token }),
      });
    }
  }

  public getFavsJobs(token: string): Observable<any> {
    return this.clienteHttp
      .get(`${this.API}/favJobs`, {
        headers: new HttpHeaders({ Authorization: token }),
      })
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            text: e.error.error ? e.error.error : this.TiempoAgotado,
            confirmButtonColor: '#1c4a83',
          });
          return of(null);
        })
      );
  }

  public seguirTrabajo(token: string, id: number): Observable<any> {
    let json = { id_vacant: id };
    return this.clienteHttp
      .post(`${this.API}/favJobs`, JSON.stringify(json), {
        headers: new HttpHeaders({ Authorization: token }),
      })
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            text: e.error.error ? e.error.error : this.TiempoAgotado,
            confirmButtonColor: '#1c4a83',
          });
          return of(null);
        })
      );
  }

  public olvidarTrabajo(token: string, id: number): Observable<any> {
    return this.clienteHttp
      .delete(`${this.API}/favJobs?id=${id}`, {
        headers: new HttpHeaders({ Authorization: token }),
      })
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: '404',
            text: e.error.error ? e.error.error : this.TiempoAgotado,
            confirmButtonColor: '#1c4a83',
          });
          return of(null);
        })
      );
  }

  public vacantView(id: number, token?: string): Observable<any> {
    let json = { id_vacant: id };
    if (token == null) {
      return this.clienteHttp
        .put(`${this.API}/vacantViews`, JSON.stringify(json))
        .pipe(
          timeout(30000),
          catchError((e) => {
            Swal.close();
            Swal.fire({
              icon: 'error',
              text: e.error.error ? e.error.error : this.TiempoAgotado,
              confirmButtonColor: '#1c4a83',
            });
            return of(null);
          })
        );
    } else {
      return this.clienteHttp
        .put(`${this.API}/vacantViews`, JSON.stringify(json), {
          headers: new HttpHeaders({ Authorization: token }),
        })
        .pipe(
          timeout(30000),
          catchError((e) => {
            Swal.close();
            Swal.fire({
              icon: 'error',
              text: e.error.error ? e.error.error : this.TiempoAgotado,
              confirmButtonColor: '#1c4a83',
            });
            return of(null);
          })
        );
    }
  }

  public postular(token: string, id: number): Observable<any> {
    let json = { id_vacant: id };
    return this.clienteHttp
      .post(`${this.API}/application`, JSON.stringify(json), {
        headers: new HttpHeaders({ Authorization: token }),
      })
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            text: e.error.error ? e.error.error : this.TiempoAgotado,
            confirmButtonColor: '#1c4a83',
          });
          return of(null);
        })
      );
  }

  public report(
    token: string,
    id_vacant: number,
    id_company: number,
    report: string
  ): Observable<any> {
    let json = {
      id_vacant,
      id_company,
      report,
    };
    return this.clienteHttp
      .post(`${this.API}/report`, JSON.stringify(json), {
        headers: new HttpHeaders({ Authorization: token }),
      })
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            text: e.error.error ? e.error.error : this.TiempoAgotado,
            confirmButtonColor: '#1c4a83',
          });
          return of(null);
        })
      );
  }

  public getNotificaciones(token: string): Observable<any> {
    return this.clienteHttp
      .get(`${this.API}/notifications`, {
        headers: new HttpHeaders({ Authorization: token }),
      })
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            text: e.error.error ? e.error.error : this.TiempoAgotado,

            confirmButtonColor: '#1c4a83',
          });
          return of(null);
        })
      );
  }

  public viewNotificaciones(section: string, token: string): Observable<any> {
    let json = { section };
    return this.clienteHttp
      .put(`${this.API}/notifications`, JSON.stringify(json), {
        headers: new HttpHeaders({ Authorization: token }),
      })
      .pipe(
        timeout(30000),
        catchError((e) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            text: e.error.error ? e.error.error : this.TiempoAgotado,
            confirmButtonColor: '#1c4a83',
          });
          return of(null);
        })
      );
  }

}
