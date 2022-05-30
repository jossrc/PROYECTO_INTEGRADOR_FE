import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { CrudEmpleadoComponent } from "./pages/crud-empleado/crud-empleado.component";
import { ListaUsuariosComponent } from "./pages/lista-usuarios/lista-usuarios.component";

const routes: Routes = [
  { path: 'admin/home', component: AdminHomeComponent },
  { path: 'admin/empleados', component: CrudEmpleadoComponent },
  { path: 'admin/clientes', component: ListaUsuariosComponent },
  { path: '**', component: AdminHomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
