import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaproductoComponent } from './categoriaproducto/categoriaproducto.component';
import { MantenimientoRoutingModule } from './mantenimiento.routing';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductosComponent } from './productos/productos.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { MesasComponent } from './mesas/mesas.component';
import { TipoConsumoComponent } from './tipoconsumo/tipoconsumo.component';
import { TipoDocumentoComponent } from './tipodocumento/tipodocumento.component';
import { TipoPagoComponent } from './tipopago/tipopago.component';
import { PerfilesComponent } from './perfiles/perfiles.component';
import { DatosPersonalesComponent } from './datospersonales/datospersonales.component';
import { SucursalesComponent } from './sucursales/sucursales.component';
import { UsuariosComponent } from './usuarios/usuarios.component';




@NgModule({
  declarations: [
    CategoriaproductoComponent,
    ProductosComponent,
    MesasComponent,
    TipoConsumoComponent,
    TipoDocumentoComponent,
    TipoPagoComponent,
    PerfilesComponent,
    DatosPersonalesComponent,
    SucursalesComponent,
    UsuariosComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    MantenimientoRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule
  ]
})
export class MantenimientoModule { }
