import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";

const API_ROUTE = environment.API_ENDPOINT + "/cotizaciones";
const token = environment.TOKEN_TEST

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {

  private headers = new HttpHeaders()
    .set("Content-type", "application/json")
    .set("Authorization", token)

  constructor( private http: HttpClient ) { }
}
