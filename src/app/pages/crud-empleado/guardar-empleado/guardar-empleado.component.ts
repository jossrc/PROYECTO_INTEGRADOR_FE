import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import {EmpleadoService} from "../../../service/empleado.service";
import {UbigeoService} from "../../../service/ubigeo.service";
import {LocalService} from "../../../service/local.service";
import {RolService} from "../../../service/rol.service";

interface Departamento {
  name: string,
  code: string
}

interface Local {
  name: string,
  code: number
}

interface Rol {
  name: string,
  code: number
}

@Component({
  selector: 'app-guardar-empleado',
  templateUrl: './guardar-empleado.component.html',
  styleUrls: ['./guardar-empleado.component.css']
})
export class GuardarEmpleadoComponent implements OnInit {

  // TODO: Arreglo de objetos de este tipo {name: 'New York', code: 'NY'},
  listaDepartamentos : Departamento[] = [];
  listaProvincias = [];
  listaDistritos = [];
  listaRoles: Rol[] = [];
  listaLocales: Local[] = [];

  constructor( private empleadoService:EmpleadoService,
               private ubigeoService: UbigeoService,
               private localService: LocalService,
               private rolService: RolService,
               public ref: DynamicDialogRef,
               public config: DynamicDialogConfig) {

  }

  ngOnInit(): void {
    this.listarDepartamentos();
    this.listarLocales();
    this.listarRoles();
  }

  guardarEmpleado() {
    const empleado = {

    }

    this.empleadoService.registrarEmpleado(empleado).subscribe( (data: any) => {
      console.log('Registro exitoso');
    });
  }

  listarDepartamentos() {
    this.ubigeoService.listarDepartamentos().subscribe( (departamentos: string[]) => {
      const data = departamentos.map( (departamento) : Departamento=> {
        return {
          name: departamento,
          code: departamento
        }
      });
      this.listaDepartamentos = data;
      console.log(this.listaDepartamentos)
    })
  }

  listarLocales() {
    this.localService.listarLocales().subscribe( (locales: any) => {
      const data = locales.map( (local: any): Local => {
        return {
          name: local.nombre,
          code: local.id
        }
      })
      this.listaLocales = data;
    });
  }

  listarRoles() {
    this.rolService.listarRoles().subscribe( (roles: any) => {
      const data = roles.filter((rol: any) => rol.id != 3).map( (rol: any): Rol => {
        return {
          name: rol.nombre.replace("ROLE_",""),
          code: rol.id
        }
      })
      this.listaRoles = data
    })
  }


}
