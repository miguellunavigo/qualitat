import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComisariaComponent } from './list-comisaria.component';
import { LottieAnimationViewModule } from 'ng-lottie';

const routes: Routes = [
  {
    path: '',
    component: ListComisariaComponent
  }
];

@NgModule({
  imports: [
    LottieAnimationViewModule.forRoot(),
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class ListComisariaRoutingModule { }
