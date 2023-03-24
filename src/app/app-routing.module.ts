import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HOME_ROUTE, LOGIN_ROUTE } from './common/constants/routes.constants';
import { AuthGuard } from './guards/auth/auth.guard';
import { MaintenanceGuard } from './guards/maintenance/maintenance.guard';
import { NoAuthGuard } from './guards/no-auth/no-auth.guard';

const routes: Routes = [
   {
     path: LOGIN_ROUTE,
     canLoad: [NoAuthGuard],
     loadChildren: () => import('./pages/login/login.module').then(x => x.LoginModule),
   },
   {
     path: HOME_ROUTE,
     canLoad: [MaintenanceGuard],
     canActivate: [AuthGuard],
     loadChildren: () => import('./pages/main/main.module').then(x => x.MainPageModule),
   },
   {
     path: '**',
     redirectTo: LOGIN_ROUTE
   }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
