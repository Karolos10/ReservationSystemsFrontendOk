import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import base_url from '../model/helper';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../model/JwtPayload';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private Http: HttpClient) { }

  public login(loginData: any) {
    return this.Http.post(`${base_url}/auth/login`, loginData);
  }

  public saveJwtLocalStorage(token: any) {
    localStorage.setItem("token", token);
  }

  public isLoggedIn() {
    let tokenStr = localStorage.getItem("token");
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  public logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  public getToken() {
    return localStorage.getItem("token");
  }

  public decryptToken(token: string) {
    return jwtDecode<JwtPayload>(token);
  }

  public getUserRole() {
    const token = this.getToken();
    if (token === null) {
      return token;
    } else {
      return this.decryptToken(token).roles;
    }
  }

  public getUserId() {
    const token = this.getToken();
    if (token === null) {
      return token;
    } else {
      return this.decryptToken(token).idUser;
    }
  }


}

