import { Component, OnInit } from '@angular/core';
import {EmpleadoService} from "../../service/empleado.service";

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
  }

}
