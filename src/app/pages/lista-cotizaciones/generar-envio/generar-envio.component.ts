import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";


@Component({
  selector: 'app-generar-envio',
  templateUrl: './generar-envio.component.html',
  styleUrls: ['./generar-envio.component.css'],
  providers: [ MessageService,ConfirmationService ]
})
export class GenerarEnvioComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
