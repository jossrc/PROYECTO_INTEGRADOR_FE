import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_ROUTE = environment.API_ENDPOINT + '/cotizaciones';
let token =
  'Bearer ' + localStorage.getItem('postales_token') || environment.TOKEN_TEST;

@Injectable({
  providedIn: 'root',
})
export class CotizacionService {
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

  listarCotizaciones(): Observable<any> {
    return this.http.get(API_ROUTE + '/listar', { headers: this.getHeaders() });
  }

  listarCotizacionesTodo(): Observable<any> {

    return this.http.get(API_ROUTE + '/listar/todo', { headers: this.getHeaders() });
  }

  listarCotizacionesPorDia(): Observable<any> {

    return this.http.get(API_ROUTE + '/listarPorDia', { headers: this.getHeaders() });
  }

  listarCotizacionesPorUsuarioDia(): Observable<any> {

    return this.http.get(API_ROUTE + '/listarPorIdDia', { headers: this.getHeaders() });
  }

  registrarCotizacion(datosCotizacion: any): Observable<any> {
    return this.http.post(API_ROUTE + '/registrar', datosCotizacion, { headers: this.getHeaders() });
  }

  solicitarEnvio(idCotizacion: number) {
    return this.http.put(API_ROUTE + '/solicitar-envio/' + idCotizacion, null, { headers: this.getHeaders() });
  }

  rechazarEnvio(idCotizacion: number) {
    return this.http.delete(API_ROUTE + '/rechazar-envio/' + idCotizacion, { headers: this.getHeaders() });
  }
}
