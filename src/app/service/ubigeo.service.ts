import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ubigeo } from '../models/Ubigeo';

const baseUrlUtil = environment.API_ENDPOINT + "/ubigeo";
const token = environment.TOKEN_TEST;

@Injectable({
  providedIn: 'root'
})
export class UbigeoService {

  private headers = new HttpHeaders()
    .set("Content-type", "application/json")
    .set("Authorization", token)

  constructor(private http: HttpClient) { }

  listarDepartamentos(): Observable<string[]> {
    return this.http.get<string[]>(baseUrlUtil + "/departamento", { headers: this.headers });
  }

  listarProvincias(var_dep: any): Observable<string[]> {
    return this.http.get<string[]>(baseUrlUtil + "/provincia/" + var_dep, { headers: this.headers });
  }

  listarDistritos(var_dep: any, var_prov: any): Observable<Ubigeo[]> {
    return this.http.get<Ubigeo[]>(baseUrlUtil + "/distrito/" + var_dep + "/" + var_prov, { headers: this.headers });
  }

}
