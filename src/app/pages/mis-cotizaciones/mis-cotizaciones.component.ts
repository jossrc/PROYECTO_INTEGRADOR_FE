import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {CotizacionService} from "../../service/cotizacion.service";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";

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

}
