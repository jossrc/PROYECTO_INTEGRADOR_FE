import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { VehiculoService } from 'src/app/service/vehiculo.service';
import { EnviosService } from 'src/app/services/envios.service';

interface Vehiculo {
  name: string,
  code: number
}
@Component({
  selector: 'app-generar-envio',
  templateUrl: './generar-envio.component.html',
  styleUrls: ['./generar-envio.component.css'],
  providers: [ MessageService,ConfirmationService ]
})
export class GenerarEnvioComponent implements OnInit {

  listaVehiculos: Vehiculo[] = [];

  cotizacionEnvio : any = null;

  idEnvio : number = -1;

  hayErrores: boolean = false
    mensajeError: string = ''

    formEnvio: FormGroup = this.formBuilder.group({
      fecha_inicio: ['', [Validators.required]],
      fecha_entrega: ['', [Validators.required]],
      vehiculo: ['', [Validators.required]],
    })

  constructor(
    private vehiculoService: VehiculoService,
    private envioService: EnviosService,
    public ref: DynamicDialogRef,
    private formBuilder: FormBuilder,
    public messageService: MessageService,
    public config: DynamicDialogConfig) { 

      this.listarVehiculos();


    }

  ngOnInit(): void {

    if (this.config?.data && this.config?.data?.cotizacion) {
      this.atraparCotizacion(this.config.data.cotizacion)
    }

  }

  atraparCotizacion(cotizacion : any){
    console.log(cotizacion)
    this.cotizacionEnvio = cotizacion
  }

  listarVehiculos() {
    this.vehiculoService.listarVehiculo().subscribe( (obj: any) => {
      const data = obj.datos.map((vehiculo:any) : Vehiculo =>{
        return{
          name: vehiculo.modelo!,
          code: vehiculo.idVehiculo!
        }
      });
      this.listaVehiculos = data;
    })
  }

  isValidField(field: string) {
    return (
      this.formEnvio.controls[field].errors && this.formEnvio.controls[field].touched
    );
  }

  cerrarAlertError() {
    this.hayErrores = false
    this.mensajeError = ''
  }

  generarEnvio(){
    this.hayErrores = false
      this.mensajeError = ''
      console.log(this.formEnvio.value)
      if (this.formEnvio.invalid) {
        this.formEnvio.markAllAsTouched()
        this.hayErrores = true
        this.mensajeError = 'Verifique que la información sea correcta'
        return;
      }

      const data = this.formEnvio.value;

      const envio = {
        fechaInicio : data.fecha_inicio,
        fechaEntrega : data.fecha_entrega,
        fechaCreacion : new Date(),
        idCotizacion: this.cotizacionEnvio.idCotizacion,
        idUsuario : this.cotizacionEnvio.idUsuario,
        idVehiculo : data.vehiculo.code
      }
      console.log(envio)
      this.envioService.generarEnvio(envio).subscribe( (data: any) => {
        console.log(data)
        if (data && data.ok) {
          this.ref.close(data);
        } else {
          if (!data.ok) {
            this.hayErrores = true
            this.mensajeError = data.mensaje
          }
        }
      })
}
}
