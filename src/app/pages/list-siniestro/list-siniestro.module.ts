import { ComponentsModule } from 'src/app/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ListSiniestroComponent } from 'src/app/pages/list-siniestro/list-siniestro.component';
import { ListSiniestroRoutingModule } from 'src/app/pages/list-siniestro/list-siniestro-routing.module';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { GenericModalComponent } from 'src//app/components/generic-modal/generic-modal.component';
import { LottieAnimationViewModule } from 'ng-lottie';

@NgModule({
  declarations: [ListSiniestroComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ListSiniestroRoutingModule,
    IonicModule,
    ComponentsModule,
    DigitOnlyModule,
    LottieAnimationViewModule.forRoot(),
  ],
  entryComponents: [
    GenericModalComponent,
  ]
})
export class ListSiniestroModule { }
