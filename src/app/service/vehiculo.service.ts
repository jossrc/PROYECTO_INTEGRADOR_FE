import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

const API_ROUTE = environment.API_ENDPOINT + "/vehiculo";
const token = "Bearer " + localStorage.getItem('postales_token') || environment.TOKEN_TEST

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  private headers = new HttpHeaders()
  .set("Content-type", "application/json")
  .set("Authorization", token)

  constructor(private http: HttpClient) { }

  listarVehiculo(): Observable<any> {
    return this.http.get(API_ROUTE + "/listar", { headers: this.headers } )
  }

  registrarVehiculo(vehiculo: any): Observable<any> {
    return this.http.post(API_ROUTE + "/registrar", vehiculo, { headers: this.headers } )
  }
  actualizarVehiculo(idVehiculo: number, vehiculo: any): Observable<any> {
    return this.http.put(API_ROUTE + '/actualizar/' + idVehiculo, vehiculo, { headers: this.headers })
  }

  eliminarVehiculo(idVehiculo: number) {
    return this.http.delete(API_ROUTE + '/eliminar/' + idVehiculo, { headers: this.headers })
  }

}
