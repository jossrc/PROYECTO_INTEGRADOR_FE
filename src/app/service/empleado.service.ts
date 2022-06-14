import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

const API_ROUTE = environment.API_ENDPOINT + "/usuarios/empleado";
const token = "Bearer " + localStorage.getItem('postales_token') || environment.TOKEN_TEST
//const token = environment.TOKEN_TEST

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private headers = new HttpHeaders()
    .set("Content-Type", "application/json")
    .set("Authorization", token)

  constructor( private http: HttpClient ) { }

  listarEmpleados(): Observable<any> {
    // console.log('Token :: ', token);
    // console.log('headers : ', this.headers)
    // const headers = new HttpHeaders()
    // .set("Content-Type", "application/json")
    // .set("Authorization", token)
    return this.http.get(API_ROUTE + "/listar", { headers: this.headers } )
  }

  registrarEmpleado(empleado: any): Observable<any> {
    return this.http.post(API_ROUTE + "/registrar", empleado, { headers: this.headers } )
  }

  actualizarEmpleado(idEmpleado: number, empleado: any): Observable<any> {
    return this.http.put(API_ROUTE + '/actualizar/' + idEmpleado, empleado, { headers: this.headers })
  }

  eliminarEmpleado(idEmpleado: number) {
    return this.http.delete(API_ROUTE + '/eliminar/' + idEmpleado, { headers: this.headers })
  }

}
