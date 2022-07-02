import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

const API_ROUTE = environment.API_ENDPOINT + "/roles";

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor( private http: HttpClient ) { }

  private getHeaders(): HttpHeaders {
    let token =
      'Bearer ' + localStorage.getItem('postales_token') ||
      environment.TOKEN_TEST;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return headers;
  }

  public listarRoles(): Observable<any> {
    return this.http.get(API_ROUTE, { headers: this.getHeaders() });
  }
}
