import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {CotizacionService} from "../../service/cotizacion.service";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import Swal from 'sweetalert2';
import { GenerarEnvioComponent } from './generar-envio/generar-envio.component';

@Component({
  selector: 'app-lista-cotizaciones',
  templateUrl: './lista-cotizaciones.component.html',
  styleUrls: ['./lista-cotizaciones.component.css'],
  providers: [ MessageService,ConfirmationService ]
})
export class ListaCotizacionesComponent implements OnInit {

  listaCotizaciones = [];

  constructor(
    private cotizacionService:CotizacionService,
    public dialogService: DialogService,
    public messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.obtenerCotizacionesTodo()
  }

  private obtenerCotizacionesTodo() {
    this.cotizacionService.listarCotizacionesTodo().subscribe( (data: any) => {
      this.listaCotizaciones = data.datos;
      console.log(data);
    });
  }

  rechazarCotizacion(idCotizacion: number) {
    console.log(idCotizacion)
    Swal.fire({
      title: 'Rechazar envio',
      text: "¿Estás seguro de rechazar el envio?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, rechazar',
      cancelButtonText: 'No, rechazar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cotizacionService.rechazarEnvio(idCotizacion).subscribe( (data) => {
          this.obtenerCotizacionesTodo()
          Swal.fire(
            'Solicitacion efectuada!',
            'La solicitud ha sido enviada',
            'success'
          )
        })

      }
    })
  }

  abrirModal(cotizacion : any){
    const modal = this.dialogService.open( GenerarEnvioComponent, {
      header: "Generar Envio",
      width: '50%',
      contentStyle: {"height": "500px", "overflow": "auto"},
      baseZIndex: 10000,
      dismissableMask: true,
      style: {
        'align-self': 'flex-start',
        'margin-top': '4rem'
      },
      data: {
        cotizacion
      }
  });
  
  modal.onClose.subscribe( (data: any) => {
    console.log('Hay data? ', data)
    if (data) {
      this.messageService.add({severity:'info', detail: data.mensaje, summary: 'Envio generado'});
      this.obtenerCotizacionesTodo();
    }
  });

}

}
