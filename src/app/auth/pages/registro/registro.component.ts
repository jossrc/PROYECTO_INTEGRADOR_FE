import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Ubigeo } from 'src/app/models/Ubigeo';
import { UbigeoService } from 'src/app/service/ubigeo.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../../service/auth.service';
import { UsuarioService } from '../../../service/usuario.service';
interface Departamento {
  name: string;
  code: string;
}

interface Provincia {
  name: string;
  code: string;
}

interface Distrito {
  name: string;
  code: number; // ubigeoId
}

interface Local {
  name: string;
  code: number;
}

interface Rol {
  name: string;
  code: number;
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  listaDepartamentos: Departamento[] = [];
  listaProvincias: Provincia[] = [];
  listaDistritos: Distrito[] = [];
  listaRoles: Rol[] = [];
  listaLocales: Local[] = [];

  idEmpleado: number = -1;

  hayErrores: boolean = false;
  mensajeError: string = '';

  formUsuario: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    dni: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
    ],
    direccion: ['', [Validators.required]],
    departamento: ['', [Validators.required]],
    provincia: ['', [Validators.required]],
    distrito: ['', [Validators.required]], // Ubigeo
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private ubigeoService: UbigeoService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    if (this.authService.getToken()) {
      this.router.navigate(['/admin/home']);
    }

    this.listarDepartamentos();
  }

  ngOnInit(): void {
    this.formUsuario
      .get('departamento')
      ?.valueChanges.pipe(
        tap((_) => {
          this.formUsuario.get('provincia')?.reset('');
          this.formUsuario.get('distrito')?.reset('');
        })
      )
      .subscribe((departamento: Departamento) => {
        if (departamento) {
          this.listarProvincias(departamento.code);
        }
      });

    this.formUsuario
      .get('provincia')
      ?.valueChanges.pipe(
        tap((_) => {
          this.formUsuario.get('distrito')?.reset('');
        })
      )
      .subscribe((provincia: Provincia) => {
        const departamento: Departamento =
          this.formUsuario.get('departamento')?.value;
        if (departamento) {
          this.listarDistritos(departamento.code, provincia.code);
        }
      });
  }

  registrarUsuario() {
    this.hayErrores = false;
    this.mensajeError = '';
    if (this.formUsuario.invalid) {
      this.formUsuario.markAllAsTouched();
      this.hayErrores = true;
      this.mensajeError = 'Verifique que la información sea correcta';
      return;
    }

    const data = this.formUsuario.value;
    const usuario = {
      nombre: data.nombre,
      apellido: data.apellido,
      dni: data.dni,
      direccion: data.direccion,
      ubigeo: {
        idUbigeo: data.distrito.code,
      },
      email: data.email,
      password: data.password,
    };

    Swal.fire({
      title: 'Registrando información...',
      icon: 'info',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    this.usuarioService.registrarCliente(usuario).subscribe((data: any) => {
      if (data && data.ok) {
        Swal.fire({
          title: 'Registro Exitoso',
          text: 'Te has registrado correctamente, ahora inicia sesión',
          icon: 'success',
        }).then(() => {
          this.router.navigate(['/login']);
        });
      } else {
        if (!data.ok) {
          Swal.fire({
            title: 'Error al registrar',
            text: data.mensaje,
            icon: 'error',
          })
        }
      }
    });
  }

  listarDepartamentos() {
    this.ubigeoService
      .listarDepartamentos()
      .subscribe((departamentos: string[]) => {
        const data = departamentos.map((departamento): Departamento => {
          return {
            name: departamento,
            code: departamento,
          };
        });
        this.listaDepartamentos = data;
        this.listaProvincias = [];
        this.listaDistritos = [];
      });
  }

  listarProvincias(departamento: string) {
    this.ubigeoService
      .listarProvincias(departamento)
      .subscribe((provincias: string[]) => {
        const data = provincias.map((provincia): Provincia => {
          return {
            name: provincia,
            code: provincia,
          };
        });
        this.listaProvincias = data;
        this.listaDistritos = [];
      });
  }

  listarDistritos(departamento: string, provincia: string) {
    this.ubigeoService
      .listarDistritos(departamento, provincia)
      .subscribe((ubigeos: Ubigeo[]) => {
        const data = ubigeos.map((ubigeo: Ubigeo): Distrito => {
          return {
            name: ubigeo.distrito!,
            code: ubigeo.idUbigeo!,
          };
        });
        this.listaDistritos = data;
      });
  }

  isValidField(field: string) {
    return (
      this.formUsuario.controls[field].errors &&
      this.formUsuario.controls[field].touched
    );
  }

  cerrarAlertError() {
    this.hayErrores = false;
    this.mensajeError = '';
  }

  irAIniciarSesion() {
    this.router.navigate(['/login']);
  }
}
