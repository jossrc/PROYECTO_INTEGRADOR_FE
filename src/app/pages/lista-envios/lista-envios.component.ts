import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Envio } from 'src/app/models/Envio';
import { EnviosService } from 'src/app/services/envios.service';

@Component({
  selector: 'app-lista-envios',
  templateUrl: './lista-envios.component.html',
  styleUrls: ['./lista-envios.component.css']
})
export class ListaEnviosComponent implements OnInit {

  envios: Envio[] = [];

  envio: Envio = {
    idEnv:0,
    descripcion:"",
    fechaSolicitud:new Date(),
    estado:""
  };
  

  constructor(private primengConfig: PrimeNGConfig,
              private envioService: EnviosService
              ) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
    
  }

  consultar() {

    this.envioService.consultar().subscribe(
      response => this.envios = response
    );
  }

}
