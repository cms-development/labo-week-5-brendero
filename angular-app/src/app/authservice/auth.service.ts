import { catchError } from 'rxjs/operators';
import { User } from './../user';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
   })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private tokenUrl = "http://localhost/oauth/token/";
  private client_id = '5341b856-4a4f-4088-95fc-17dca943e4ef';
  private client_secret = 'secret';
  private grant_type = 'password';

  constructor(
    private http: HttpClient
  ) { }

  userLogin(username: string, password: string) {
    const httpBody = new HttpParams()
                  .set('grant_type', this.grant_type)
                  .set('client_id', this.client_id)
                  .set('client_secret', this.client_secret)
                  .set('username', username)
                  .set('password', password);

    return this.http.post<User>(this.tokenUrl, httpBody, httpOptions);

  }

}
