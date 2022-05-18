import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { ListaEnviosComponent } from './pages/lista-envios/lista-envios.component';

const routes: Routes = [
  { path: 'admin/home', component: AdminHomeComponent },
  { path: 'listEnvio', component: ListaEnviosComponent},
  { path: '**', component: AdminHomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
