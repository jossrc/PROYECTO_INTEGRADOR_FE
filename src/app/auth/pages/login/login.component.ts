import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { Login } from '../../../interfaces/login.interface';
import { NavigationService } from '../../../service/navigation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
      this.router.navigate(['/admin/home'])
    }

   }

  ngOnInit(): void {
  }

  iniciarSesion() {

    if (this.formLogin.invalid) {
      return;
    }

    const login = this.formLogin.value;

    this.authService.login(login).subscribe( (data) => {
      if (data && data.token) {
        localStorage.setItem('postales_role', btoa(data.user.authorities[0].role))
        localStorage.setItem('postales_token', data.token);
        this.navigationService.elegirMenuItems(data.user.authorities[0].role)
        this.router.navigate(['/admin/home'])
      }
    })

  }

  irARegistrarme() {
    this.router.navigate(["/registro"]);
  }

}
