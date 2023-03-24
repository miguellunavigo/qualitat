import { ComponentsModule } from 'src/app/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ModSiniestroComponent } from 'src/app/pages/mod-siniestro/mod-siniestro.component';
import { ModSiniestroRoutingModule } from 'src/app/pages/mod-siniestro/mod-siniestro-routing.module';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { GenericModalComponent } from 'src//app/components/generic-modal/generic-modal.component';
import { LottieAnimationViewModule } from 'ng-lottie';

@NgModule({
  declarations: [ModSiniestroComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModSiniestroRoutingModule,
    IonicModule,
    ComponentsModule,
    DigitOnlyModule,
    LottieAnimationViewModule.forRoot(),
  ],
  entryComponents: [
    GenericModalComponent,
  ]
})
export class ModSiniestroModule { }
