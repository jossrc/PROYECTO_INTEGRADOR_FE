import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_ROUTE = environment.API_ENDPOINT + '/local';

@Injectable({
  providedIn: 'root',
})
export class LocalService {
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

  listarLocales(): Observable<any> {
    return this.http.get(API_ROUTE + '/listar', { headers: this.getHeaders() });
  }

  registrarLocales(local: any): Observable<any> {
    return this.http.post(API_ROUTE + '/registrar', local, {
      headers: this.getHeaders(),
    });
  }
  actualizarLocales(idLocal: number, local: any): Observable<any> {
    return this.http.put(API_ROUTE + '/actualizar/' + idLocal, local, {
      headers: this.getHeaders(),
    });
  }

  eliminarLocales(idLocal: number) {
    return this.http.delete(API_ROUTE + '/eliminar/' + idLocal, {
      headers: this.getHeaders(),
    });
  }
}
