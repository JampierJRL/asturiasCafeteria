import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CboCategoriasProductosComponent } from './cbo-categorias-productos/cbo-categorias-productos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CboDepartamentoComponent } from './cbo-departamento/cbo-departamento.component';
import { CboProvinciasComponent } from './cbo-provincias/cbo-provincias.component';
import { CboDistritosComponent } from './cbo-distritos/cbo-distritos.component';
import { CboTipoDocumentoComponent } from './cbo-tipo-documento/cbo-tipo-documento.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    CboCategoriasProductosComponent,
    CboDepartamentoComponent,
    CboProvinciasComponent,
    CboDistritosComponent,
    CboTipoDocumentoComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    CboCategoriasProductosComponent,
    CboDepartamentoComponent,
    CboProvinciasComponent,
    CboDistritosComponent,
    CboTipoDocumentoComponent
  ]
})
export class ComponentsModule { }
