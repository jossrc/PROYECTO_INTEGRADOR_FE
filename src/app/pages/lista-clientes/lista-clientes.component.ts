import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import { UsuarioService } from 'src/app/service/usuario.service';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css'],
  providers: [ MessageService,ConfirmationService ]
})
export class ListaClientesComponent implements OnInit {

  listaUsuarios = [];

  constructor(
    private usuarioService:UsuarioService,
    public dialogService: DialogService,
    public messageService: MessageService) { }

  ngOnInit(): void {
    this.obtenerClientes();
  }

  private obtenerClientes() {
    this.usuarioService.listarClientes().subscribe( (data: any) => {
      this.listaUsuarios = data.datos;
      console.log(data);
    });
  }

}
