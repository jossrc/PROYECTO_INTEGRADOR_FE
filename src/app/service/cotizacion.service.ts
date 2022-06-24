import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';

const API_ROUTE = environment.API_ENDPOINT + "/cotizaciones";
const token = "Bearer " + localStorage.getItem('postales_token') || environment.TOKEN_TEST

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {

  private headers = new HttpHeaders()
    .set("Content-Type", "application/json")
    .set("Authorization", token)

  constructor( private http: HttpClient ) { }


  registrarCotizacion(datosCotizacion: any):Observable<any>{
    return this.http.post(API_ROUTE+"/registrar", datosCotizacion, {
      headers:this.headers
    })
  }

}
