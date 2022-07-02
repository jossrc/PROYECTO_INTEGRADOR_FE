import { Cotizacion } from "./Cotizacion"
import { Usuario } from "./Usuario"
import { Vehiculo } from "./Vehiculo"

export interface Envio {

    idEnvio?:number,
    adjunto?:String,
    fechaInicio?:Date,
    fechaEntrega?:Date,
    fechaCreacion?:Date,
    cotizacion?:Cotizacion,
    usuario?:Usuario,
    vehiculo?:Vehiculo,
    estado?:number

}