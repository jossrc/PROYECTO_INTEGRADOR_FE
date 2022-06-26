import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import {UbigeoService} from "../../../service/ubigeo.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LocalService} from "../../../service/local.service";
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

@Component({
    selector: 'app-guardar-local',
    templateUrl: './guardar-local.component.html',
    styleUrls: ['./guardar-local.component.css'],
    providers: [ MessageService,ConfirmationService ]
})

export class GuardarLocalComponent implements OnInit {

    listaDepartamentos : Departamento[] = [];
    listaProvincias: Provincia[] = [];
    listaDistritos: Distrito[] = [];

    idLocal: number = -1;
    deseaActualizar: boolean = false

    hayErrores: boolean = false
    mensajeError: string = ''

    formLocal: FormGroup = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      hora_inicio: ['', [Validators.required]],
      hora_fin: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      direccion: ['', [Validators.required]],
      departamento: ['', [Validators.required]],
      provincia: ['', [Validators.required]],
      distrito: ['', [Validators.required]], // Ubigeo
    })

    constructor( private ubigeoService: UbigeoService,
                 private localService: LocalService,
                 public ref: DynamicDialogRef,
                 private formBuilder: FormBuilder,
                 public messageService: MessageService,
                 public config: DynamicDialogConfig) {

      this.listarDepartamentos();

      this.formLocal.get('departamento')?.valueChanges.pipe(
        tap( (_) => {
          this.formLocal.get('provincia')?.reset(
            null,
            { emitEvent: false }
          )
          this.listaProvincias = []
          this.formLocal.get('distrito')?.reset(
            null,
            { emitEvent: false }
          )
          this.listaDistritos = []
        })
      ).subscribe( (departamento: Departamento) => {
        if (departamento) {
          //console.log('Que departamento soy ? : ', departamento);
          this.listarProvincias(departamento.code)
        }
      })

      this.formLocal.get('provincia')?.valueChanges.pipe(
        tap( (_) => {
          this.formLocal.get('distrito')?.reset(null,
            { emitEvent: false }
            )
            this.listaDistritos = []
        })
      ).subscribe( (provincia: Provincia) => {
        const departamento: Departamento = this.formLocal.get('departamento')?.value
        if (departamento) {
          this.listarDistritos(departamento.code , provincia.code)
        }
      });

    }

    ngOnInit(): void {

      if (this.config?.data && this.config?.data?.local) {
        this.atraparLocalParaActualizar(this.config.data.local)
      }

    }

    guardarLocal() {
      this.hayErrores = false
      this.mensajeError = ''
      console.log(this.formLocal.value)
      if (this.formLocal.invalid) {
        this.formLocal.markAllAsTouched()
        this.hayErrores = true
        this.mensajeError = 'Verifique que la información sea correcta'
        return;
      }

      const data = this.formLocal.value;

      const apertura = new Date(new Date(data.hora_inicio).setSeconds(0)).toLocaleTimeString();

      const cierre = new Date(new Date(data.hora_fin).setSeconds(0)).toLocaleTimeString();

      console.log(apertura);

      const local = {
        nombre: data.nombre,
        hora_inicio: apertura,
        hora_fin: cierre,
        direccion: data.direccion,
        ubigeo: {
          idUbigeo: data.distrito.code,
        }
      }

      if (this.idLocal == -1) {
        // Registra
        this.localService.registrarLocales(local).subscribe( (data: any) => {
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
        this.localService.actualizarLocales(this.idLocal, local).subscribe( (data: any) => {
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

    private toDateWithOutTimeZone(time:string) {
      let tempTime = time.split(":").map(num=>Number(num));
      let dt = new Date();
      dt.setHours(tempTime[0]);
      dt.setMinutes(tempTime[1]);
      dt.setSeconds(tempTime[2]);
      return dt;
    }

    atraparLocalParaActualizar(local: any) {
      this.deseaActualizar = true
      this.idLocal = local.idUsuario

      this.formLocal.patchValue({
        nombre: local.nombre,
        hora_inicio: this.toDateWithOutTimeZone(local.hora_inicio),
        hora_fin: this.toDateWithOutTimeZone(local.hora_fin),
        direccion: local.direccion,
        departamento: {
          name: local.ubigeo?.departamento,
          code: local.ubigeo.departamento
        },
        provincia: {
          name: local.ubigeo?.provincia,
          code: local.ubigeo?.provincia
        },
        distrito: {
          name: local.ubigeo?.distrito,
          code: local.ubigeo?.idUbigeo
        },
        rol: {
          name: local.rol?.nombre?.replace("ROLE_", ""),
          code: local.rol?.id
        }
      })

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
        this.formLocal.controls[field].errors && this.formLocal.controls[field].touched
      );
    }

    cerrarAlertError() {
      this.hayErrores = false
      this.mensajeError = ''
    }

  }
