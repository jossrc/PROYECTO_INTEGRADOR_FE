import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { CrudEmpleadoComponent } from './pages/crud-empleado/crud-empleado.component';
import { ListaUsuariosComponent } from './pages/lista-usuarios/lista-usuarios.component';
import { ListaClientesComponent } from './pages/lista-clientes/lista-clientes.component';
import { ListaCotizacionesComponent } from './pages/lista-cotizaciones/lista-cotizaciones.component';
import { CrudCategoriaPaqueteComponent } from './pages/crud-categoria-paquete/crud-categoria-paquete.component';
import { CrudVehiculoComponent } from './pages/crud-vehiculo/crud-vehiculo.component';
import { CrudLocalComponent } from './pages/crud-local/crud-local.component';
import { GenerarCotizacionComponent } from './pages/generar-cotizacion/generar-cotizacion.component';
import { AuthLayoutComponent } from './shared/layout/auth-layout/auth-layout.component';
import { UsuarioLayoutComponent } from './shared/layout/usuario-layout/usuario-layout.component';
import { ValidarTokenGuard } from './guards/validar-token.guard';
import { ListaEnviosComponent } from './pages/lista-envios/lista-envios.component';
import { MisEnviosComponent } from './pages/mis-envios/mis-envios.component';
import { MisCotizacionesComponent } from './pages/mis-cotizaciones/mis-cotizaciones.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthLayoutComponent,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'usuario',
    component: UsuarioLayoutComponent,
    children: [
      { path: 'home', component: AdminHomeComponent, pathMatch: 'full' },
      { path: 'cotizacion', component: GenerarCotizacionComponent, pathMatch: 'full' },
      { path: 'mis-cotizaciones', component: MisCotizacionesComponent, pathMatch: 'full'},
      { path: 'mis-envios', component: MisEnviosComponent, pathMatch: 'full'},
      { path: '**', component: AdminHomeComponent },
    ],
    canLoad: [ValidarTokenGuard],
    canActivate: [ValidarTokenGuard],
    data: {
      role: 'ROLE_ALL'
    }
  },
  {
    path: 'admin',
    component: UsuarioLayoutComponent,
    children: [

      { path: 'empleados', component: CrudEmpleadoComponent, pathMatch: 'full' },
      {
        path: 'categoria-paquete',
        component: CrudCategoriaPaqueteComponent,
        pathMatch: 'full'
      },
      { path: 'vehiculo', component: CrudVehiculoComponent, pathMatch: 'full' },
      { path: 'local', component: CrudLocalComponent, pathMatch: 'full' },
      { path: 'clientes', component: ListaClientesComponent, pathMatch: 'full' },
      { path: 'listEnvios', component: ListaEnviosComponent, pathMatch: 'full'},
      { path: 'lista-cotizaciones', component: ListaCotizacionesComponent, pathMatch: 'full'},
      { path: '**', component: AdminHomeComponent },
    ],
    canLoad: [ValidarTokenGuard],
    canActivate: [ValidarTokenGuard],
    data: {
      role: 'ROLE_ADMIN'
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
