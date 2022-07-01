import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import {CotizacionService} from "../../service/cotizacion.service";
import { Envio } from 'src/app/models/Envio';
import { EnviosService } from 'src/app/services/envios.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  perfil = [];
  listaCotizaciones = [];
  listaCotizacionesUsuarioDia = [];
  envios: Envio[] = [];
  enviosUsuarioDia: Envio[] = [];

  nombreCompleto: string = '';
  rolUsuario: number = 0;
  cantidadUsuarios: number = 0;
  cantidadCotizaciones: number = 0;
  cantidadPaquetes: number = 0;
  cantidadEnvios: number = 0;

  cantidadCotizacionesAprobadas: number = 0;
  cantidadCotizacionesPendientes: number = 0;
  cantidadCotizacionesRechazados: number = 0;
  cantidadEnviosEntregados: number = 0;

  constructor(
    private usuarioService:UsuarioService,
    private cotizacionService:CotizacionService,
    private envioService: EnviosService
  ) { }

  ngOnInit(): void {

    this.obtenerDatosUsuario()

  }

  public obtenerDatosUsuario() {
      this.usuarioService.perfilUsuario().subscribe( (data: any) => {
      this.nombreCompleto = data.nombreCompleto;
      this.rolUsuario = data.rolusuario;
      this.cantidadUsuarios = data.cantidadUsuarios;
      this.cantidadCotizaciones = data.cantidadCotizaciones;
      this.cantidadPaquetes = data.cantidadPaquetes;
      this.cantidadEnvios = data.cantidadEnvios;
      if(this.rolUsuario !=3){
        this.obtenerCotizacionesTodo()
        this.consultarEnvios()
      }else{
        this.obtenerCotizacionesPorUsuarioDia()
        this.consultarEnviosUsuarioDia()
      }
      this.cantidadCotizacionesAprobadas = data.cantidadCotizacionesAprobadas;
      this.cantidadCotizacionesPendientes = data.cantidadCotizacionesPendientes;
      this.cantidadCotizacionesRechazados = data.cantidadCotizacionesRechazados;
      this.cantidadEnviosEntregados = data.cantidadEnviosEntregados;

      this.perfil = data.datos;
    });
  }

  private obtenerCotizacionesTodo() {
    this.cotizacionService.listarCotizacionesPorDia().subscribe( (data: any) => {
      this.listaCotizaciones = data.datos;
      console.log(data);
    });
  }

  private obtenerCotizacionesPorUsuarioDia() {
    this.cotizacionService.listarCotizacionesPorUsuarioDia().subscribe( (data: any) => {
      this.listaCotizacionesUsuarioDia = data.datos;
      console.log(data);
    });
  }

  private consultarEnvios() {

    this.envioService.consultarPorDia().subscribe(
      response => this.envios = response
    );
  }

  private consultarEnviosUsuarioDia() {

    this.envioService.consultarPorUsuarioDia().subscribe(
      response => this.enviosUsuarioDia = response
    );
  }

}
