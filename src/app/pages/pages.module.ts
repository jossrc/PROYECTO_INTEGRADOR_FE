import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ListaEnviosComponent } from './lista-envios/lista-envios.component';

@NgModule({
  declarations: [AdminHomeComponent, ListaEnviosComponent],
  exports: [AdminHomeComponent, ListaEnviosComponent], 
  imports: [PrimeNgModule, CommonModule],
})
export class PagesModule {}
