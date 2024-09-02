import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isLoggedIn = false;
  user: any = null;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {

    this.checkLoginStatus();
    this.user = this.loginService.getToken() ? this.loginService.decryptToken(this.loginService.getToken()!).username : null;

  }

  logout() {
    this.loginService.logout();
    this.checkLoginStatus();
    this.router.navigate(['/']);
  }

  checkLoginStatus() {
    this.isLoggedIn = this.loginService.isLoggedIn();
    this.user = this.isLoggedIn ? this.loginService.decryptToken(this.loginService.getToken()!).username : null;
  }

}
