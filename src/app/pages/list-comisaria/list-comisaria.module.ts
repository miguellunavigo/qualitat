import { ComponentsModule } from 'src/app/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ListComisariaComponent } from 'src/app/pages/list-comisaria/list-comisaria.component';
import { ListComisariaRoutingModule } from 'src/app/pages/list-comisaria/list-comisaria-routing.module';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { GenericModalComponent } from 'src//app/components/generic-modal/generic-modal.component';
import { LottieAnimationViewModule } from 'ng-lottie';

@NgModule({
  declarations: [ListComisariaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ListComisariaRoutingModule,
    IonicModule,
    ComponentsModule,
    DigitOnlyModule,
    LottieAnimationViewModule.forRoot(),
  ],
  entryComponents: [
    GenericModalComponent,
  ]
})
export class ListComisariaModule { }
