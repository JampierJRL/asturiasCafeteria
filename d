[1mdiff --git a/src/app/data/interfaces/IUsuarios.ts b/src/app/data/interfaces/IUsuarios.ts[m
[1mindex 055f07e..28296aa 100644[m
[1m--- a/src/app/data/interfaces/IUsuarios.ts[m
[1m+++ b/src/app/data/interfaces/IUsuarios.ts[m
[36m@@ -9,3 +9,4 @@[m [mexport interface IUsuarios {[m
   codPersona?:          number;[m
   codSucursal?:         number;[m
 }[m
[41m+[m
[1mdiff --git a/src/app/modules/mantenimiento/mantenimiento.module.ts b/src/app/modules/mantenimiento/mantenimiento.module.ts[m
[1mindex d9896c2..b924291 100644[m
[1m--- a/src/app/modules/mantenimiento/mantenimiento.module.ts[m
[1m+++ b/src/app/modules/mantenimiento/mantenimiento.module.ts[m
[36m@@ -13,6 +13,7 @@[m [mimport { TipoPagoComponent } from './tipopago/tipopago.component';[m
 import { PerfilesComponent } from './perfiles/perfiles.component';[m
 import { DatosPersonalesComponent } from './datospersonales/datospersonales.component';[m
 import { SucursalesComponent } from './sucursales/sucursales.component';[m
[32m+[m[32mimport { UsuariosComponent } from './usuarios/usuarios.component';[m
 [m
 [m
 [m
[36m@@ -27,7 +28,8 @@[m [mimport { SucursalesComponent } from './sucursales/sucursales.component';[m
     TipoPagoComponent,[m
     PerfilesComponent,[m
     DatosPersonalesComponent,[m
[31m-    SucursalesComponent[m
[32m+[m[32m    SucursalesComponent,[m
[32m+[m[32m    UsuariosComponent[m
 [m
   ],[m
   imports: [[m
[1mdiff --git a/src/app/modules/mantenimiento/mantenimiento.routing.ts b/src/app/modules/mantenimiento/mantenimiento.routing.ts[m
[1mindex f0689fe..5f27028 100644[m
[1m--- a/src/app/modules/mantenimiento/mantenimiento.routing.ts[m
[1m+++ b/src/app/modules/mantenimiento/mantenimiento.routing.ts[m
[36m@@ -10,6 +10,7 @@[m [mimport { TipoPagoComponent } from './tipopago/tipopago.component';[m
 import { PerfilesComponent } from './perfiles/perfiles.component';[m
 import { DatosPersonalesComponent } from './datospersonales/datospersonales.component';[m
 import { SucursalesComponent } from './sucursales/sucursales.component';[m
[32m+[m[32mimport { UsuariosComponent } from './usuarios/usuarios.component';[m
 [m
 [m
 const routes: Routes = [[m
[36m@@ -63,6 +64,11 @@[m [mconst routes: Routes = [[m
     path: 'sucursales',[m
     component: SucursalesComponent, // Asegúrate de tener este componente[m
     title: `${titleApp} Sucursales`[m
[32m+[m[32m  },[m
[32m+[m[32m  {[m
[32m+[m[32m    path: 'usuarios',[m
[32m+[m[32m    component: UsuariosComponent, // Asegúrate de tener este componente[m
[32m+[m[32m    title: `${titleApp} Usuarios`[m
   }[m
 ];[m
 [m
[1mdiff --git a/src/app/shared/components/components.module.ts b/src/app/shared/components/components.module.ts[m
[1mindex 5d0900e..e6db6cf 100644[m
[1m--- a/src/app/shared/components/components.module.ts[m
[1m+++ b/src/app/shared/components/components.module.ts[m
[36m@@ -11,6 +11,9 @@[m [mimport { CboDepartamentoComponent } from './cbo-departamento/cbo-departamento.co[m
 import { CboProvinciasComponent } from './cbo-provincias/cbo-provincias.component';[m
 import { CboDistritosComponent } from './cbo-distritos/cbo-distritos.component';[m
 import { CboTipoDocumentoComponent } from './cbo-tipo-documento/cbo-tipo-documento.component';[m
[32m+[m[32mimport { CboPerfilesUserComponent } from './cbo-perfiles-user/cbo-perfiles-user.component';[m
[32m+[m[32mimport { CboPersonaUserComponent } from './cbo-persona-user/cbo-persona-user.component';[m
[32m+[m[32mimport { CboSucursalesUserComponent } from './cbo-sucursales-user/cbo-sucursales-user.component';[m
 [m
 @NgModule({[m
   imports: [[m
[36m@@ -28,7 +31,10 @@[m [mimport { CboTipoDocumentoComponent } from './cbo-tipo-documento/cbo-tipo-documen[m
     CboDepartamentoComponent,[m
     CboProvinciasComponent,[m
     CboDistritosComponent,[m
[31m-    CboTipoDocumentoComponent[m
[32m+[m[32m    CboPerfilesUserComponent,[m
[32m+[m[32m    CboTipoDocumentoComponent,[m
[32m+[m[32m    CboPersonaUserComponent,[m
[32m+[m[32m    CboSucursalesUserComponent[m
   ],[m
   exports: [[m
     FooterComponent,[m
[36m@@ -38,7 +44,11 @@[m [mimport { CboTipoDocumentoComponent } from './cbo-tipo-documento/cbo-tipo-documen[m
     CboDepartamentoComponent,[m
     CboProvinciasComponent,[m
     CboDistritosComponent,[m
[31m-    CboTipoDocumentoComponent[m
[32m+[m[32m    CboPerfilesUserComponent,[m
[32m+[m[32m    CboTipoDocumentoComponent,[m
[32m+[m[32m    CboPersonaUserComponent,[m
[32m+[m[32m    CboSucursalesUserComponent[m
[32m+[m[41m    [m
   ][m
 })[m
 export class ComponentsModule { }[m
[1mdiff --git a/src/app/shared/components/sidebar/sidebar.component.ts b/src/app/shared/components/sidebar/sidebar.component.ts[m
[1mindex f261c34..cf25427 100644[m
[1m--- a/src/app/shared/components/sidebar/sidebar.component.ts[m
[1m+++ b/src/app/shared/components/sidebar/sidebar.component.ts[m
[36m@@ -18,6 +18,7 @@[m [mexport const ROUTES: RouteInfo[] = [[m
     { path: '/mantenimiento/perfiles', title: 'Perfiles',  icon:'ni ni-bell-55 text-blue', class: '' },[m
     { path: '/mantenimiento/datospersonales', title: 'DatosPersonales',  icon:'ni ni-bell-55 text-blue', class: '' },[m
     { path: '/mantenimiento/sucursales', title: 'Sucursales',  icon:'ni ni-bell-55 text-blue', class: '' },[m
[32m+[m[32m    { path: '/mantenimiento/usuarios', title: 'Usuarios',  icon:'ni ni-bell-55 text-blue', class: '' },[m
 ];[m
 [m
 @Component({[m
