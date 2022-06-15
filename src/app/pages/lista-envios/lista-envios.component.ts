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
    idEnvio:0,
    adjunto:"",
    fechaInicio:new Date(),
    fechaEntrega:new Date(),
    fechaCreacion:new Date(),
    cotizacion:{
         idCotizacion:0,
         descripcion:"-1"
    },
    usuario:{
         idUsuario:0,
         nombre:"-1",
         apellido:"-1",
    },
    vehiculo:{
         idVehiculo:0,
         placa:"-1"
    },
    estado:0
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
