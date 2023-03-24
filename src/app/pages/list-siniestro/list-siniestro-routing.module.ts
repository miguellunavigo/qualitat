import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListSiniestroComponent } from './list-siniestro.component';
import { LottieAnimationViewModule } from 'ng-lottie';


const routes: Routes = [
  {
    path: '',
    component: ListSiniestroComponent
  }
];

@NgModule({
  imports: [
    LottieAnimationViewModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ListSiniestroRoutingModule { }
