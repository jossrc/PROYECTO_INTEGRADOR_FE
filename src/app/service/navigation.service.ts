import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IMenuItem {
  id?: string;
  title?: string;
  description?: string;
  type: string; // Possible values: link/dropDown/extLink
  name?: string; // Used as display text for item and title for separator type
  state?: string; // Router state
  icon?: string;
  tooltip?: string;
  disabled?: boolean; // If true, item will not be appeared in sidenav.
  sub?: IChildItem[]; // Dropdown items
  sub2?: IChildItem2[]; // Dropdown items
  sub3?: IChildItem3[];
  badges?: IBadge[];
  active?: boolean;
}
export interface IChildItem {
  id?: string;
  parentId?: string;
  type?: string;
  name: string; // Display text
  state?: string; // Router state
  icon?: string;
  sub?: IChildItem[];
  active?: boolean;
}
export interface IChildItem2 {
  id?: string;
  parentId?: string;
  type?: string;
  name: string; // Display text
  state?: string; // Router state
  icon?: string;
  sub?: IChildItem2[];
  active?: boolean;
}

export interface IChildItem3 {
  id?: string;
  parentId?: string;
  type?: string;
  name: string; // Display text
  state?: string; // Router state
  icon?: string;
  sub?: IChildItem[];
  active?: boolean;
}

interface IBadge {
  color: string; // primary/accent/warn/hex color codes(#fff000)
  value: string; // Display text
}

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  menuUsuario: IMenuItem[] = [
    {
      name: 'Home',
      state: '../usuario/home',
      type: 'link',
      icon: 'pi pi-home',
    },
    {
      name: 'Cotizaciones',
      type: 'menu',
      icon: 'pi pi-chart-line',
      sub: [
        {
          name: 'Generar Cotización',
          state: '../usuario/cotizacion',
          type: 'link',
          icon: 'pi pi-dollar',
        },
        {
          name: 'Mis Cotizaciones',
          state: '../usuario/mis-cotizaciones',
          type: 'link',
          icon: 'pi pi-chart-bar ',
        },
      ],
    },
    {
      name: 'Envíos',
      type: 'menu',
      icon: 'pi pi-car',
      sub: [
        {
          name: 'Mis Envíos',
          state: '../usuario/mis-envios',
          type: 'link',
          icon: 'pi pi-map-marker',
        }
      ],
    }
  ];

  menuOperador: IMenuItem[] = [
    {
      name: 'Home',
      state: '../usuario/home',
      type: 'link',
      icon: 'pi pi-home',
    },
    {
      name: 'Cotizaciones',
      type: 'menu',
      icon: 'pi pi-chart-line',
      sub: [
        {
          name: 'Generar Cotización',
          state: '../usuario/cotizacion',
          type: 'link',
          icon: 'pi pi-dollar',
        },
        {
          name: 'Lista de cotizaciones',
          state: '../admin/lista-cotizaciones',
          type: 'link',
          icon: 'pi pi-chart-bar ',
        },
        {
          name: 'Mis Cotizaciones',
          state: '../usuario/mis-cotizaciones',
          type: 'link',
          icon: 'pi pi-chart-bar ',
        },
      ],
    },
    {
      name: 'Envíos',
      type: 'menu',
      icon: 'pi pi-car',
      sub: [
        {
          name: 'Lista de Envíos',
          state: '../admin/listEnvios',
          type: 'link',
          icon: 'pi pi-ticket',
        },
        {
          name: 'Estado de Envíos',
          state: '../admin/estado-envio',
          type: 'link',
          icon: 'pi pi-map-marker',
        },
        {
          name: 'Mis Envíos',
          state: '../usuario/mis-envios',
          type: 'link',
          icon: 'pi pi-map-marker',
        }
      ],
    },
    {
      name: 'Configuraciones',
      state: '../admin/configuraciones',
      type: 'link',
      icon: 'pi pi-cog',
    },
  ]

  menuAdministrador: IMenuItem[] = [
    {
      name: 'Home',
      state: '../usuario/home',
      type: 'link',
      icon: 'pi pi-home',
    },
    {
      name: 'Empleados',
      state: '../admin/empleados',
      type: 'link',
      icon: 'fa-solid fa-users-gear',
    },
    {
      name: 'Clientes',
      state: '../admin/clientes',
      type: 'link',
      icon: 'pi pi-users',
    },
    {
      name: 'Categoría Paquetes',
      state: '../admin/categoria-paquete',
      type: 'link',
      icon: 'fa-solid fa-box',
    },
    {
      name: 'Vehículos',
      state: '../admin/vehiculo',
      type: 'link',
      icon: 'fa-solid fa-car',
    },
    {
      name: 'Locales',
      state: '../admin/local',
      type: 'link',
      icon: 'fa-solid fa-house',
    },
    {
      name: 'Cotizaciones',
      type: 'menu',
      icon: 'pi pi-chart-line',
      sub: [
        {
          name: 'Generar Cotización',
          state: '../usuario/cotizacion',
          type: 'link',
          icon: 'pi pi-dollar',
        },
        {
          name: 'Lista de cotizaciones',
          state: '../admin/lista-cotizaciones',
          type: 'link',
          icon: 'pi pi-chart-bar ',
        },
        {
          name: 'Mis Cotizaciones',
          state: '../usuario/mis-cotizaciones',
          type: 'link',
          icon: 'pi pi-chart-bar ',
        },
      ],
    },
    {
      name: 'Envíos',
      type: 'menu',
      icon: 'pi pi-car',
      sub: [
        {
          name: 'Lista de Envíos',
          state: '../admin/listEnvios',
          type: 'link',
          icon: 'pi pi-ticket',
        },
        {
          name: 'Estado de Envíos',
          state: '../admin/estado-envio',
          type: 'link',
          icon: 'pi pi-map-marker',
        },
        {
          name: 'Mis Envíos',
          state: '../usuario/mis-envios',
          type: 'link',
          icon: 'pi pi-map-marker',
        }
      ],
    },
    {
      name: 'Configuraciones',
      state: '../admin/configuraciones',
      type: 'link',
      icon: 'pi pi-cog',
    },
  ];
  menuEmpleado: IMenuItem[] = [];

  defaultMenu: IMenuItem[] = [];

  menuItems = new BehaviorSubject<IMenuItem[]>(this.defaultMenu);
  menuItems$ = this.menuItems.asObservable();

  constructor() {}

  elegirMenuItems(role: string) {
    switch (role) {
      case 'ROLE_ADMIN':
        this.menuItems.next(this.menuAdministrador);
        break;
      case 'ROLE_OPERADOR':
        this.menuItems.next(this.menuOperador);
        break;
      case 'ROLE_CLIENTE':
        this.menuItems.next(this.menuUsuario);
        break;
    }
  }
}
