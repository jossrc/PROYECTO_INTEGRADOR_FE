import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const API_ROUTE = environment.API_ENDPOINT + "/local";
const token = "Bearer " + localStorage.getItem('postales_token') || environment.TOKEN_TEST
//const token = environment.TOKEN_TEST

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  private headers = new HttpHeaders()
    .set("Content-Type", "application/json")
    .set("Authorization", token)

  constructor( private http: HttpClient ) { }

  listarLocales(): Observable<any> {
    return this.http.get(API_ROUTE +"/listar", { headers: this.headers })
  }

  registrarLocales(local: any): Observable<any> {
    return this.http.post(API_ROUTE + "/registrar", local, { headers: this.headers } )
  }
  actualizarLocales(idLocal: number, local: any): Observable<any> {
    return this.http.put(API_ROUTE + '/actualizar/' + idLocal, local, { headers: this.headers })
  }

  eliminarLocales(idLocal: number) {
    return this.http.delete(API_ROUTE + '/eliminar/' + idLocal, { headers: this.headers })
  }
}
