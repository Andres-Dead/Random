import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { timeout, catchError } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  API: string = 'http://c6c4-187-212-196-100.ngrok.io/API/';
  excededTime: string = "Tiempo de espera agotado";

  constructor(
    private service: HttpClient,
  ) { }

  public loginUser(args : any) {
    return this.service.post<any>(`${this.API}login`, JSON.stringify(args),{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        authorization: 'Bearer ' + '123',
      }),
    }).pipe(timeout(30000), catchError(e=>{
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: '404',
        text: e.error.message?e.error.message:this.excededTime,
        confirmButtonColor: '#1c4a83',
      })
      return of(null);
    }));
  }

  public verifyAccount(email : any) {
    //funcion para verificar la cuenta
    return this.service.get(
      `${this.API}resendActivationCode?login=${email}`
    ).pipe(timeout(30000), catchError(e=>{
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: '404',
        text: e.error.message?e.error.message:this.excededTime,
        confirmButtonColor: '#1c4a83',
      })
      return of(null);
    }));
  }

  public forgotPassword(email : any) {
    //funcion para recuperar contraseña
    return this.service.post(`${this.API}forgotPassword`, email).pipe(timeout(30000), catchError(e=>{
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: '404',
        text: e.error.message?e.error.message:this.excededTime,
        confirmButtonColor: '#1c4a83',
      })
      return of(null);
    }));
  }

  public getGroup(token : any) {
    return this.service.get(`${this.API}getGroup`, {
      headers: new HttpHeaders({ Authorization: token }),
    }).pipe(timeout(30000), catchError(e=>{
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: '404',
        text: e.error.message?e.error.message:this.excededTime,
        confirmButtonColor: '#1c4a83',
      })
      return of(null);
    }));
  }
  
  public getInfo(token : any) {
    //funcion para obtener los datos del usuario
    return this.service.get(`${this.API}getInfo`, {
      headers: new HttpHeaders({ Authorization: token }),
    }).pipe(timeout(30000), catchError(e=>{
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: '404',
        text: e.error.message?e.error.message:this.excededTime,
        confirmButtonColor: '#1c4a83',
      })
      return of(null);
    }));
  }
  public getInfoUser(token : any) {
    //funcion para obtener los datos del usuario
    return this.service.get(`${this.API}getInfo/1`, {
      headers: new HttpHeaders({ Authorization: token }),
    }).pipe(timeout(30000), catchError(e=>{
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: '404',
        text: e.error.message?e.error.message:this.excededTime,
        confirmButtonColor: '#1c4a83',
      })
      return of(null);
    }));
  }
  public getInfoUserExp(token : any) {
    //funcion para obtener los datos del usuario
    return this.service.get(`${this.API}getInfo/2`, {
      headers: new HttpHeaders({ Authorization: token }),
    }).pipe(timeout(30000), catchError(e=>{
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: '404',
        text: e.error.message?e.error.message:this.excededTime,
        confirmButtonColor: '#1c4a83',
      })
      return of(null);
    }));
  }




}
