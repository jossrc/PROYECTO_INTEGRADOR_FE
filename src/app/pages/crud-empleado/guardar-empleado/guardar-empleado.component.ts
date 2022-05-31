import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import {EmpleadoService} from "../../../service/empleado.service";
import {UbigeoService} from "../../../service/ubigeo.service";
import {LocalService} from "../../../service/local.service";
import {RolService} from "../../../service/rol.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {tap} from "rxjs";
import {Ubigeo} from "../../../models/Ubigeo";
import {MessageService} from "primeng/api";

interface Departamento {
  name: string,
  code: string
}

interface Provincia {
  name: string,
  code: string
}

interface Distrito {
  name: string,
  code: number // ubigeoId
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

  listaDepartamentos : Departamento[] = [];
  listaProvincias: Provincia[] = [];
  listaDistritos: Distrito[] = [];
  listaRoles: Rol[] = [];
  listaLocales: Local[] = [];

  formEmpleado: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    direccion: ['', [Validators.required]],
    local: ['', [Validators.required]],
    rol: ['', [Validators.required]],
    departamento: ['', [Validators.required]],
    provincia: ['', [Validators.required]],
    distrito: ['', [Validators.required]], // Ubigeo
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  })

  constructor( private empleadoService:EmpleadoService,
               private ubigeoService: UbigeoService,
               private localService: LocalService,
               private rolService: RolService,
               public ref: DynamicDialogRef,
               private formBuilder: FormBuilder,
               public messageService: MessageService,
               public config: DynamicDialogConfig) {

  }

  ngOnInit(): void {
    this.listarDepartamentos();
    this.listarLocales();
    this.listarRoles();

    this.formEmpleado.get('departamento')?.valueChanges.pipe(
      tap( (_) => {
        this.formEmpleado.get('provincia')?.reset('')
        this.formEmpleado.get('distrito')?.reset('')
      })
    ).subscribe( (departamento: Departamento) => {
      if (departamento) {
        this.listarProvincias(departamento.code)
      }
    })

    this.formEmpleado.get('provincia')?.valueChanges.pipe(
      tap( (_) => {
        this.formEmpleado.get('distrito')?.reset('')
      })
    ).subscribe( (provincia: Provincia) => {
      const departamento: Departamento = this.formEmpleado.get('departamento')?.value
      if (departamento) {
        this.listarDistritos(departamento.code , provincia.code)
      }
    });

  }

  guardarEmpleado() {
    if (this.formEmpleado.invalid) {
      this.formEmpleado.markAllAsTouched()
      this.messageService.add({severity:'error', summary: 'Verifique que la información sea correcta', detail: 'Datos inválidos'});
      return;
    }

    const data = this.formEmpleado.value;
    const empleado = {
      nombre: data.nombre,
      apellido: data.apellido,
      dni: data.dni,
      direccion: data.direccion,
      local: {
        idLocal: data.local.code
      },
      ubigeo: {
        idUbigeo: data.distrito.code,
      },
      rol: {
        id: data.rol.code
      },
      email: data.email,
      password: data.password
    }

    this.empleadoService.registrarEmpleado(empleado).subscribe( (data: any) => {
      console.log(data)
      if (data && data.ok) {
        this.messageService.add({severity:'success', summary: 'Se ha registrado un nuevo empleado', detail: 'Registro exitoso'});
        this.ref.close(empleado);
      }
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
      this.listaProvincias = [];
      this.listaDistritos = [];
    })
  }

  listarLocales() {
    this.localService.listarLocales().subscribe( (locales: any) => {
      const data = locales.map( (local: any): Local => {
        return {
          name: local.nombre,
          code: local.idLocal
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

  listarProvincias(departamento: string) {
    this.ubigeoService.listarProvincias(departamento).subscribe( (provincias: string[]) => {
      const data = provincias.map( (provincia) : Provincia => {
        return {
          name: provincia,
          code: provincia
        }
      });
      this.listaProvincias = data;
      this.listaDistritos = [];
    })
  }

  listarDistritos(departamento: string, provincia: string) {
    this.ubigeoService.listarDistritos(departamento, provincia).subscribe((ubigeos: Ubigeo[]) => {
      const data = ubigeos.map( (ubigeo: Ubigeo): Distrito => {
        return {
          name: ubigeo.distrito!,
          code: ubigeo.idUbigeo!
        }
      });
      this.listaDistritos = data;
    });
  }

  isValidField(field: string) {
    return (
      this.formEmpleado.controls[field].errors && this.formEmpleado.controls[field].touched
    );
  }

}
