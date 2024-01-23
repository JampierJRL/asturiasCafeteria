import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaproductoComponent } from './categoriaproducto/categoriaproducto.component';
import { titleApp } from 'src/app/data/settings/AppBlobal';
import { ProductosComponent } from './productos/productos.component';
import { MesasComponent } from './mesas/mesas.component';
import { TipoConsumoComponent } from './tipoconsumo/tipoconsumo.component';
import { TipoDocumentoComponent } from './tipodocumento/tipodocumento.component';
import { TipoPagoComponent } from './tipopago/tipopago.component';
import { PerfilesComponent } from './perfiles/perfiles.component';
import { DatosPersonalesComponent } from './datospersonales/datospersonales.component';


const routes: Routes = [
  {
    path: 'categoria',
    component: CategoriaproductoComponent,
    title:  `${titleApp} Categoria`
  },
  {
    path: 'productos',
    component: ProductosComponent, // Asegúrate de tener este componente
    title: `${titleApp} Producto`
  },
  {
    path: 'mesa',
    component: MesasComponent, // Asegúrate de tener este componente
    title: `${titleApp} Mesa`
  }
  ,
  {
    path: 'tipoconsumo',
    component: TipoConsumoComponent, // Asegúrate de tener este componente
    title: `${titleApp} TipoConsumo`
  }
  ,
  {
    path: 'tipodocumento',
    component: TipoDocumentoComponent, // Asegúrate de tener este componente
    title: `${titleApp} TipoDocumento`
  }
  ,
  {
    path: 'tipopago',
    component: TipoPagoComponent, // Asegúrate de tener este componente
    title: `${titleApp} TipoPago`
  }
  ,
  {
    path: 'perfiles',
    component: PerfilesComponent, // Asegúrate de tener este componente
    title: `${titleApp} Perfiles`
  }
  ,
  {
    path: 'datospersonales',
    component: DatosPersonalesComponent, // Asegúrate de tener este componente
    title: `${titleApp} DatosPersonales`
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MantenimientoRoutingModule { }
