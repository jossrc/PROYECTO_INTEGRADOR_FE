import { Ubigeo } from "./Ubigeo";

export interface Local {

    idLocal?:number,
    nombre?:string,
    hora_inicio?:string,
    hora_fin?:string,
    direccion?:string,
    ubigeo?:Ubigeo,
    estado?:number

}