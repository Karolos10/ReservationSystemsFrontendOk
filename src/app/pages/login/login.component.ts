import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginData = {
    "username": "",
    "password": ""
  }

  constructor(private snack: MatSnackBar, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  formSubmit() {
    if (this.loginData.username.trim() == "" || this.loginData.password.trim() == null) {
      this.snack.open("Username or Password is empty", "OK", {
        duration: 3000
      })

      return;
    }

    if (this.loginData.password.trim() == '' || this.loginData.password.trim() == null) {
      this.snack.open('La contraseña es requerida !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    this.loginService.login(this.loginData).subscribe(
      (data: any) => {
        console.log(data);
        this.loginService.saveJwtLocalStorage(data.token);
        const permissions = this.loginService.getUserRole();
        console.log(permissions);
        if (permissions?.includes('ADMIN')) {
          //dashboard admin
          this.router.navigate(['admin']);
        }
        else if (permissions?.includes('NORMAL')) {
          //user dashboard
          this.router.navigate(['user']);
        }
        else {
          this.loginService.logout();
        }
      }, (error) => {
        console.log(error);
        this.snack.open('Detalles inválidos , vuelva a intentar !!', 'Aceptar', {
          duration: 3000
        })
      }
    )
  }
}


