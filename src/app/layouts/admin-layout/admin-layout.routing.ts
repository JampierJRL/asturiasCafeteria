import { Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { IconsComponent } from 'src/app/modules/icons/icons.component';
import { MapsComponent } from 'src/app/modules/maps/maps.component';
import { TablesComponent } from 'src/app/modules/tables/tables.component';
import { UserProfileComponent } from 'src/app/modules/auth/user-profile/user-profile.component';
import { titleApp } from 'src/app/data/settings/AppBlobal';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent, title:  `${titleApp} Dashboard` },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent }
];
