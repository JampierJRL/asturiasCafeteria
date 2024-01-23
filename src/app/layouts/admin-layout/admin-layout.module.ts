import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { UserProfileComponent } from 'src/app/modules/auth/user-profile/user-profile.component';
import { TablesComponent } from 'src/app/modules/tables/tables.component';
import { IconsComponent } from 'src/app/modules/icons/icons.component';
import { MapsComponent } from 'src/app/modules/maps/maps.component';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent
  ]
})

export class AdminLayoutModule {}
