import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import {EmpleadoService} from "../../../service/empleado.service";
import {UbigeoService} from "../../../service/ubigeo.service";
import {LocalService} from "../../../service/local.service";
import {RolService} from "../../../service/rol.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {tap} from "rxjs";
import {Ubigeo} from "../../../models/Ubigeo";
import {ConfirmationService, MessageService} from "primeng/api";

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
  styleUrls: ['./guardar-empleado.component.css'],
  providers: [ MessageService,ConfirmationService ]
})
export class GuardarEmpleadoComponent implements OnInit {

  listaDepartamentos : Departamento[] = [];
  listaProvincias: Provincia[] = [];
  listaDistritos: Distrito[] = [];
  listaRoles: Rol[] = [];
  listaLocales: Local[] = [];

  idEmpleado: number = -1;
  deseaActualizar: boolean = false

  hayErrores: boolean = false
  mensajeError: string = ''

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

    this.listarDepartamentos();
    this.listarLocales();
    this.listarRoles();

  }

  ngOnInit(): void {

    if (this.config?.data && this.config?.data?.empleado) {
      this.atraparEmpleadoParaActualizar(this.config.data.empleado)
    }

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
    this.hayErrores = false
    this.mensajeError = ''
    if (this.formEmpleado.invalid) {
      this.formEmpleado.markAllAsTouched()
      this.hayErrores = true
      this.mensajeError = 'Verifique que la información sea correcta'
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
      password: data.password ? data.password : null
    }

    if (this.idEmpleado == -1) {
      // Registra
      this.empleadoService.registrarEmpleado(empleado).subscribe( (data: any) => {
        console.log(data)
        if (data && data.ok) {
          this.ref.close(data);
        } else {
          if (!data.ok) {
            this.hayErrores = true
            this.mensajeError = data.mensaje
          }
        }
      });
    } else {
      // Actualiza
      this.empleadoService.actualizarEmpleado(this.idEmpleado, empleado).subscribe( (data: any) => {
        console.log(data)
        if (data && data.ok) {
          this.ref.close(data);
        } else {
          if (!data.ok) {
            this.hayErrores = true
            this.mensajeError = data.mensaje
          }
        }
      })
    }


  }

  atraparEmpleadoParaActualizar(empleado: any) {
    this.deseaActualizar = true
    this.idEmpleado = empleado.idUsuario

    this.formEmpleado.patchValue({
      nombre: empleado.nombre,
      apellido: empleado.apellido,
      email: empleado.email,
      dni: empleado.dni,
      direccion: empleado.direccion,
      local: empleado.local ? { name: empleado.local?.nombre, code: empleado.local?.idLocal } : '',
      departamento: {
        name: empleado.ubigeo?.departamento,
        code: empleado.ubigeo.departamento
      },
      provincia: {
        name: empleado.ubigeo?.provincia,
        code: empleado.ubigeo?.provincia
      },
      distrito: {
        name: empleado.ubigeo?.distrito,
        code: empleado.ubigeo?.idUbigeo
      },
      rol: {
        name: empleado.rol?.nombre?.replace("ROLE_", ""),
        code: empleado.rol?.id
      }
    })

    this.listarProvincias(empleado.ubigeo?.provincia)
    this.listarDistritos(empleado.ubigeo?.departamento , empleado.ubigeo?.provincia)

    // Limpiamos el validador para la contraseña
    this.formEmpleado.get('password')?.clearValidators();
    this.formEmpleado.get('password')?.updateValueAndValidity();

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

  cerrarAlertError() {
    this.hayErrores = false
    this.mensajeError = ''
  }

}
