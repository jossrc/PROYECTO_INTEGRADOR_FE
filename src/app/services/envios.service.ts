import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Envio } from '../models/Envio';


 const baseURL = "http://localhost:8090/api/envios"

@Injectable({
  providedIn: 'root'
})
export class EnviosService {

  constructor(private http:HttpClient) { }

 consultar(): Observable<Envio[]>{
   
    return this.http.get<Envio[]>(baseURL + "/listaEnvios")

 }

}
