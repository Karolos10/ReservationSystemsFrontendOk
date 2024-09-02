import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import base_url from './helper';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private httpClient: HttpClient) { }

  public addUser(user: any) {
    return this.httpClient.post(`${base_url}/auth/signup`, user);
  }
}
