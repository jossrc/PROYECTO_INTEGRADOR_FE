import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

const API_ROUTE = environment.API_ENDPOINT + "/categoriaPaquete";
const token = environment.TOKEN_TEST

@Injectable({
  providedIn: 'root'
})
export class CategoriaPaqueteService {

  private headers = new HttpHeaders()
  .set("Content-type", "application/json")
  .set("Authorization", token)

  constructor(private http: HttpClient) { }

  listarCategoriaPaquete(): Observable<any> {
    return this.http.get(API_ROUTE + "/listar", { headers: this.headers } )
  }

}
