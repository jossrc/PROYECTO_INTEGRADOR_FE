import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_ROUTE = environment.API_ENDPOINT + "/usuarios/cliente";
let token = "Bearer " + environment.TOKEN_TEST

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // private headers = new HttpHeaders()
  //   .set("Content-Type", "application/json")
  //   .set("Authorization", token)

  constructor( private http: HttpClient ) { }

  listarClientes(): Observable<any> {
    token = "Bearer " + localStorage.getItem('postales_token')
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", token)


    return this.http.get(API_ROUTE + "/listar", { headers } )
  }

  registrarCliente(cliente: any): Observable<any> {
    return this.http.post(API_ROUTE + "/registrar", cliente)
  }

}
