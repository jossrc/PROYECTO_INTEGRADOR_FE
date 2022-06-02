import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import {CategoriaPaqueteService} from "../../../service/categoria-paquete.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfirmationService,MessageService} from "primeng/api";

@Component({
  selector: 'app-guardar-categoria-paquete',
  templateUrl: './guardar-categoria-paquete.component.html',
  styleUrls: ['./guardar-categoria-paquete.component.css'],
  providers: [ MessageService,ConfirmationService ]
})
export class GuardarCategoriaPaqueteComponent implements OnInit {


  idCategoria: number = -1;
  deseaActualizar: boolean = false

  hayErrores: boolean = false
  mensajeError: string = ''

  formCategoria: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]]
  })

  constructor( private categoriaPaqueteService:CategoriaPaqueteService,
               public ref: DynamicDialogRef,
               private formBuilder: FormBuilder,
               public messageService: MessageService,
               public config: DynamicDialogConfig) {

  }

  ngOnInit(): void {
    if (this.config?.data && this.config?.data?.categoriaPaquete) {
      this.atraparCategoriaPaqueteParaActualizar(this.config.data.categoriaPaquete)
    }
  }


  guardarCategoriaPaquete() {
    if (this.formCategoria.invalid) {
      this.formCategoria.markAllAsTouched()
      this.messageService.add({severity:'error', summary: 'Verifique que la información sea correcta', detail: 'Datos inválidos'});
      return;
    }

    const data = this.formCategoria.value;
    const categoriaPaquete = {
      nombre: data.nombre,
      descripcion: data.descripcion
    }

    if (this.idCategoria == -1) {
      // Registra
      this.categoriaPaqueteService.registrarCategoriaPaquete(categoriaPaquete).subscribe( (data: any) => {
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
      this.categoriaPaqueteService.actualizarCategoriaPaquete(this.idCategoria, categoriaPaquete).subscribe( (data: any) => {
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
  atraparCategoriaPaqueteParaActualizar(categoriaPaquete: any) {
    this.deseaActualizar = true
    this.idCategoria = categoriaPaquete.idCategoria

    this.formCategoria.patchValue({
      nombre: categoriaPaquete.nombre,
      descripcion: categoriaPaquete.descripcion,
      
    })

  }
  

  isValidField(field: string) {
    return (
      this.formCategoria.controls[field].errors && this.formCategoria.controls[field].touched
    );
  }

  cerrarAlertError() {
    this.hayErrores = false
    this.mensajeError = ''
  }

}
