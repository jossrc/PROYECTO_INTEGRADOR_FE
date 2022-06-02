import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from "../../service/empleado.service";
import { UbigeoService } from "../../service/ubigeo.service";
import { LocalService } from "../../service/local.service";
import { RolService } from "../../service/rol.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { tap } from "rxjs";
import { Ubigeo } from "../../models/Ubigeo";
import { MessageService } from "primeng/api";
import {CotizacionService} from "../../service/cotizacion.service";

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
  selector: 'app-generar-cotizacion',
  templateUrl: './generar-cotizacion.component.html',
  styleUrls: ['./generar-cotizacion.component.css']
})
export class GenerarCotizacionComponent implements OnInit {

  listaDepartamentos : Departamento[] = [];
  listaProvincias: Provincia[] = [];
  listaDistritos: Distrito[] = [];

  productos: string[] = []

  formCotizacion: FormGroup = this.formBuilder.group({
    direccionDestino: ['', [Validators.required]],
    departamento: ['', [Validators.required]],
    provincia: ['', [Validators.required]],
    distrito: ['', [Validators.required]], // Ubigeo
    productos: [ '', [Validators.required]  ],
    cantidad: [ '', [Validators.required] ],
    pesoTotal: [ '', [Validators.required] ],
    descripcion: [ '', [Validators.required]  ]
  })

  constructor( private empleadoService:EmpleadoService,
               private ubigeoService: UbigeoService,
               private localService: LocalService,
               private rolService: RolService,
               private formBuilder: FormBuilder,
               public messageService: MessageService,
               private cotizacionService: CotizacionService
            ) {

    this.listarDepartamentos();
  }

  ngOnInit(): void {

    this.formCotizacion.get('departamento')?.valueChanges.pipe(
      tap( (_) => {
        this.formCotizacion.get('provincia')?.reset('')
        this.formCotizacion.get('distrito')?.reset('')
      })
    ).subscribe( (departamento: Departamento) => {
      if (departamento) {
        this.listarProvincias(departamento.code)
      }
    })

    this.formCotizacion.get('provincia')?.valueChanges.pipe(
      tap( (_) => {
        this.formCotizacion.get('distrito')?.reset('')
      })
    ).subscribe( (provincia: Provincia) => {
      const departamento: Departamento = this.formCotizacion.get('departamento')?.value
      if (departamento) {
        this.listarDistritos(departamento.code , provincia.code)
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
      this.formCotizacion.controls[field].errors && this.formCotizacion.controls[field].touched
    );
  }

  registrarCotizacion() {
    if (this.formCotizacion.invalid) {
      this.formCotizacion.markAllAsTouched()
      this.messageService.add({ severity:'error', summary:'Error en los datos', detail:'Verifique que la información ingresada esté correcta'});
      return
    }

    const data = this.formCotizacion.value

    // Seguir estructura
    const cotizacion = {
      direccion: data.direccionDestino,
      descripcion: data.descripcion,
      ubigeo: {
        idUbigeo: data.distrito.code
      },
      paquete: {
        productos: JSON.stringify(data.productos),
        cantidad: data.cantidad,
        pesoTotal: data.pesoTotal
      }
    }

    // TODO: Agregar categoria paquete al html, al formCotizacion, y al objeto cotizacion en paquete
    // TODO: Crear el servicio y mandarlo, luego en el back crear una clase que siga la misma estructura de cotizacion, pero el de arriba
    // Solo es hacer dos inserts, para paquete y cotizacion, al front debe devolver un mensaje indicandole que en los prixmos minutos
    // Se le retornará su cotizacion
    // se debe agregar la anotacion @transactional eso indica que es transaccion nada mas

    console.log(this.formCotizacion.value);

  }


}
