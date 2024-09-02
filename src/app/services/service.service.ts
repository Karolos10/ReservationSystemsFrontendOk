import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import base_url from '../model/helper';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private httpClient: HttpClient) { }

  public addUser(user: User) {
    return this.httpClient.post(`${base_url}/auth/signup`, user);
  }
}
