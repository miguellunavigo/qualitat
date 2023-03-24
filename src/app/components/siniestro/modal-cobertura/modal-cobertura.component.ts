import { Observable, Subscription } from 'rxjs';
import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SiniestroService } from 'src/app/services/siniestro/siniestro-service';
import { ICoberturaGeneral } from 'src/app/model/ISiniestro';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ISelectSiniestro } from 'src/app/model/ISelectSiniestro';

@Component({
  selector: 'app-modal-cobertura',
  templateUrl: './modal-cobertura.component.html',
  styleUrls: ['./modal-cobertura.component.scss'],
})
export class ModalCoberturaComponent implements OnInit, OnDestroy, AfterViewInit {
  frmGeneral: FormGroup;
  tab1Form: FormGroup;
  tab2Form: FormGroup;
  tab3Form: FormGroup;
  @Input() dynamicSource: Observable<string>;
  @Input() showCloseButton: boolean;
  @Input() primaryButtonText: string;
  @Input() secondaryButtonText: string;
  subscription: Subscription;
  fadeOut: boolean = false;
  isActiveModal: boolean = false;
  hide: boolean = false;
  public idTabActive = 1;
  listCoberturaGeneral: ICoberturaGeneral[] = [];
  selectSiniestro: ISelectSiniestro
  constructor(
    private formBuilder: FormBuilder,
    private viewController: ModalController,
    private siniestroService: SiniestroService,
  ) {
    this.showCloseButton = true;
    this.primaryButtonText = '';
    this.secondaryButtonText = '';

    this.frmGeneral = this.formBuilder.group({
      smcausa: new FormControl(''),
      smcausades: new FormControl(''),
      iddetalledes: new FormControl(''),

    });

    this.tab1Form = this.formBuilder.group({

    });

    this.tab2Form = this.formBuilder.group({
      placa: new FormControl(''),
      Marca: new FormControl(''),
      Modelo: new FormControl(''),
      Anio: new FormControl(''),
      Moneda: new FormControl(''),
      sumaAsegurada: new FormControl(''),
    });

    this.tab3Form = this.formBuilder.group({

    });

    this.dynamicSource = new Observable<string>;
    this.subscription = new Subscription();
  }

  ngAfterViewInit(): void {

  }

  ngOnInit() {
    this.selectSiniestro = JSON.parse(sessionStorage.getItem('selectedSiniestroCob'));
    this.selectSiniestro.Moneda = "Dólares";

    this.loadInit();
  }

  async loadInit() {
    //Spinner_CoberturaGeneral
    var dataCobertura = await
                        this.siniestroService.ComboCoberturaGeneral(this.selectSiniestro.smcausa,
                                                                    this.selectSiniestro.idetallecausa,
                                                                    this.selectSiniestro.idplan)
    this.listCoberturaGeneral = dataCobertura;

    //TraerDcminimo

    //TraerSumaAsegurada

    

    // var flag_ac = 0;
    //         var cobertura = $("#sp_cobergen").val();
    //         if (cobertura == 1) {
    //             if ($("#chkAusenciaControl").is(':checked')) {
    //                 flag_ac = 1;
    //             }
    //             if ($("#chkPerdidaTotal").is(':checked')) {
    //                 flag_ac = 0;
    //             }
    //         } else if (cobertura == 2) {
    //             if ($("#chkAusenciaControl_persona").is(':checked')) {
    //                 flag_ac = 1;
    //             } else {
    //                 flag_ac = 0;
    //             }
    //         } else if (cobertura == 3) {
    //             if ($("#chkAusenciaControl_vo").is(':checked') || $("#chkAusenciaControl_persona").is(':checked')) {
    //                 flag_ac = 1;
    //             } else {
    //                 flag_ac = 0;
    //             }
    //         }
    var flag_ac = 0;
    var cobertura = this.selectSiniestro.smcausa;
    if(cobertura === "1"){

    }

    //var sumaAsegurada = this.siniestroService.TraerSumaAsegurada

  }

  dismissModal() {
    this.viewController.dismiss();
    const second = 300;
    this.fadeOut = true;
    setTimeout(() => {
      this.hide = true;
    }, second);
    this.isActiveModal = false;
  }

  onPrimaryClick() {
    this.viewController.dismiss('primaryButtonPressed');
  }

  // async onSecondaryClick() {
  //     if(this.closeSesion) {
  //       await this.authService.signOut();
  //       this.viewController.dismiss('secondaryButtonPressed');
  //     } else {
  //       this.viewController.dismiss('secondaryButtonPressed');
  //     }
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  evaluarActivo = (idTab: number) => {
    if (idTab == this.idTabActive)
      return true;
    else
      return false;
  }

  establecerActivo = (idTab: number) => {
    this.idTabActive = idTab;
    // if (idTab==3){
    //   this.ListarSeccionesProcuracion();
    // }
  }


}
