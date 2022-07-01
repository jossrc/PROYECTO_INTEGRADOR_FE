import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_ROUTE = environment.API_ENDPOINT + '/usuarios/cliente';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
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

  listarClientes(): Observable<any> {
    return this.http.get(API_ROUTE + '/listar', { headers: this.getHeaders() });
  }

  registrarCliente(cliente: any): Observable<any> {
    return this.http.post(API_ROUTE + '/registrar', cliente);
  }

  perfilUsuario(): Observable<any> {
    return this.http.get(environment.API_ENDPOINT +'/usuarios/mostrarPerfil', { headers: this.getHeaders() });
  }

}
