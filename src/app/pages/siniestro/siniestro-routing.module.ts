import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiniestroComponent } from './siniestro.component';
import { LottieAnimationViewModule } from 'ng-lottie';

const routes: Routes = [
  {
    path: '',
    component: SiniestroComponent,
  }    
];

@NgModule({
  imports: [
    LottieAnimationViewModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SiniestroRoutingModule { }
