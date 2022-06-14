import { Local } from "./Local";
import { Paquete } from "./Paquete";
import { Rol } from "./Rol";
import { Ubigeo } from "./Ubigeo";
import { Usuario } from "./Usuario";

export interface Cotizacion {

     idCotizacion?:number,
     descripcion?:string,
     costo?:number,
     direccion?:string,
     fechaCreacion?:Date,
     ubigeo?:Ubigeo,
     usuario?:Usuario,
     local?:Local,
     rol?:Rol,
     paquete?:Paquete,
     estado?:number

}
