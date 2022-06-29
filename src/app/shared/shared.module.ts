import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UsuarioLayoutComponent } from './layout/usuario-layout/usuario-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SidebarComponent, UsuarioLayoutComponent, AuthLayoutComponent],
  exports: [SidebarComponent],
  imports: [PrimeNgModule, CommonModule, RouterModule],
})
export class SharedModule {}
