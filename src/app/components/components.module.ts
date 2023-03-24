import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GenericModalComponent } from 'src/app/components/generic-modal/generic-modal.component';
import { GlobalHeaderComponent } from 'src/app/components/global-header/global-header.component';

//import { NotificationsBellComponent } from './notifications-bell/notifications-bell.component';
//import { NotificationsBellComponentModule } from './notifications-bell/notifications-bell.module';

//import { SwitchButtonComponent } from 'src/app/components/switch-button/switch-button.component';
//import { SimpleTooltipComponent } from 'src/app/components/simple-tooltip/simple-tooltip.component';
//import { SimpleTooltipComponentGeneral } from './simple-tooltip-general/simple-tooltip-general.component';

//import { DirectivesModule } from 'src/app/directives/directives.module';
import { IonicModule } from '@ionic/angular';
import { ModalCoberturaComponent } from './siniestro/modal-cobertura/modal-cobertura.component';
//import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  declarations: [
    //SwitchButtonComponent,
    //SimpleTooltipComponent,
    //SimpleTooltipComponentGeneral,
    GenericModalComponent,
    GlobalHeaderComponent,
    ModalCoberturaComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule,
    // DigitOnlyModule,
    //PipesModule,
    // TooltipModule,
    FormsModule,
    //DirectivesModule,
    //NotificationsBellComponentModule
  ],
  providers: [DecimalPipe],
  exports: [
    //SwitchButtonComponent,
    //SimpleTooltipComponent,
    //SimpleTooltipComponentGeneral,
    GenericModalComponent,
    GlobalHeaderComponent,
    //NotificationsBellComponent
  ],
  entryComponents: [
    GenericModalComponent
  ]
})
export class ComponentsModule { }
