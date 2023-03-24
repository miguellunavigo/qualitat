import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HOME_ROUTE } from 'src/app/common/constants/routes.constants';
import { RedirectionGuard } from 'src/app/guards/redirection/redirection.guard';
import { ComponentsModule } from 'src/app/components/components.module';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { LottieAnimationViewModule } from 'ng-lottie';
import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    resolve: {
      //data: RuofferResolver
    },
    children: [
      {
        path: '',
        //loadChildren: '../home/home.module#HomePageModule',
        loadChildren: () => import('../home/home.module').then(x => x.HomePageModule),
        canActivate: [RedirectionGuard],
      },
      {
        path: 'listsiniestros',
        loadChildren:  () => import('../list-siniestro/list-siniestro.module').then(x => x.ListSiniestroModule),
      },
      {
        path: 'modsiniestros',
        loadChildren:  () => import('../mod-siniestro/mod-siniestro.module').then(x => x.ModSiniestroModule),
      },
      {
        path: 'siniestros',
        loadChildren:  () => import('../siniestro/siniestro.module').then(x => x.SiniestroModule),
      },
      {
        path: 'listcomisarias',
        loadChildren:  () => import('../list-comisaria/list-comisaria.module').then(x => x.ListComisariaModule),
      },
      // {
      //   path: 'siniestros',
      //   loadChildren:  () => import('../siniestro/siniestro.module').then(x => x.SiniestroModule),
      // },
      {
        path: '**',
        redirectTo: HOME_ROUTE
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    ComponentsModule,
    LottieAnimationViewModule.forRoot(),
    RouterModule.forChild(routes),
  ],
  declarations: [MainPage],

})
export class MainPageModule { }
