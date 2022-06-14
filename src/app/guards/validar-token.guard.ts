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

    if (this.authService.getToken()) {
      return true;
    }

    this.router.navigateByUrl('/login');
    return false;
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
}
