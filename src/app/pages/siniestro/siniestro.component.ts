import { Component, ViewChild } from '@angular/core';
import { LOTTIE_CONFIG } from 'src/app/services/utils/utils';
//import { FIRST_ENROLLMENT_STEP_DESCRIPTION, SECOND_ENROLLMENT_STEP_DESCRIPTION } from 'src/app/common/constants/siniestro.constants';

@Component({
  selector: 'app-siniestro',
  templateUrl: './siniestro.component.html',
  styleUrls: ['./siniestro.component.scss'],
})
export class SiniestroComponent {
    formType: string;
  firstDesktopStepMessage: string;
  secondDesktopStepMessage: string;
  finalButtonText: string;
  globalStepTitle: string;

  public lottieConfig: object = LOTTIE_CONFIG;
  public lottieHeight: number = LOTTIE_CONFIG.sizes.big.height;
  public lottieWidth: number = LOTTIE_CONFIG.sizes.big.width;
  constructor(
  ) {
    this.formType = 'siniestro';
    //this.firstDesktopStepMessage = FIRST_ENROLLMENT_STEP_DESCRIPTION;
    //this.secondDesktopStepMessage = SECOND_ENROLLMENT_STEP_DESCRIPTION;
    this.finalButtonText = 'Registrar';
    this.globalStepTitle = 'Registro';
  }

  ionViewWillEnter() {
    //this.externalForm.setupFormPage();
  }

}
