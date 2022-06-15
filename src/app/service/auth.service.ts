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
    .set("Content-Type", "application/json")

  constructor( private http: HttpClient ) { }

  login(loginData: { email: string, password: string }): Observable<AuthResponse> {

    return this.http.post<AuthResponse>(API_ROUTE + '/login', loginData, { headers: this.headers }).pipe(
      tap((resp: AuthResponse) => {
        if (resp && resp.token) {
          localStorage.setItem('postales_role', btoa(resp.user.authorities[0].role))
          localStorage.setItem('postales_token', resp.token);
        }
      }),
    );
  }

  getToken(): string | null {
    return localStorage.getItem('postales_token');
  }

  getRole(): string | null {
    const baseRole = localStorage.getItem('postales_role')
    if (baseRole) {
      return atob(baseRole);
    }

    return null;
  }

  logout() {
    localStorage.removeItem('postales_token');
    localStorage.removeItem('postales_role');
  }

}
