import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {EmpleadoService} from "../../service/empleado.service";

@Component({
  selector: 'app-crud-empleado',
  templateUrl: './crud-empleado.component.html',
  styleUrls: ['./crud-empleado.component.css'],
  providers: [ MessageService,ConfirmationService ]
})
export class CrudEmpleadoComponent implements OnInit {

  selectEmpleados = [];
  listaEmpleados = [];

  constructor(private empleadoService:EmpleadoService ) { }

  ngOnInit(): void {
    this.obtenerEmpleados()
  }

  private obtenerEmpleados() {
    this.empleadoService.listarEmpleados().subscribe( (data: any) => {
      this.listaEmpleados = data.datos;
      console.log(data);
    });
  }



}
