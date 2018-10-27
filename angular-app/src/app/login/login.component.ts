import { Location } from '@angular/common';
import { AuthService } from './../authservice/auth.service';
import { User } from './../user';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private location: Location
  ) { }

  ngOnInit() {
  }

  onLogin(): void {
    this.authService.userLogin(this.username,this.password)
        .subscribe(access_token => localStorage.setItem('access_token', access_token.access_token));
    // TODO: Fix redirect after login
    this.location.go('/posts');
  }

}
