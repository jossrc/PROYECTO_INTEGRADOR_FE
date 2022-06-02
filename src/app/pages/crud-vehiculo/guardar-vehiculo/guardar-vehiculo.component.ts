import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import {VehiculoService} from "../../../service/vehiculo.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfirmationService,MessageService} from "primeng/api";

@Component({
  selector: 'app-guardar-vehiculo',
  templateUrl: './guardar-vehiculo.component.html',
  styleUrls: ['./guardar-vehiculo.component.css'],
  providers: [ MessageService,ConfirmationService ]
})
export class GuardarVehiculoComponent implements OnInit {


  idVehiculo: number = -1;
  deseaActualizar: boolean = false

  hayErrores: boolean = false
  mensajeError: string = ''

  formVehiculo: FormGroup = this.formBuilder.group({
    placa: ['', [Validators.required]],
    modelo: ['', [Validators.required]],
    capacidad: ['', [Validators.required]]
  })

  constructor( private vehiculoService:VehiculoService,
               public ref: DynamicDialogRef,
               private formBuilder: FormBuilder,
               public messageService: MessageService,
               public config: DynamicDialogConfig) {

  }

  ngOnInit(): void {
    if (this.config?.data && this.config?.data?.vehiculo) {
      this.atraparVehiculoParaActualizar(this.config.data.vehiculo)
    }
  }


  guardarVehiculo() {
    if (this.formVehiculo.invalid) {
      this.formVehiculo.markAllAsTouched()
      this.messageService.add({severity:'error', summary: 'Verifique que la información sea correcta', detail: 'Datos inválidos'});
      return;
    }

    const data = this.formVehiculo.value;
    const vehiculo:any = {
      placa: data.placa,
      modelo: data.modelo,
      capacidad: data.capacidad
    }

    if (this.idVehiculo == -1) {
      // Registra
      this.vehiculoService.registrarVehiculo(vehiculo).subscribe( (data: any) => {
        console.log(data)
        if (data && data.ok) {
          this.ref.close(data);
        } else {
          if (!data.ok) {
            this.hayErrores = true
            this.mensajeError = data.mensaje
          }
        }
      });
    } else {
      // Actualiza
      vehiculo.idVehiculo = this.idVehiculo
      this.vehiculoService.actualizarVehiculo(this.idVehiculo, vehiculo).subscribe( (data: any) => {
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
  atraparVehiculoParaActualizar(vehiculo: any) {
    this.deseaActualizar = true
    this.idVehiculo = vehiculo.idVehiculo

    this.formVehiculo.patchValue({
      placa: vehiculo.placa,
      modelo: vehiculo.modelo,
      capacidad: vehiculo.capacidad
    })

  }
  

  isValidField(field: string) {
    return (
      this.formVehiculo.controls[field].errors && this.formVehiculo.controls[field].touched
    );
  }

  cerrarAlertError() {
    this.hayErrores = false
    this.mensajeError = ''
  }

}
