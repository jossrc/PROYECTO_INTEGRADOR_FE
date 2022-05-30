import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { CrudEmpleadoComponent } from './crud-empleado/crud-empleado.component';
import {ToolbarModule} from "primeng/toolbar";

@NgModule({
  declarations: [AdminHomeComponent, ListaUsuariosComponent, CrudEmpleadoComponent],
  exports: [AdminHomeComponent],
  imports: [CommonModule, PrimeNgModule, ToolbarModule],
})
export class PagesModule {}
