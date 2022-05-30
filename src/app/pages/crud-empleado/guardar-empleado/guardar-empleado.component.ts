import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import {EmpleadoService} from "../../../service/empleado.service";

@Component({
  selector: 'app-guardar-empleado',
  templateUrl: './guardar-empleado.component.html',
  styleUrls: ['./guardar-empleado.component.css']
})
export class GuardarEmpleadoComponent implements OnInit {

  constructor( private empleadoService:EmpleadoService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
  }

  guardarEmpleado() {
    const empleado = {

    }

    this.empleadoService.registrarEmpleado(empleado).subscribe( (data: any) => {
      console.log('Registro exitoso');
    });
  }

}
