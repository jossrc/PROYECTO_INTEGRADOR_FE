import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import {CategoriaPaqueteService} from "../../../service/categoria-paquete.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-guardar-categoria-paquete',
  templateUrl: './guardar-categoria-paquete.component.html',
  styleUrls: ['./guardar-categoria-paquete.component.css']
})
export class GuardarCategoriaPaqueteComponent implements OnInit {


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

    this.categoriaPaqueteService.registrarCategoriaPaquete(categoriaPaquete).subscribe( (data: any) => {
      console.log(data)
      if (data && data.ok) {
        this.messageService.add({severity:'success', summary: 'Se ha registrado un nuevo categoria paquete', detail: 'Registro exitoso'});
        this.ref.close(categoriaPaquete);
      }
    });
  }

  

  isValidField(field: string) {
    return (
      this.formCategoria.controls[field].errors && this.formCategoria.controls[field].touched
    );
  }

}
