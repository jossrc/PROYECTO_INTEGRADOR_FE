import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {CategoriaPaqueteService} from "../../service/categoria-paquete.service";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {GuardarCategoriaPaqueteComponent} from "./guardar-categoria-paquete/guardar-categoria-paquete.component";


@Component({
  selector: 'app-crud-categoria-paquete',
  templateUrl: './crud-categoria-paquete.component.html',
  styleUrls: ['./crud-categoria-paquete.component.css'],
  providers: [ MessageService,ConfirmationService ]
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

  public mostrarModalCategoriaPaqueteRegistrar() {
    this.ref = this.dialogService.open( GuardarCategoriaPaqueteComponent, {
      header: "Registrar una Categoria Paquete",
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
        this.obtenerCategoriaPaquete();
      }
    });

  }

}
