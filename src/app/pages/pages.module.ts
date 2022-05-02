import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';

@NgModule({
  declarations: [AdminHomeComponent],
  exports: [AdminHomeComponent],
  imports: [CommonModule, PrimeNgModule],
})
export class PagesModule {}
