import { Component } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
//import { NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SiniestroService } from 'src/app/services/siniestro/siniestro-service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IUserDatos } from 'src/app/common/interfaces/auth.interface';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ISelectedSiniestro } from 'src/app/model/ISelectedSiniestro';
import { CookieService } from 'ngx-cookie-service';

interface ISiniestro {
  TotalRegistros: number;
  idsiniestro: number;
  idsiniestro_ou: string;
  idpoliza: string;
  icodigorenovacion: string;
  planPoliza: string;
  Persona: string;
  vplaca: string;
  dFecRegistro: string;
  semaforo: string;
  analista: string;
  Estado: string;
}

interface IEstado {
  smiddetalle: number;
  vdescripcion: string;
}

@Component({
  selector: 'app-list-siniestro',
  templateUrl: './list-siniestro.component.html',
  styleUrls: ['./list-siniestro.component.scss'],
})


export class ListSiniestroComponent {
  filterForm: FormGroup;
  globalStepTitle: string;
  loading: boolean;
  page = 1;
  pageSize = 1000;
  listSiniestros: ISiniestro[];
  listEstados:IEstado[];
  userdatos: IUserDatos;
  fechaini:any=null;
  fechafin:any=null;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private siniestroService: SiniestroService,
    private authService:AuthService,
    public loadingCtrl: LoadingController,
    public datepipe: DatePipe,
    private router:Router,
    private cookieService: CookieService, 
  ) {
     const today = new Date();
     const ini = today;
     const fin = today;
     this.fechaini = new Date(today).toISOString();
     this.fechafin  = new Date(today).toISOString();

      this.filterForm = this.formBuilder.group({
        idsiniestro: new FormControl(''),
        poliza: new FormControl(''),
        placa: new FormControl(''),
        fechaini: new FormControl(''),
        fechafin: new FormControl(''),
        nombre: new FormControl(''),
        idsemaforo: new FormControl(''),
        icodigorenovacion: new FormControl(''),
        idordenatencion: new FormControl(''),
      });
  }

  async ngOnInit(){
    await this.lista();
  }

  doSomething(date:any) {
    console.log(date); // 2019-04-22
 }

  async lista() {
    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message:'<div class="custom-spinner-container"><div class="custom-spinner-box"></div>Buscando</div>',
    });
    loading.present();
    this.userdatos = this.authService.getSessionToken();
    let userperfil= this.cookieService.get("userperfil");
    let idsemaforo = this.filterForm.value.idsemaforo==""?"0":this.filterForm.value.idsemaforo;    
    let fechaIni = this.datepipe.transform(this.fechaini, 'yyyy-MM-dd')??"";
    let fechaFin = this.datepipe.transform(this.fechafin, 'yyyy-MM-dd')??"";
    
    await this.siniestroService.listado(this.filterForm.value.idsiniestro,this.filterForm.value.poliza
                                                              ,this.filterForm.value.placa,fechaIni
                                                              ,fechaFin,this.filterForm.value.nombre
                                                              ,idsemaforo,userperfil,this.userdatos.contra
                                                              ,this.filterForm.value.icodigorenovacion,this.filterForm.value.idordenatencion
                                                              , this.page.toString(), this.pageSize.toString())
                                                              .then(res => {
                                                                this.listSiniestros = res;
                                                                loading.dismiss();; })
                                                              .catch(error => { 
                                                                loading.dismiss();
                                                                console.log(error); 
                                                              });    
  }


  keyPressNumber(event: any) {
    const pattern = /[0-9]$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  async ngAfterViewInit() {
    this.loading = true;
  }
  ionViewWillEnter() {
    //this.externalForm.setupFormPage();
  }
  public goBack(): void {
    // if (this.customBackEvent) {
    //   this.backButtonClick.emit();
    // } else {
    this.location.back();
  }
  modSiniestro(edit: boolean, idsiniestro: string = '',icodigorenovacion:string='') {
    const selectedSiniestro = new ISelectedSiniestro();
    selectedSiniestro.editsiniestro = edit;
    selectedSiniestro.idsiniestro = idsiniestro;
    selectedSiniestro.icodigorenovacion = icodigorenovacion;
    sessionStorage.setItem('selectedSiniestro', JSON.stringify(selectedSiniestro));
    this.router.navigate(['home/modsiniestros']);
  }
}
