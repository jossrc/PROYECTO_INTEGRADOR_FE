import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-PE';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule} from "@angular/forms";
import { DialogService } from "primeng/dynamicdialog";
import { MessageService } from "primeng/api";
import { PrimeNgModule } from "./prime-ng/prime-ng.module";

registerLocaleData(localeEs);
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    RouterModule,
    AppRoutingModule,
    PagesModule,
    HttpClientModule,
    ReactiveFormsModule,
    PrimeNgModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-PE' }, DialogService, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
