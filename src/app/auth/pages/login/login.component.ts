import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { Login } from '../../../interfaces/login.interface';

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
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  iniciarSesion() {

    if (this.formLogin.invalid) {
      return;
    }

    const login = this.formLogin.value;

    this.authService.login(login).subscribe( (data) => {
      if (data && data.token) {
        this.router.navigate(['/home'])
      }
    })

  }

  irARegistrarme() {
    this.router.navigate(["/registro"]);
  }

}
