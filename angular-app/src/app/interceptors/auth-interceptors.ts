import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './../authservice/auth.service';
import { HttpInterceptor, HttpErrorResponse, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    public authService: AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    });
    return next.handle(req).pipe(
      tap(
        evt => evt,
        error => {
          if (error instanceof HttpErrorResponse) {
            switch (error.status) {
              case 401:
                return this.refreshTokens(req, next);
              case 403:
                return this.refreshTokens(req, next);
            }
          }
        }
      )
    );
  }

  refreshTokens(req: HttpRequest<any>, next: HttpHandler) {
    this.authService.refreshLogin()
      .subscribe(
          user => {
            localStorage.setItem('access_token', user.access_token);
            localStorage.setItem('refresh_token', user.refresh_token);
            return next.handle(req.clone({setHeaders: {'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': `Bearer ${user.access_token}`}}));
          }, err => {
            console.log(err);
            localStorage.clear();
            return this.router.navigateByUrl('/login');
          }
      );
  }
}
