import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const API_ROUTE = environment.API_ENDPOINT + '/categoriaPaquete';
@Injectable({
  providedIn: 'root',
})
export class CategoriaPaqueteService {
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

  listarCategoriaPaquete(): Observable<any> {
    return this.http.get(API_ROUTE + '/listar', { headers: this.getHeaders() });
  }

  registrarCategoriaPaquete(categoriaPaquete: any): Observable<any> {
    return this.http.post(API_ROUTE + '/registrar', categoriaPaquete, {
      headers: this.getHeaders(),
    });
  }
  actualizarCategoriaPaquete(
    idCategoria: number,
    categoriaPaquete: any
  ): Observable<any> {
    return this.http.put(
      API_ROUTE + '/actualizar/' + idCategoria,
      categoriaPaquete,
      { headers: this.getHeaders() }
    );
  }

  eliminarCategoriaPaquete(idCategoria: number) {
    return this.http.delete(API_ROUTE + '/eliminar/' + idCategoria, {
      headers: this.getHeaders(),
    });
  }
}
