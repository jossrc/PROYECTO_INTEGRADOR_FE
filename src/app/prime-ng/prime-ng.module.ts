import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TooltipModule } from 'primeng/tooltip';
import { FileUploadModule } from 'primeng/fileupload';
import { MenuModule } from 'primeng/menu';

import { BadgeModule } from 'primeng/badge';
import { StyleClassModule } from 'primeng/styleclass';
import { RippleModule } from 'primeng/ripple';

import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
@NgModule({
  exports: [
    BadgeModule,
    StyleClassModule,
    RippleModule,
    InputNumberModule,
    InputTextareaModule,
    PasswordModule,
    InputTextModule,
    DropdownModule,
    TableModule,
    AccordionModule,
    RadioButtonModule,
    ButtonModule,
    CalendarModule,
    DividerModule,
    DialogModule,
    DynamicDialogModule,
    TooltipModule,
    FileUploadModule,
    MenuModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    TagModule,
  ],
  declarations: [],
  imports: [CommonModule],
})
export class PrimeNgModule {}
