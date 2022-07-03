import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Envio } from 'src/app/models/Envio';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { EnviosService } from 'src/app/services/envios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-envios',
  templateUrl: './lista-envios.component.html',
  styleUrls: ['./lista-envios.component.css']
})
export class ListaEnviosComponent implements OnInit {

  selIdUsuario:number = 0;
  id: number =0;

  envios: Envio[] = [];
  listUsuario : Usuario[] = [];


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
              private envioService: EnviosService,
              private usuarioService: UsuarioService
              ) { 

                this.usuarioService.listarClientes().subscribe(
                  response => this.listUsuario = response
                 );

  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    
  }


  cargaEnvio() {
    console.log(this.id);
    console.log(this.selIdUsuario);
    
    this.envioService.consultarId(this.selIdUsuario).subscribe(
      response => this.listUsuario = response.lista
    );
  }



  consultar() {

    this.envioService.consultar().subscribe(
      response => this.envios = response
    );
  }

  finalizarEnvio(idEnvio: number) {
    console.log(idEnvio)
    Swal.fire({
      title: 'Finalizar envio',
      text: "¿Estás seguro de finalizar el envio?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, finalizar',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.envioService.finalizarEnvio(idEnvio).subscribe( (data) => {
          this.consultar()
          Swal.fire(
            'Envio finalizado!',
            'El envio ha sido finalizado correctamente',
            'success'
          )
        })

      }
    })
  }

}
