import { ComponentsModule } from 'src/app/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { SiniestroComponent } from 'src/app/pages/siniestro/siniestro.component';
import { SiniestroRoutingModule } from 'src/app/pages/siniestro/siniestro-routing.module';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { GenericModalComponent } from 'src//app/components/generic-modal/generic-modal.component';

@NgModule({
  declarations: [SiniestroComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SiniestroRoutingModule,
    IonicModule,
    ComponentsModule,
    DigitOnlyModule,
  ],
  entryComponents: [
    GenericModalComponent,
  ]
})
export class SiniestroModule { }
