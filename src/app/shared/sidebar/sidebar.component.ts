import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from 'src/app/service/auth.service';
import { IMenuItem, NavigationService, IChildItem } from '../../service/navigation.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {

  listaMenuItems: IMenuItem[] = []

  constructor(
    private primengConfig: PrimeNGConfig,
    private authService: AuthService,
    private navigationService: NavigationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;

    this.navigationService.menuItems$.subscribe( (menuItems) => {
      this.listaMenuItems = menuItems;
    })

  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  setIconClass(item: IMenuItem | IChildItem) {
    return `${item.icon} mr-2`;
  }

}
