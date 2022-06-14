import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../interfaces/auth.interface';

const API_ROUTE = environment.API_ENDPOINT;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private headers = new HttpHeaders()
    .set("Content-type", "application/json")

  constructor( private http: HttpClient ) { }

  login(loginData: { email: string, password: string }): Observable<AuthResponse> {

    return this.http.post<AuthResponse>(API_ROUTE + '/login', loginData, { headers: this.headers }).pipe(
      tap((resp: AuthResponse) => {
        if (resp && resp.token) {
          localStorage.setItem('postales_token', resp.token);
        }
      }),
    );
  }

  getToken(): string | null {
    return localStorage.getItem('postales_token');
  }

  logout() {
    localStorage.removeItem('postales_token');
  }

}
