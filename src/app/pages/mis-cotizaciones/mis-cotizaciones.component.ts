import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {CotizacionService} from "../../service/cotizacion.service";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mis-cotizaciones',
  templateUrl: './mis-cotizaciones.component.html',
  styleUrls: ['./mis-cotizaciones.component.css'],
  providers: [ MessageService,ConfirmationService ]
})
export class MisCotizacionesComponent implements OnInit {

  selectCotizacion = [];
  listaCotizaciones = [];

  ref!: DynamicDialogRef;

  constructor(
    private cotizacionService:CotizacionService,
    public dialogService: DialogService,
    public messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.obtenerCotizaciones()
  }

  private obtenerCotizaciones() {
    this.cotizacionService.listarCotizaciones().subscribe( (data: any) => {
      this.listaCotizaciones = data.datos;
      console.log(data);
    });
  }

  solicitarEnvio(idCotizacion: number) {
    console.log(idCotizacion)
    Swal.fire({
      title: 'Solicitar envio',
      text: "¿Estás seguro de solicitar el envio?",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, solicitar',
      cancelButtonText: 'No, solicitar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cotizacionService.solicitarEnvio(idCotizacion).subscribe( (data) => {
          this.obtenerCotizaciones()
          Swal.fire(
            'Solicitacion efectuada!',
            'La solicitud ha sido enviada',
            'success'
          )
        })

      }
    })
  }

}
