import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const API_ROUTE = environment.API_ENDPOINT + "/local";
const token = environment.TOKEN_TEST

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  private headers = new HttpHeaders()
    .set("Content-type", "application/json")
    .set("Authorization", token)

  constructor( private http: HttpClient ) { }

  public listarLocales(): Observable<any> {
    return this.http.get(API_ROUTE +"/listar", { headers: this.headers })
  }

}
