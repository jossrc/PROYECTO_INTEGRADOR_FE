import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {EmpleadoService} from "../../service/empleado.service";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import { GuardarEmpleadoComponent } from "./guardar-empleado/guardar-empleado.component";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-crud-empleado',
  templateUrl: './crud-empleado.component.html',
  styleUrls: ['./crud-empleado.component.css'],
  providers: [ MessageService,ConfirmationService ]
})
export class CrudEmpleadoComponent implements OnInit {

  selectEmpleados = [];
  listaEmpleados = [];

  ref!: DynamicDialogRef;

  constructor(
    private empleadoService:EmpleadoService,
    public dialogService: DialogService,
    public messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.obtenerEmpleados()
  }

  private obtenerEmpleados() {
    this.empleadoService.listarEmpleados().subscribe( (data: any) => {
      this.listaEmpleados = data.datos;
      console.log(data);
    });
  }

  public mostrarModalEmpleadoRegistrar() {
    this.ref = this.dialogService.open( GuardarEmpleadoComponent, {
      header: "Registrar un empleado",
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
        this.messageService.add({severity:'info', detail: data.mensaje, summary: 'Empleado Registrado'});
        this.obtenerEmpleados();
      }
    });

  }

  public mostrarModalEmpleadoActualizar(empleado: any) {
    this.ref = this.dialogService.open( GuardarEmpleadoComponent, {
      header: "Actualizar un empleado",
      width: '50%',
      contentStyle: {"max-height": "600px", "overflow": "auto"},
      baseZIndex: 10000,
      dismissableMask: true,
      style: {
        'align-self': 'flex-start',
        'margin-top': '4rem'
      },
      data: {
        empleado
      }
    })

    this.ref.onClose.subscribe( (data: any) => {
      console.log('Hay data? ', data)
      if (data) {
        this.messageService.add({severity:'info', detail: data.mensaje, summary: 'Empleado Actualizado'});
        this.obtenerEmpleados();
      }
    });

  }

  eliminarEmpleado(idEmpleado: number) {
    Swal.fire({
      title: 'Eliminar empleado',
      text: "¿Estás seguro de eliminar al empleado?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.empleadoService.eliminarEmpleado(idEmpleado).subscribe( (data) => {
          this.obtenerEmpleados()
          Swal.fire(
            'Eliminado!',
            'El empleado se ha eliminado',
            'success'
          )
        })

      }
    })
  }



}
