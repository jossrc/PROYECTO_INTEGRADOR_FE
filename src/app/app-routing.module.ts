import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { CrudEmpleadoComponent } from './pages/crud-empleado/crud-empleado.component';
import { ListaUsuariosComponent } from './pages/lista-usuarios/lista-usuarios.component';
import { CrudCategoriaPaqueteComponent } from './pages/crud-categoria-paquete/crud-categoria-paquete.component';
import { CrudVehiculoComponent } from './pages/crud-vehiculo/crud-vehiculo.component';
import { CrudLocalComponent } from './pages/crud-local/crud-local.component';
import { GenerarCotizacionComponent } from './pages/generar-cotizacion/generar-cotizacion.component';
import { AuthLayoutComponent } from './shared/layout/auth-layout/auth-layout.component';
import { UsuarioLayoutComponent } from './shared/layout/usuario-layout/usuario-layout.component';
import { ValidarTokenGuard } from './guards/validar-token.guard';
import { ListaEnviosComponent } from './pages/lista-envios/lista-envios.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: UsuarioLayoutComponent,
    children: [
      { path: 'admin/home', component: AdminHomeComponent },
      { path: 'admin/empleados', component: CrudEmpleadoComponent },
      {
        path: 'admin/categoria-paquete',
        component: CrudCategoriaPaqueteComponent,
      },
      { path: 'admin/vehiculo', component: CrudVehiculoComponent },
      { path: 'admin/local', component: CrudLocalComponent },
      { path: 'admin/clientes', component: ListaUsuariosComponent },
      { path: 'cotizacion', component: GenerarCotizacionComponent },
      { path: 'listEnvio', component: ListaEnviosComponent},
      { path: '**', component: AdminHomeComponent },
    ],
    canLoad: [ValidarTokenGuard],
    canActivate: [ValidarTokenGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
