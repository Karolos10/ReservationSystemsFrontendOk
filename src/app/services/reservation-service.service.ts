import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { reservationModel } from '../model/reservation-model';
import base_url from '../model/helper';

@Injectable({
  providedIn: 'root'
})
export class ReservationServiceService {

  private apiUrl = 'http://localhost:8080'; // Asegúrate de que la URL sea correcta

  constructor(private http: HttpClient) { }

  getBusinesses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/business`);
  }

  getReservations(userId: number): Observable<reservationModel[]> {
    return this.http.get<reservationModel[]>(`${base_url}/reservations/${userId}`);
  }

  saveRservations(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reservations`, data);
  }

  updateReservations(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/reservations`, data);
  }

  cancelarReservations(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/reservations/cancelar`, data);
  }
}


