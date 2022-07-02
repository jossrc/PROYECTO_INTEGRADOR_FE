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
import { CategoriaPaquete } from 'src/app/models/CategoriaPaquete';
import { CategoriaPaqueteService } from 'src/app/service/categoria-paquete.service';
import Swal from 'sweetalert2';

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

interface Categoria {
  name: string,
  code: number
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
  listaCategorias: Categoria[] = [];

  productos: string[] = []

  formCotizacion: FormGroup = this.formBuilder.group({
    direccionDestino: ['', [Validators.required]],
    departamento: ['', [Validators.required]],
    provincia: ['', [Validators.required]],
    distrito: ['', [Validators.required]], // Ubigeo
    productos: [ '', [Validators.required]  ],
    cantidad: [ '', [Validators.required] ],
    categoria: ['', [Validators.required]],
    pesoTotal: [ '', [Validators.required] ],
    descripcion: [ '', [Validators.required]  ]
  })

  constructor( private empleadoService:EmpleadoService,
               private ubigeoService: UbigeoService,
               private localService: LocalService,
               private rolService: RolService,
               private categoriaService: CategoriaPaqueteService,
               private formBuilder: FormBuilder,
               public messageService: MessageService,
               private cotizacionService: CotizacionService
            ) {

    this.listarDepartamentos();
    this.listarCategoria()
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

  listarCategoria(){
    this.categoriaService.listarCategoriaPaquete().subscribe((obj: any) =>{
      const data = obj.datos.map((categoria:CategoriaPaquete) : Categoria =>{
        return{
          name: categoria.nombre!,
          code: categoria.idCategoria!
        }
      });
      this.listaCategorias = data;
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
      productos: data.productos,
      cantidad: data.cantidad,
      pesoTotal: data.pesoTotal,
      idCategoria: data.categoria.code
    };
    console.log(cotizacion);

    // TODO: Agregar categoria paquete al html, al formCotizacion, y al objeto cotizacion en paquete
    // TODO: Crear el servicio y mandarlo, luego en el back crear una clase que siga la misma estructura de cotizacion, pero el de arriba
    // Solo es hacer dos inserts, para paquete y cotizacion, al front debe devolver un mensaje indicandole que en los prixmos minutos
    // Se le retornará su cotizacion
    // se debe agregar la anotacion @transactional eso indica que es transaccion nada mas

    /*console.log(this.formCotizacion.value);*/
    this.cotizacionService.registrarCotizacion(cotizacion).subscribe((response: any)=>{
      Swal.fire("Registrado", "Felicitaciones, se registró correctamente, en breves será comunicado.", 'success')
      console.log(response)
    },
    (error:any)=>{
      Swal.fire("Error", "Error, no se generó la cotización.", 'error')
      console.log(error)
    });



  }


}
