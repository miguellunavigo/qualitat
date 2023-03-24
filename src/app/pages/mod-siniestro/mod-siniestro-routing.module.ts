import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModSiniestroComponent } from './mod-siniestro.component';
import { LottieAnimationViewModule } from 'ng-lottie';


const routes: Routes = [
  {
    path: '',
    component: ModSiniestroComponent
  }
];

@NgModule({
  imports: [
    LottieAnimationViewModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ModSiniestroRoutingModule { }
