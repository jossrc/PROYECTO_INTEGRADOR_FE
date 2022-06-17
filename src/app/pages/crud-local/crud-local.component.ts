import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {LocalService} from "../../service/local.service";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import { GuardarLocalComponent } from "./guardar-local/guardar-local.component";
import Swal from 'sweetalert2'
@Component({
  selector: 'app-crud-local',
  templateUrl: './crud-local.component.html',
  styleUrls: ['./crud-local.component.css'],
  providers: [ MessageService,ConfirmationService ]
})
export class CrudLocalComponent implements OnInit {

  selectLocales = [];
  listaLocales = [];

  ref!: DynamicDialogRef;

  constructor(
    private localService:LocalService,
    public dialogService: DialogService,
    public messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.obtenerLocales()
  }

  private obtenerLocales() {
    this.localService.listarLocales().subscribe( (data: any) => {
      this.listaLocales = data.datos;
      console.log(data);
    });
  }

  public mostrarModalLocalRegistrar() {
    this.ref = this.dialogService.open( GuardarLocalComponent, {
      header: "Registrar un local",
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
        this.messageService.add({severity:'info', detail: data.mensaje, summary: 'Local Registrado'});
        this.obtenerLocales();
      }
    });

  }

  public mostrarModalLocalActualizar(local: any) {
    this.ref = this.dialogService.open( GuardarLocalComponent, {
      header: "Actualizar un local",
      width: '50%',
      contentStyle: {"max-height": "600px", "overflow": "auto"},
      baseZIndex: 10000,
      dismissableMask: true,
      style: {
        'align-self': 'flex-start',
        'margin-top': '4rem'
      },
      data: {
        local
      }
    })

    this.ref.onClose.subscribe( (data: any) => {
      console.log('Hay data? ', data)
      if (data) {
        this.messageService.add({severity:'info', detail: data.mensaje, summary: 'Local Actualizado'});
        this.obtenerLocales();
      }
    });

  }

  eliminarLocal(idLocal: number) {
    Swal.fire({
      title: 'Eliminar local',
      text: "¿Estás seguro de eliminar el local?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.localService.eliminarLocales(idLocal).subscribe( (data) => {
          this.obtenerLocales()
          Swal.fire(
            'Eliminado!',
            'El local se ha eliminado',
            'success'
          )
        })

      }
    })
  }

}
