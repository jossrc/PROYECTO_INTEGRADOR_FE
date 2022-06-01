import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
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
})
export class PagesModule {}
