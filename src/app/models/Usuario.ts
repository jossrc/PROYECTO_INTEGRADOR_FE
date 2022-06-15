import { Local } from "./Local";
import { Rol } from "./Rol";
import { Ubigeo } from "./Ubigeo";

export interface Usuario {

    idUsuario?:number,
    nombre?:string,
    apellido?:string,
    dni?:string,
    direccion?:string,
    correo?:string,
    password?:string,
    ubigeo?:Ubigeo,
    rol?:Rol,
    local?:Local,
    disponible?:string,
    estado?:number

}