import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';
import { Login } from '../../../interfaces/login.interface';
import { NavigationService } from '../../../service/navigation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;
  btnMensaje = 'Iniciar Sesión';

  formLogin = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private navigationService: NavigationService
  ) {

    if (authService.getToken()) {
      this.router.navigate(['../usuario/home'])
    }

   }

  ngOnInit(): void {
  }

  iniciarSesion() {

    if (this.formLogin.invalid) {
      return;
    }

    const login = this.formLogin.value;

    this.loading = true;
    this.btnMensaje = 'Iniciando Sesión...';
    this.authService.login(login).subscribe( (data) => {
      if (data && data.token) {
        localStorage.setItem('postales_role', btoa(data.user.authorities[0].role))
        localStorage.setItem('postales_token', data.token);
        this.navigationService.elegirMenuItems(data.user.authorities[0].role)
        this.router.navigate(['../usuario/home'])
        this.loading = false;
        this.btnMensaje = 'Iniciar Sesión';
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Correo o contraseña incorrectos',
          text: 'Verifique que los datos ingresados estén correctos'
        })
        this.loading = false;
        this.btnMensaje = 'Iniciar Sesión';
      }
    }, (error) => {
      if (error.status == 401) {
        Swal.fire({
          icon: 'error',
          title: 'Correo o contraseña incorrectos',
          text: 'Verifique que los datos ingresados estén correctos'
        })
        this.loading = false;
        this.btnMensaje = 'Iniciar Sesión';
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Sucedió un error inesperador, vuelva más tarde'
        })
        this.loading = false;
        this.btnMensaje = 'Iniciar Sesión';
      }
    })

  }

  irARegistrarme() {
    this.router.navigate(["/registro"]);
  }

}
