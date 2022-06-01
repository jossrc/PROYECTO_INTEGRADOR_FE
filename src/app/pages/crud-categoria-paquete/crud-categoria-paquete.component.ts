import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {CategoriaPaqueteService} from "../../service/categoria-paquete.service";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-crud-categoria-paquete',
  templateUrl: './crud-categoria-paquete.component.html',
  styleUrls: ['./crud-categoria-paquete.component.css']
})
export class CrudCategoriaPaqueteComponent implements OnInit {
  selectCategoriaPaquetes = [];
  listaCategoriaPaquetes = [];

  ref!: DynamicDialogRef;

  constructor(
    private categoriaPaqueteService:CategoriaPaqueteService,
    public dialogService: DialogService,
    public messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.obtenerCategoriaPaquete()
  }

  private obtenerCategoriaPaquete() {
    this.categoriaPaqueteService.listarCategoriaPaquete().subscribe( (data: any) => {
      this.listaCategoriaPaquetes = data.datos;
      console.log(data);
    });
  }

}
