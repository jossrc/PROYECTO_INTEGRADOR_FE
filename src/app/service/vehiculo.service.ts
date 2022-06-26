import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

const API_ROUTE = environment.API_ENDPOINT + "/vehiculo";

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    let token =
      'Bearer ' + localStorage.getItem('postales_token') ||
      environment.TOKEN_TEST;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return headers;
  }

  listarVehiculo(): Observable<any> {
    return this.http.get(API_ROUTE + "/listar", { headers: this.getHeaders() });
  }

  registrarVehiculo(vehiculo: any): Observable<any> {
    return this.http.post(API_ROUTE + "/registrar", vehiculo, { headers: this.getHeaders() });
  }
  actualizarVehiculo(idVehiculo: number, vehiculo: any): Observable<any> {
    return this.http.put(API_ROUTE + '/actualizar/' + idVehiculo, vehiculo, { headers: this.getHeaders() });
  }

  eliminarVehiculo(idVehiculo: number) {
    return this.http.delete(API_ROUTE + '/eliminar/' + idVehiculo, { headers: this.getHeaders() });
  }

}
