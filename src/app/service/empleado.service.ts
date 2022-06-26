import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const API_ROUTE = environment.API_ENDPOINT + '/usuarios/empleado';
@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    let token =
      'Bearer ' + localStorage.getItem('postales_token') ||
      environment.TOKEN_TEST;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return headers;
  }

  listarEmpleados(): Observable<any> {
    return this.http.get(API_ROUTE + '/listar', { headers: this.getHeaders() });
  }

  registrarEmpleado(empleado: any): Observable<any> {
    return this.http.post(API_ROUTE + '/registrar', empleado, {
      headers: this.getHeaders(),
    });
  }

  actualizarEmpleado(idEmpleado: number, empleado: any): Observable<any> {
    return this.http.put(API_ROUTE + '/actualizar/' + idEmpleado, empleado, {
      headers: this.getHeaders(),
    });
  }

  eliminarEmpleado(idEmpleado: number) {
    return this.http.delete(API_ROUTE + '/eliminar/' + idEmpleado, {
      headers: this.getHeaders(),
    });
  }
}
