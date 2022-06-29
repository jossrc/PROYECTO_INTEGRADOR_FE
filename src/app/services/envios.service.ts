import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Envio } from '../models/Envio';

const baseURL = environment.API_ENDPOINT + '/envios';

@Injectable({
  providedIn: 'root',
})
export class EnviosService {
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

  consultarId(usuario: number): Observable<any> {
    return this.http.get(baseURL + '/listaEnviosUsu/' + usuario, {
      headers: this.getHeaders(),
    });
  }

  consultar(): Observable<Envio[]> {
    return this.http.get<Envio[]>(baseURL + '/listaEnvios', {
      headers: this.getHeaders(),
    });
  }

  generarEnvio(envio: any): Observable<any> {
    return this.http.post(baseURL + '/registrar', envio, {
      headers: this.getHeaders(),
    });
  }
}
