import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

const API_ROUTE = environment.API_ENDPOINT + "/roles";
const token = "Bearer " + localStorage.getItem('postales_token') || environment.TOKEN_TEST

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private headers = new HttpHeaders()
    .set("Content-type", "application/json")
    .set("Authorization", token)

  constructor( private http: HttpClient ) { }

  public listarRoles(): Observable<any> {
    return this.http.get(API_ROUTE, { headers: this.headers })
  }
}
