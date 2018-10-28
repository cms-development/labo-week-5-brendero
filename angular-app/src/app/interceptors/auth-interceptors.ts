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
    public authService: AuthService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.setHeader(req);
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

  setHeader(req: HttpRequest<any>) {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    });

  }

  refreshTokens(req: HttpRequest<any>, next: HttpHandler) {
    this.authService.refreshLogin()
      .subscribe(
          tokens => {
            localStorage.setItem('access_token', tokens.access_token);
            localStorage.setItem('refresh_token', tokens.refresh_token);
            return next.handle(this.setHeader(req)).subscribe();
          }, err => {
            localStorage.clear();
            return this.router.navigateByUrl('/login');
          }
      );
  }
}
