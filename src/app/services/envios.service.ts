import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Envio } from '../models/Envio';


 const baseURL = "http://localhost:8090/api/envios"
 const token = environment.TOKEN_TEST

@Injectable({
  providedIn: 'root'
})
export class EnviosService {

  private headers = new HttpHeaders()
    .set("Content-type", "application/json")
    .set("Authorization", token)

  constructor(private http:HttpClient) { }

  
  consultarId(usuario:number): Observable<any> {

     const params = new HttpParams()
           .set("idUsu", usuario);

    return this.http.get(baseURL + "/listaEnviosUsu/", {params});

  }


 consultar(): Observable<Envio[]>{
   
    return this.http.get<Envio[]>(baseURL + "/listaEnvios", { headers: this.headers })

 }

}
