import { Location } from '@angular/common';
import { AuthService } from './../authservice/auth.service';
import { User } from './../user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  errorMessage: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLogin(): void {
    this.authService.userLogin(this.username, this.password)
        .subscribe(user => {
          localStorage.setItem('access_token', user.access_token)
          this.router.navigateByUrl('/posts');
        }, err => this.errorMessage = err.error.message);
  }

}
