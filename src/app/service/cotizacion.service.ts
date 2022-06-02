import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

const API_ROUTE = environment.API_ENDPOINT + "/usuarios/empleado";
const token = environment.TOKEN_TEST

@Injectable({
    providedIn: 'root'
  })
  export class EmpleadoService {
  
    private headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .set("Authorization", token)
  
    constructor( private http: HttpClient ) { }
  
    listarEmpleados(): Observable<any> {
      return this.http.get(API_ROUTE + "/listar", { headers: this.headers } )
    }
  
    registrarEmpleado(empleado: any): Observable<any> {
      return this.http.post(API_ROUTE + "/registrar", empleado, { headers: this.headers } )
    }
  
  }