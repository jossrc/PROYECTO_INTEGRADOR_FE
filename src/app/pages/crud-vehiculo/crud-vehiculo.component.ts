import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {VehiculoService} from "../../service/vehiculo.service";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {GuardarVehiculoComponent} from "./guardar-vehiculo/guardar-vehiculo.component";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-crud-vehiculo',
  templateUrl: './crud-vehiculo.component.html',
  styleUrls: ['./crud-vehiculo.component.css'],
  providers: [ MessageService,ConfirmationService ]
})
export class CrudVehiculoComponent implements OnInit {

  selectVehiculos = [];
  listaVehiculos = [];

  ref!: DynamicDialogRef;

  constructor(
    private vehiculoService:VehiculoService,
    public dialogService: DialogService,
    public messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.obtenerVehiculo()
  }

  private obtenerVehiculo() {
    this.vehiculoService.listarVehiculo().subscribe( (data: any) => {
      this.listaVehiculos = data.datos;
      console.log(data);
    });
  }

  public mostrarModalVehiculoRegistrar() {
    this.ref = this.dialogService.open( GuardarVehiculoComponent, {
      header: "Registrar un Vehiculo",
      width: '50%',
      contentStyle: {"max-height": "600px", "overflow": "auto"},
      baseZIndex: 10000,
      dismissableMask: true,
      style: {
        'align-self': 'flex-start',
        'margin-top': '4rem'
      }
    })

    this.ref.onClose.subscribe( (data: any) => {
      console.log('Hay data? ', data)
      if (data) {
        this.messageService.add({severity:'info', detail: data.mensaje, summary: 'Vehiculo Registrado'});
        this.obtenerVehiculo();
      }
    });

  }

  public mostrarModalVehiculoActualizar(vehiculo: any) {
    this.ref = this.dialogService.open( GuardarVehiculoComponent, {
      header: "Actualizar un Vehiculo",
      width: '50%',
      contentStyle: {"max-height": "600px", "overflow": "auto"},
      baseZIndex: 10000,
      dismissableMask: true,
      style: {
        'align-self': 'flex-start',
        'margin-top': '4rem'
      },
      data: {
        vehiculo
      }
    })

    this.ref.onClose.subscribe( (data: any) => {
      console.log('Hay data? ', data)
      if (data) {
        this.messageService.add({severity:'info', detail: data.mensaje, summary: 'Vehiculo Actualizado'});
        this.obtenerVehiculo();
      }
    });

  }

  eliminarVehiculo(idVehiculo: number) {
    Swal.fire({
      title: 'Eliminar vehiculo',
      text: "¿Estás seguro de eliminar el vehiculo?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.vehiculoService.eliminarVehiculo(idVehiculo).subscribe( (data) => {
          this.obtenerVehiculo()
          Swal.fire(
            'Eliminado!',
            'El vehiculo se ha eliminado',
            'success'
          )
        })

      }
    })
  }

}
