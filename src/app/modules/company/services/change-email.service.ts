import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from '../../login/services/session.service';

@Injectable({
  providedIn: 'root',
})
export class ChangeEmailService {
  constructor(
    private httpclient: HttpClient,
    private session: SessionService
  ) {}

  public changeEmail(token: any, args: string) {
    let json = {
      email: args,
    };
    return this.httpclient.put(
      `${this.session.API}email`,
      JSON.stringify(json),
      {
        headers: new HttpHeaders({ Authorization: token }),
      }
    );
  }
}
