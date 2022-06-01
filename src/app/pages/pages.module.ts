import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
<<<<<<< HEAD
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { CrudEmpleadoComponent } from './crud-empleado/crud-empleado.component';
import {ToolbarModule} from "primeng/toolbar";
import { GuardarEmpleadoComponent } from './crud-empleado/guardar-empleado/guardar-empleado.component';
import { CrudLocalComponent } from './crud-local/crud-local.component';
import { CrudCategoriaPaqueteComponent } from './crud-categoria-paquete/crud-categoria-paquete.component';
import { CrudVehiculoComponent } from './crud-vehiculo/crud-vehiculo.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [AdminHomeComponent, ListaUsuariosComponent, CrudEmpleadoComponent, GuardarEmpleadoComponent, CrudLocalComponent, CrudCategoriaPaqueteComponent, CrudVehiculoComponent],
  exports: [AdminHomeComponent],
  imports: [CommonModule, PrimeNgModule, ToolbarModule, ReactiveFormsModule],
=======
import { ListaEnviosComponent } from './lista-envios/lista-envios.component';

@NgModule({
  declarations: [AdminHomeComponent, ListaEnviosComponent],
  exports: [AdminHomeComponent, ListaEnviosComponent], 
  imports: [PrimeNgModule, CommonModule],
>>>>>>> b675004046b75d05627d0d055e0c71b5f3a113a6
})
export class PagesModule {}
