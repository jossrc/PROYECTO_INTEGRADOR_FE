import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const API_ROUTE = "http://localhost:8090/api/usuarios/empleado"
const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6Ilt7XCJyb2xlXCI6XCJST0xFX0FETUlOXCJ9XSIsInN1YiI6Impvc2UxMjM0NUBnbWFpbC5jb20iLCJpYXQiOjE2NTM4NzgyNjcsImV4cCI6MTY1Mzg5MjI2N30.Y482I38LuM6kzyvXCNvCLGwYoc7Mv8LXX64oYFW7Vt0";

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

}
