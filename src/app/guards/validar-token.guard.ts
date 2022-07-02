import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ValidarTokenGuard implements CanActivate, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {

    let url = state.url
    console.log('state url ', url);
    return this.checkUserLogin(route, url);
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | boolean {
    if (this.authService.getToken()) {
      return true;
    }

    this.router.navigateByUrl('/login');
    return false;
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any) {
    if (this.authService.getToken()) {
      let userRole = this.authService.getRole();
      console.log('role? ', userRole)
      if (route.data && route.data['role']) {
        if (route.data['role'] == 'ROLE_ALL') {
          console.log('ROle all ',  route.data['role'] );
          return true
        } else {
          userRole = userRole == 'ROLE_OPERADOR' ? 'ROLE_ADMIN' : userRole
          console.log('Else role ', userRole);
          console.log('data role ', route.data['role']);
          if (route.data['role'] == userRole) {
            return true
          }
        }
      }

      this.router.navigateByUrl('/login');
      return false
    }

    this.router.navigateByUrl('/login');
    return false;


  }

}
