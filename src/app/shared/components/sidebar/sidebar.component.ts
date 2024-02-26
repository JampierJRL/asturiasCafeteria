import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/mantenimiento/categoria', title: 'Categorias',  icon:'ni-planet text-blue', class: '' },
    { path: '/mantenimiento/productos', title: 'Productos',  icon:'ni ni-bag-17 text-blue', class: '' },
    { path: '/mantenimiento/mesa', title: 'Mesas',  icon:'ni ni-bell-55 text-blue', class: '' },
    { path: '/mantenimiento/tipoconsumo', title: 'TipoConsumo',  icon:'ni ni-bell-55 text-blue', class: '' },
    { path: '/mantenimiento/tipodocumento', title: 'TipoDocumento',  icon:'ni ni-bell-55 text-blue', class: '' },
    { path: '/mantenimiento/tipopago', title: 'TipoPago',  icon:'ni ni-bell-55 text-blue', class: '' },
    { path: '/mantenimiento/perfiles', title: 'Perfiles',  icon:'ni ni-bell-55 text-blue', class: '' },
    { path: '/mantenimiento/datospersonales', title: 'DatosPersonales',  icon:'ni ni-bell-55 text-blue', class: '' },
    { path: '/mantenimiento/sucursales', title: 'Sucursales',  icon:'ni ni-bell-55 text-blue', class: '' },
    { path: '/mantenimiento/usuarios', title: 'Usuarios',  icon:'ni ni-bell-55 text-blue', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
  });
  }
}
