import { Component, Inject } from '@angular/core';
import { DatePipe, DOCUMENT, Location } from '@angular/common';
import { SiniestroService } from 'src/app/services/siniestro/siniestro-service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IUserDatos } from 'src/app/common/interfaces/auth.interface';
import { LoadingController, ModalController } from '@ionic/angular';
import { ISelectSiniestro } from 'src/app/model/ISelectSiniestro';
import { IImagenProcuracion, IReserva, ISeccionProcuracion, ISelectedSiniestro, ISelectedSiniestroCobertura } from 'src/app/model/ISelectedSiniestro';
import { IEstadoSiniestro } from 'src/app/model/IEstadoSiniestro';
import { IUsuario } from 'src/app/model/IUsuario';
import { ICombo } from 'src/app/model/ICommon';
import { IAnalista, IAseguradora, ICausa, ICobertura, ICoberturaGeneral, IComisaria, IConsecuencia, IDatoSiniestro, IDetalleCausa, IParentesco, ITipoDeclarante, ITipoDocumento, IDeducibleMultiple, IVerificarPersonaCobertura, ISumaAsegurada, IDcminimo } from 'src/app/model/ISiniestro';
import { environment } from 'src/environments/environment';
import { NgxImageCompressService } from 'ngx-image-compress';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';


interface IUbigeos {
  smidubigeo: string;
  vdescripcion: string;
}


@Component({
  selector: 'app-mod-siniestro',
  templateUrl: './mod-siniestro.component.html',
  styleUrls: ['./mod-siniestro.component.scss'],
})

export class ModSiniestroComponent {
  sizeOfOriginalImage:number
  imgResultAfterCompress:string;
  localCompressedURl:any;
  sizeOFCompressedImage:number;

  tab1Form: FormGroup;
  tab2Form: FormGroup;
  tab3Form: FormGroup;
  coberturaModalForm: FormGroup;
  coberturaModalTab1Form: FormGroup;
  coberturaModalTab2Form: FormGroup;
  coberturaModalTab3Form: FormGroup;
  imageUrl: string;
  imageFormat: string;
  public selectedFile: File = null;
  globalStepTitle: string;
  selectedSiniestro: ISelectedSiniestro;
  listEstadoSiniestro: IEstadoSiniestro[] = [];
  listImgProcuracion: IImagenProcuracion[] = [];
  listSeccionProcuracion: ISeccionProcuracion[] = [];
  listAsesores: IUsuario[] = [];
  listAsesoresP: IUsuario[] = [];
  listSemaforo: ICombo[] = [
    { value: '1', description: 'VERDE' },
    { value: '2', description: 'AMARILLO' },
    { value: '3', description: 'ROJO' }
  ];
  listGravedad: ICombo[] = [
    { value: '1', description: 'LEVE' },
    { value: '2', description: 'MODERADA' },
    { value: '3', description: 'GRAVE' },
    { value: '4', description: 'COMPLEJA' }

  ];
  listTipoAsesoria: ICombo[] = [
    { value: '1', description: 'VIRTUAL' },
    { value: '2', description: 'PRESENCIAL' },
  ];
  listCausa: ICausa[] = [];
  listDetalleCausa: IDetalleCausa[] = [];
  listConsecuencia: IConsecuencia[] = [];
  listAnalista: IAnalista[] = [];
  listAseguradora: IAseguradora[] = [];
  listTipoDeclarante: ITipoDeclarante[] = [];
  listTipoDocumento: ITipoDocumento[] = [];
  listParentesco: IParentesco[] = [];
  listComisaria: IComisaria[] = [];
  listCobertura: ICobertura[] = [];
  listReserva: IReserva[] = [];
  loading: boolean;
  userdatos: IUserDatos;
  selectSiniestro: ISelectSiniestro;
  selectDatoSiniestro: IDatoSiniestro;
  listCoberturaModalGeneral: ICoberturaGeneral[] = [];
  listDeducibleMultiple: IDeducibleMultiple[] = [];
  listPersonaCobertura: IVerificarPersonaCobertura[] = [];
  listSumaAsegurada: ISumaAsegurada[] = [];
  listDcminimo: IDcminimo[] = [];
  listLugarVehiculo: ITipoDocumento[] = [];
  listTrasladoPaciente: ITipoDocumento[] = [];
  listParentescoCob: ITipoDocumento[] = [];
  listTipoMoneda: ITipoDocumento[] = [];
  selectedEstadoSiniestro = "";
  vubigeolist: boolean = false;
  vcomisarialist: boolean = false;
  ubigeo: IUbigeos[];
  public idTabActive = 1;
  public idseccionActive = 0;
  public idCoberturaModalTabActive = 2;
  existecobertura = false;
  disabledNuevaOT = false;
  isEdit: boolean = true;
  showCobertura: boolean = false;
  showCoberturaReserva: boolean = false;
  readOnlyReservaInicial: boolean = false;
  chkAusenciaControl: boolean = false;
  visiblePerdidaTotal: boolean = true;
  visibleObservacionesCober: boolean = false;
  disabledflagAseguradoP: boolean = false;
  disabledflagConductorP: boolean = false;
  svencilicenciaMaxDate:string = "";
  changeList: boolean=false;
  fechaini:any=null;
  fechafin:any=null;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private formBuilder: FormBuilder,
    private location: Location,
    private siniestroService: SiniestroService,
    private authService: AuthService,
    public loadingCtrl: LoadingController,
    public datepipe: DatePipe,
    private http: HttpClient,
    private imageCompress: NgxImageCompressService
  ) {
    this.selectedSiniestro = JSON.parse(sessionStorage.getItem('selectedSiniestro')); //localStorage.getItem('selectedidsiniestro') as ISelectedSiniestro;
    this.selectSiniestro = new ISelectSiniestro();
    this.selectDatoSiniestro = new IDatoSiniestro();
    this.isEdit = this.selectedSiniestro.editsiniestro;
    this.tab1Form = this.formBuilder.group({
      idpoliza: new FormControl(''),
      placa: new FormControl(''),
      vigencia: new FormControl(''),
      planPoliza: new FormControl(''),
      nidusuario: new FormControl(''),
      idprocurador: new FormControl(''),
      dUser: new FormControl(''),
      estadopoliza: new FormControl(''),
      iestadosiniestro: new FormControl({value:"", disabled: !this.isEdit}),
      dFecCambioEstado: new FormControl(''),
      dFecNotificacion: new FormControl(''),
      dFecRegistro: new FormControl(''),
      dFecModificacion: new FormControl(''),

      idgravedad: new FormControl("",[Validators.required]),
      iocupantes: new FormControl(''),
      dFecOcurrencia: new FormControl('',[Validators.required]),
      smcausa: new FormControl({value:"", disabled: !this.isEdit}),
      idetallecausa: new FormControl({value:"", disabled: !this.isEdit}),
      idconsecuencia: new FormControl({value:"", disabled: !this.isEdit}),
      vlugarsiniestro: new FormControl('',[Validators.required]),
      smidubigeo: new FormControl('',[Validators.required]),
      vdescripcionubi: new FormControl(''),
      idanalista: new FormControl({value:"", disabled: !this.isEdit}, [Validators.required]),
      idaseguradora: new FormControl({value:"", disabled: !this.isEdit}),
      idsemaforo: new FormControl({value:"", disabled: !this.isEdit}, [Validators.required]),

      idtipo_decla: new FormControl({value:"", disabled: !this.isEdit}),
      idtipo_docid_decla: new FormControl({value:"", disabled: !this.isEdit}, [Validators.required]),
      idnrodoc_decla: new FormControl('', [Validators.required]),
      vapellidopat_decla: new FormControl(''),
      vapellidomat_decla: new FormControl(''),
      vnombres_decla: new FormControl(''),
      iparentaseg_declarante: new FormControl({value:"", disabled: !this.isEdit}),
      vmaildeclarante: new FormControl(''),
      vtelef_declarante: new FormControl(''),

      idtipo_conduc: new FormControl({value:"", disabled: !this.isEdit}),
      idtipo_docid_conduc: new FormControl({value:"", disabled: !this.isEdit}),
      idnrodoc_conduc: new FormControl(''),
      vapellidopat_conduc: new FormControl(''),
      vapellidomat_conduc: new FormControl(''),
      vnombres_conduc: new FormControl(''),
      iparentaseg_conductor: new FormControl({value:"", disabled: !this.isEdit}),
      vemail_conductor: new FormControl(''),
      vtelef_conductor: new FormControl(''),
      vlicencia: new FormControl(''),
      dvencilicencia: new FormControl(''),
      vcategoria: new FormControl(''),

      idcomisaria: new FormControl({value:"", disabled: !this.isEdit}),
      vdescripcioncomi: new FormControl(''),
      dFecDenunciaP: new FormControl(''),
      vdetasiniestro: new FormControl('', [Validators.required]),
      Persona: new FormControl(''),
      Clase: new FormControl(''),
      Marca: new FormControl(''),
      Modelo: new FormControl(''),
      Vin: new FormControl(''),
      Anio: new FormControl(''),
      Uso: new FormControl('PARTICULAR'),
      Asientos: new FormControl(''),
      Kilometraje: new FormControl(''),
    });

    this.tab2Form = this.formBuilder.group({
      analista: new FormControl(''),
      Asientos: new FormControl(''),
      iocupantes: new FormControl(''),
      smcausades: new FormControl(''),
      iddetalledes: new FormControl(''),
    });

    this.tab3Form = this.formBuilder.group({
      hechosSiniestros: new FormControl(''),
      apreciacionSiniestros: new FormControl(''),
      dfechaReporteProc: new FormControl(''),
      dfechaInicioProc: new FormControl(''),
      dfechaFinProc: new FormControl(''),
      dfechaAsignacion: new FormControl(''),
      idprocurador: new FormControl({value:"", disabled: !this.isEdit}),
      dtipoasesoria: new FormControl({value:"", disabled: !this.isEdit}),
      dkilometraje: new FormControl(''),
      descripcionimagen: new FormControl(''),
      descripcionseccion: new FormControl(''),
    });

    this.coberturaModalForm = this.formBuilder.group({
      smcausageneral: new FormControl(''),
      smcausa: new FormControl(''),
      smcausades: new FormControl(''),
      iddetalledes: new FormControl(''),
    });

    this.coberturaModalTab1Form = this.formBuilder.group({
      personaPC: new FormControl(''),
      chkflagAseguradoP: new FormControl(''),
      chkflagConductorP: new FormControl(''),
      fecFallPersonaCob: new FormControl(''),
      lugarVehPersonaCob: new FormControl(''),
      trasPacientePersonaCob: new FormControl(''),
      parentescoPersonaCob: new FormControl({value:"", disabled: !this.isEdit}),
      costoPerPersonacob: new FormControl(''),
      auditor: new FormControl(''),
      tipMonedaRegP: new FormControl(''),
      sumaAseguradaP: new FormControl(''),
      deduciminregP: new FormControl(''),
      deduregP: new FormControl(''),
      reseriniregP: new FormControl(''),
      estadoPersonaCob: new FormControl(''),
      observacionesCober: new FormControl(''),
    });

    this.coberturaModalTab2Form = this.formBuilder.group({
      smcausageneral: new FormControl(''),
      placa: new FormControl(''),
      Marca: new FormControl(''),
      Modelo: new FormControl(''),
      Anio: new FormControl(''),
      Moneda: new FormControl(''),
      sumaAsegurada: new FormControl(''),
      iddeduciblemulti: new FormControl(''),
      estadocob: new FormControl(''),
      dcminimo: new FormControl(''),
      porcentajeDedu: new FormControl(''),
      reserinireg: new FormControl(''),
      perdidaTotal: new FormControl(''),
    });

    this.coberturaModalTab3Form = this.formBuilder.group({
      // hechosSiniestros: new FormControl(''),
      // apreciacionSiniestros: new FormControl(''),
      // dfechaReporteProc: new FormControl(''),
      // dfechaInicioProc: new FormControl(''),
      // dfechaFinProc: new FormControl(''),
      // dfechaAsignacion: new FormControl(''),
      // idprocurador: new FormControl(''),
      // dtipoasesoria: new FormControl(''),
      // dkilometraje: new FormControl(''),
      // descripcionimagen: new FormControl(''),
      // descripcionseccion: new FormControl(''),
    });
    const dvencilicenciaMaxDate = new Date();
    
    dvencilicenciaMaxDate.setFullYear(dvencilicenciaMaxDate.getFullYear() + 10);
    this.svencilicenciaMaxDate=dvencilicenciaMaxDate.toISOString();
    const today = new Date();
    this.fechaini = new Date(today).toISOString();
    this.fechafin  = new Date(today).toISOString();
  }

  ngOnInit(): void {
    this.vubigeolist = false;
    this.vcomisarialist = false;
    this.loadTab1();
  }

  async loadTab1() {
    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: '<div class="custom-spinner-container"><div class="custom-spinner-box"></div>Buscando</div>',
    });

    var dataEstadoCobertura = await this.siniestroService.ListarEstadoCobertura()
    // .subscribe(async (data: IEstadoSiniestro[]) => {
    this.listEstadoSiniestro = dataEstadoCobertura;
    // });

    var dataUsuario = await this.siniestroService.Combo_Usuario()
    //.subscribe(async (data: IUsuario[]) => {
    this.listAsesores = dataUsuario;
    //});

    var cbCausa = await this.siniestroService.Combo_Causa();
    //.subscribe(async (data: ICausa[]) => {
    this.listCausa = cbCausa;
    //});

    var Combo_Consecuencia = await this.siniestroService.Combo_Consecuencia()
    // .subscribe(async (data: IConsecuencia[]) => {
    this.listConsecuencia = Combo_Consecuencia;
    // });

    var AutocompletarAnalista = await this.siniestroService.AutocompletarAnalista()
    // .subscribe(async (data: IAnalista[]) => {
    this.listAnalista = AutocompletarAnalista;
    // });

    var ListarSeguroSOAT = await this.siniestroService.ListarSeguroSOAT()
    // .subscribe(async (data: IAseguradora[]) => {
    this.listAseguradora = ListarSeguroSOAT;
    // });

    var Combo_TipoDeclarante = await this.siniestroService.Combo_TipoDeclarante()
    // .subscribe(async (data: ITipoDeclarante[]) => {
    this.listTipoDeclarante = Combo_TipoDeclarante;
    // });

    var ListarTipoDocumento = await this.siniestroService.ListarTipoDocumento()
    // .subscribe(async (data: ITipoDocumento[]) => {
    this.listTipoDocumento = ListarTipoDocumento;
    // });

    var Combo_Parentesco = await this.siniestroService.Combo_Parentesco()
    // .subscribe(async (data: IParentesco[]) => {
    this.listParentesco = Combo_Parentesco;
    // });



    var ListarDatosSiniestro = await this.siniestroService.ListarDatosSiniestro(this.selectedSiniestro.idsiniestro, this.selectedSiniestro.icodigorenovacion)
    // .subscribe(async (data: IDatoSiniestro[]) => {
    this.selectDatoSiniestro = ListarDatosSiniestro[0];
    // });

    var ListarLugarVehiculo = await this.siniestroService.ComboLugarVehiculo()
    // .subscribe(async (data: ITipoDocumento[]) => {
    this.listLugarVehiculo = ListarLugarVehiculo;


    var ListarTrasladoPaciente = await this.siniestroService.ComboTrasladoPaciente()
    // .subscribe(async (data: ITipoDocumento[]) => {
    this.listTrasladoPaciente = ListarTrasladoPaciente;

    var ComboParentesco = await this.siniestroService.ComboParentesco()
    // .subscribe(async (data: IParentesco[]) => {
    this.listParentescoCob = ComboParentesco;

    var dataUsuarioP = await this.siniestroService.Combo_UsuarioP()
    this.listAsesoresP = dataUsuarioP;

    var dataMoneda = await this.siniestroService.ListarTipoMoneda()
    this.listTipoMoneda = dataMoneda;


    //Inicio: Cobertura
    sessionStorage.removeItem('valorEditable');
    sessionStorage.removeItem('DatoCobertura');

    var ListarCobertura = await this.siniestroService.ListarCobertura(this.selectedSiniestro.idsiniestro);
    this.listCobertura = ListarCobertura;

    var listCoberturaEstado = this.listCobertura.filter(c => c.estado == "Aperturado" || c.estado == "Aprobado");

    this.existecobertura = false;
    if (listCoberturaEstado.length > 0) {
      this.existecobertura = true;
    }


    if (this.listCobertura.length > 0) {
      // Enable #x
      this.disabledNuevaOT = true;
    } else {
      // Disable #x
      this.disabledNuevaOT = false;
      sessionStorage.setItem('valorEditable', 'disabled');
    }

    if (this.existecobertura) {
      // $('#sp_Causa').prop("disabled", true);
      // $('#sp_DetalleCausa').prop("disabled", true);
      // $('#sp_Consecuencia').prop("disabled", true);
    } else {
      // $('#sp_Causa').prop("disabled", false);
      // $('#sp_DetalleCausa').prop("disabled", false);
      // $('#sp_Consecuencia').prop("disabled", false);
    }
    //Fin: Cobertura

    loading.present();

    await this.siniestroService.SelectSiniestro(this.selectedSiniestro.idsiniestro, this.selectedSiniestro.icodigorenovacion).then((data: any) => {
      loading.dismiss();
      if (this.selectedSiniestro.editsiniestro) {
        //Fecha del Sistema
        data[0].dFecModificacion = new Date(); //moment(new Date()).format(DateFormats.Format01);
        data[0].Uso = "PARTICULAR";
      } else {
        data[0].dFecModificacion = data[0].dFecModificacion;
      }

      /* Traer el nombre del codigo de usuario-----*/
      var codigoUser = data[0].dUser;
      if (codigoUser == '1') {
        data[0].dUser = 'qualitat';
      }

      this.selectSiniestro = data[0];
      this.selectSiniestro.descripcionseccion = "";
      this.tab1Form.get("dFecOcurrencia").setValue(this.selectSiniestro.dFecOcurrencia);      
      //this.tab1Form.get("dFecDenunciaP").setValue(this.selectSiniestro.dFecDenunciaP);      
      debugger
      this.selectSiniestro.dfechaReporteProc=this.selectSiniestro.dfechaReporteProc==""?this.fechaini:this.selectSiniestro.dfechaReporteProc;
      this.selectSiniestro.dfechaInicioProc=this.selectSiniestro.dfechaInicioProc==""?this.fechaini:this.selectSiniestro.dfechaInicioProc;
      this.selectSiniestro.dfechaFinProc=this.selectSiniestro.dfechaFinProc==""?this.fechaini:this.selectSiniestro.dfechaFinProc;

      
    });
  }

  doSomething(event: any) {
    //console.log(event); // 2019-04-22
    //event.close();
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
    // }
  }
  establecerActivo = (idTab: number) => {
    this.idTabActive = idTab;
    if (idTab == 3) {
      this.actualizartab1Automatico();;
      this.ListarSeccionesProcuracion();
    }else if (idTab == 1) {
      this.actualizartab3Automatico();
    }else if (idTab == 2) {
      this.actualizartab1Automatico();;
      this.actualizartab3Automatico();
    }
  }

  evaluarActivo = (idTab: number) => {
    if (idTab == this.idTabActive)
      return true;
    else
      return false;
  }

  async getDetalleCausa(causa: any) {
    if (causa === "")
      return;

    var Combo_DetalleCausa = await this.siniestroService.Combo_DetalleCausa(causa, this.selectSiniestro.idpoliza);
    // .subscribe(async (data: IDetalleCausa[]) => {
    this.listDetalleCausa = Combo_DetalleCausa;
    //  });
  }

  async actualizartab1() {  
    if (this.tab1Form.valid){
  
      const loading = await this.loadingCtrl.create({
        spinner: 'bubbles',
        message: '<div class="custom-spinner-container"><div class="custom-spinner-box"></div>Actualizando</div>',
      });
      loading.present();
      this.userdatos = this.authService.getSessionToken();   

      await this.siniestroService.ActualizaSiniestro(
        this.selectSiniestro.idsiniestro,
        this.selectSiniestro.idpoliza,
        this.selectSiniestro.icodigorenovacion,
        this.selectSiniestro.idvehiculo,
        "1",//this.selectSiniestro.idaseguradora,
        this.selectSiniestro.iestadosiniestro,
        this.datepipe.transform(this.selectSiniestro.dFecNotificacion, 'yyyy-MM-dd'),//this.selectSiniestro.dFecNotificacion,
        this.datepipe.transform(this.selectSiniestro.dFecNotificacion, 'HH:mm'),//this.selectSiniestro.dHoraNotificacion,
        this.datepipe.transform(this.selectSiniestro.dFecRegistro, 'yyyy-MM-dd'),//this.selectSiniestro.dFecRegistro,
        this.datepipe.transform(this.selectSiniestro.dFecRegistro, 'HH:mm'),//this.selectSiniestro.dHoraRegistro,
        this.datepipe.transform(this.selectSiniestro.dFecModificacion, 'yyyy-MM-dd'),//this.selectSiniestro.dFecModifi,
        this.datepipe.transform(this.selectSiniestro.dFecModificacion, 'HH:mm'),//this.selectSiniestro.dHoraModifi,
        this.selectSiniestro.idconsecuencia,
        this.datepipe.transform(this.selectSiniestro.dFecOcurrencia, 'yyyy-MM-dd'),//this.selectSiniestro.dFecOcurrencia,
        this.datepipe.transform(this.selectSiniestro.dFecOcurrencia, 'HH:mm'),//this.selectSiniestro.dHoraOcurrencia,
        this.selectSiniestro.vlugarsiniestro,
        this.selectSiniestro.iocupantes,
        this.selectSiniestro.vtelef_declarante,
        this.selectSiniestro.iparentaseg_declarante,
        this.selectSiniestro.vmaildeclarante,
        this.selectSiniestro.vlicencia,
        this.selectSiniestro.iparentaseg_conductor,
        this.selectSiniestro.vtelef_conductor,
        this.selectSiniestro.vemail_conductor,
        this.datepipe.transform(this.selectSiniestro.dvencilicencia, 'yyyy-MM-dd'),//this.selectSiniestro.dvencilicencia,
        this.selectSiniestro.idcomisaria,
        this.selectSiniestro.vcategoria,
        this.selectSiniestro.vdetasiniestro,
        this.selectSiniestro.nidusuario,
        this.selectSiniestro.idgravedad,
        this.selectSiniestro.smcausa,
        this.selectSiniestro.idetallecausa,
        this.selectSiniestro.idtipo_decla,
        this.selectSiniestro.idtipo_docid_decla,
        this.selectSiniestro.idnrodoc_decla,
        this.selectSiniestro.vnombres_decla,
        this.selectSiniestro.vapellidopat_decla,
        this.selectSiniestro.vapellidomat_decla,
        this.selectSiniestro.idtipo_conduc,
        this.selectSiniestro.idtipo_docid_conduc,
        this.selectSiniestro.idnrodoc_conduc,
        this.selectSiniestro.vnombres_conduc,
        this.selectSiniestro.vapellidopat_conduc,
        this.selectSiniestro.vapellidomat_conduc,
        this.selectSiniestro.smidubigeo,
        this.datepipe.transform(this.selectSiniestro.dFecDenunciaP, 'yyyy-MM-dd'),//this.selectSiniestro.dFecDenunciaP,
        this.datepipe.transform(this.selectSiniestro.dFecDenunciaP, 'HH:mm'),//this.selectSiniestro.dHoraDenunciaP,
        //this.selectSiniestro.dFecCambioEstado,
        this.datepipe.transform(this.selectSiniestro.dFecCambioEstado, 'yyyy-MM-dd'),//this.selectSiniestro.dFecDenunciaP,
        "",//,this.selectSiniestro.dUserAprobado,
        this.selectSiniestro.idanalista,//this.selectSiniestro.smidanalista,
        this.selectSiniestro.idaseguradora,
        this.userdatos.usuario,
        this.selectDatoSiniestro.idsemaforo.toString(),
        this.userdatos.usuario,
        "0.0.0.0"//this.selectSiniestro.ip
      ).then(async (data: any) => {
        loading.dismiss();
        var respuesta = data[0].respuesta;
        var estado = data[0].estado;
        var ultimoEstado = data[0].ultimoEstado;      
        if (respuesta == "true") {
          alert("Los datos del Siniestro se actualizaron Sastifactoriamente")
        } else if (respuesta == "estadoInco") {
          if (estado==5) {
            //si quiere actualizar con estado CERRADO
            alert('El siniestro solo puede ser modificado a : Aprobado  o Rechazado');

            } else if (ultimoEstado == 6) {
                alert('El siniestro REAPERTURADO solo puede ser modificado a estado :  APROBADO O RECHAZADO ');
            } else if (ultimoEstado == 3) {
                alert('El siniestro RECHAZADO solo puede ser modificado a estado :  APROBADO O CERRADO ');
            } else if (ultimoEstado == 5) {
                alert('El Estado CERRADO solo puede ser modificado a Estado: REAPERTURADO');
            } else if (ultimoEstado == 2) {
                alert('El siniestro APROBADO solo puede  ser modificado a estado: RECHAZADO , DESISTIDO O APROBADO ');
            } else {
                alert('Debe ser usuario administrador para realizar la modificación.');
            }

        } else if (respuesta == "estadoRechazadoOTCG_Liq") {
            alert('No se puede actualizar el Siniestro porque existen OT/CG es estado Liquidado');

        } else if (respuesta == "estadoRechazadoOTCG_Pag") {
            alert('No se puede actualizar el Siniestro porque existen OT/CG es estado Pagado');

        } else if (respuesta == "vigenciaInco") {
            alert('No se puede actualizar el Siniestro por la fecha de Vigencia de la Poliza');
        }else if (respuesta == "estadoDesistido") {
            alert('El Estado DESESTIMADO no puede ser modificado.');
        } else if (respuesta == "estadoCerrradoOTCG_Aprob") {
            alert('No se puede actualizar el Siniestro porque existen OT/CG es estado Aprobado');
        }else {
            alert("Hubo un error al actualizar Datos");
        }      
      }).catch(error => { 
        loading.dismiss();
        alert("Hubo un error al actualizar Datos");
      }); 
    }else{
      alert('Debe completar los datos');
    }
  }

  async actualizartab1Automatico() {  
    if (this.tab1Form.valid){
      this.userdatos = this.authService.getSessionToken();   

      await this.siniestroService.ActualizaSiniestro(
        this.selectSiniestro.idsiniestro,
        this.selectSiniestro.idpoliza,
        this.selectSiniestro.icodigorenovacion,
        this.selectSiniestro.idvehiculo,
        "1",//this.selectSiniestro.idaseguradora,
        this.selectSiniestro.iestadosiniestro,
        this.datepipe.transform(this.selectSiniestro.dFecNotificacion, 'yyyy-MM-dd'),//this.selectSiniestro.dFecNotificacion,
        this.datepipe.transform(this.selectSiniestro.dFecNotificacion, 'HH:mm'),//this.selectSiniestro.dHoraNotificacion,
        this.datepipe.transform(this.selectSiniestro.dFecRegistro, 'yyyy-MM-dd'),//this.selectSiniestro.dFecRegistro,
        this.datepipe.transform(this.selectSiniestro.dFecRegistro, 'HH:mm'),//this.selectSiniestro.dHoraRegistro,
        this.datepipe.transform(this.selectSiniestro.dFecModificacion, 'yyyy-MM-dd'),//this.selectSiniestro.dFecModifi,
        this.datepipe.transform(this.selectSiniestro.dFecModificacion, 'HH:mm'),//this.selectSiniestro.dHoraModifi,
        this.selectSiniestro.idconsecuencia,
        this.datepipe.transform(this.selectSiniestro.dFecOcurrencia, 'yyyy-MM-dd'),//this.selectSiniestro.dFecOcurrencia,
        this.datepipe.transform(this.selectSiniestro.dFecOcurrencia, 'HH:mm'),//this.selectSiniestro.dHoraOcurrencia,
        this.selectSiniestro.vlugarsiniestro,
        this.selectSiniestro.iocupantes,
        this.selectSiniestro.vtelef_declarante,
        this.selectSiniestro.iparentaseg_declarante,
        this.selectSiniestro.vmaildeclarante,
        this.selectSiniestro.vlicencia,
        this.selectSiniestro.iparentaseg_conductor,
        this.selectSiniestro.vtelef_conductor,
        this.selectSiniestro.vemail_conductor,
        this.datepipe.transform(this.selectSiniestro.dvencilicencia, 'yyyy-MM-dd'),//this.selectSiniestro.dvencilicencia,
        this.selectSiniestro.idcomisaria,
        this.selectSiniestro.vcategoria,
        this.selectSiniestro.vdetasiniestro,
        this.selectSiniestro.nidusuario,
        this.selectSiniestro.idgravedad,
        this.selectSiniestro.smcausa,
        this.selectSiniestro.idetallecausa,
        this.selectSiniestro.idtipo_decla,
        this.selectSiniestro.idtipo_docid_decla,
        this.selectSiniestro.idnrodoc_decla,
        this.selectSiniestro.vnombres_decla,
        this.selectSiniestro.vapellidopat_decla,
        this.selectSiniestro.vapellidomat_decla,
        this.selectSiniestro.idtipo_conduc,
        this.selectSiniestro.idtipo_docid_conduc,
        this.selectSiniestro.idnrodoc_conduc,
        this.selectSiniestro.vnombres_conduc,
        this.selectSiniestro.vapellidopat_conduc,
        this.selectSiniestro.vapellidomat_conduc,
        this.selectSiniestro.smidubigeo,
        this.datepipe.transform(this.selectSiniestro.dFecDenunciaP, 'yyyy-MM-dd'),//this.selectSiniestro.dFecDenunciaP,
        this.datepipe.transform(this.selectSiniestro.dFecDenunciaP, 'HH:mm'),//this.selectSiniestro.dHoraDenunciaP,
        //this.selectSiniestro.dFecCambioEstado,
        this.datepipe.transform(this.selectSiniestro.dFecCambioEstado, 'yyyy-MM-dd'),//this.selectSiniestro.dFecDenunciaP,
        "",//,this.selectSiniestro.dUserAprobado,
        this.selectSiniestro.idanalista,//this.selectSiniestro.smidanalista,
        this.selectSiniestro.idaseguradora,
        this.userdatos.usuario,
        this.selectDatoSiniestro.idsemaforo.toString(),
        this.userdatos.usuario,
        "0.0.0.0"//this.selectSiniestro.ip
      ).then(async (data: any) => {
        var respuesta = data[0].respuesta;
        var estado = data[0].estado;
        var ultimoEstado = data[0].ultimoEstado;      
        if (respuesta == "true") {
          //alert("Los datos del Siniestro se actualizaron Sastifactoriamente")
        } else if (respuesta == "estadoInco") {
          this.establecerActivo(1);
          if (estado==5) {
            //si quiere actualizar con estado CERRADO
            alert('El siniestro solo puede ser modificado a : Aprobado  o Rechazado');

            } else if (ultimoEstado == 6) {
                alert('El siniestro REAPERTURADO solo puede ser modificado a estado :  APROBADO O RECHAZADO ');
            } else if (ultimoEstado == 3) {
                alert('El siniestro RECHAZADO solo puede ser modificado a estado :  APROBADO O CERRADO ');
            } else if (ultimoEstado == 5) {
                alert('El Estado CERRADO solo puede ser modificado a Estado: REAPERTURADO');
            } else if (ultimoEstado == 2) {
                alert('El siniestro APROBADO solo puede  ser modificado a estado: RECHAZADO , DESISTIDO O APROBADO ');
            } else {
                alert('Debe ser usuario administrador para realizar la modificación.');
            }

        } else if (respuesta == "estadoRechazadoOTCG_Liq") {
          this.establecerActivo(1);
            alert('No se puede actualizar el Siniestro porque existen OT/CG es estado Liquidado');
        } else if (respuesta == "estadoRechazadoOTCG_Pag") {
          this.establecerActivo(1);
            alert('No se puede actualizar el Siniestro porque existen OT/CG es estado Pagado');
        } else if (respuesta == "vigenciaInco") {
          this.establecerActivo(1);
            alert('No se puede actualizar el Siniestro por la fecha de Vigencia de la Poliza');
        }else if (respuesta == "estadoDesistido") {
          this.establecerActivo(1);
            alert('El Estado DESESTIMADO no puede ser modificado.');
        } else if (respuesta == "estadoCerrradoOTCG_Aprob") {
          this.establecerActivo(1);
            alert('No se puede actualizar el Siniestro porque existen OT/CG es estado Aprobado');
        }else {
          this.establecerActivo(1);
            alert("Hubo un error al actualizar Datos");
        }
        
      }).catch(error => {         
        //alert("Hubo un error al actualizar Datos");
        this.establecerActivo(1);
      }); 
    }else{
      this.establecerActivo(1);
      alert('Debe completar los datos');
    }
  }

  async reportePDF(oginInfo: ISelectSiniestro) {
    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: '<div class="custom-spinner-container"><div class="custom-spinner-box"></div>Actualizando</div>',
    });
    loading.present();

    window.open(environment.BASE_BACKEND_WORKER + "/Services/PDF_ReporteSiniestro?idsiniestro=" + this.selectSiniestro.idsiniestro);

    //this.selectedSiniestro = JSON.parse(sessionStorage.getItem('selectedSiniestro'));
    //this.http.get(environment.BASE_BACKEND_WORKER + "/Services/PDF_ReporteSiniestro?idsiniestro=" + this.selectSiniestro.idsiniestro, { responseType: 'blob' }).subscribe(blob => {
      loading.dismiss();
      // saveAs(blob,"RepSiniestro_"+this.selectSiniestro.idsiniestro+".pdf");
      //});
  }

  cerrartab1(loginInfo: ISelectSiniestro) {
    this.location.back();
  }

  async PDFProcuracion(oginInfo: ISelectSiniestro) {   
    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: '<div class="custom-spinner-container"><div class="custom-spinner-box"></div>Actualizando</div>',
    });
    loading.present();
    window.open(environment.BASE_BACKEND_WORKER + "/Services/PDFProcuracion?idsiniestro=" + this.selectSiniestro.idsiniestro);
    // this.selectedSiniestro = JSON.parse(sessionStorage.getItem('selectedSiniestro'));
    // this.http.get(environment.BASE_BACKEND_WORKER + "/Services/PDFProcuracion?idsiniestro=" + this.selectSiniestro.idsiniestro, { responseType: 'blob' }).subscribe(blob => {
      loading.dismiss();
      //  saveAs(blob,"Procuracion"+this.selectSiniestro.idsiniestro+".pdf");
      // });
  }

  async actualizartab3() {
    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: '<div class="custom-spinner-container"><div class="custom-spinner-box"></div>Actualizando</div>',
    });
    try {
      loading.present();
      debugger
      var data = await this.siniestroService.ActualizarProcuracion(
        this.selectSiniestro.idsiniestro,
        this.selectDatoSiniestro.hechosSiniestros,
        this.selectDatoSiniestro.apreciacionSiniestros,
        this.datepipe.transform(this.selectSiniestro.dfechaReporteProc, 'yyyy-MM-dd'),//this.selectSiniestro.dFecNotificacion,
        this.datepipe.transform(this.selectSiniestro.dfechaReporteProc, 'HH:mm'),//this.selectSiniestro.dHoraNotificacion,
        this.datepipe.transform(this.selectSiniestro.dfechaInicioProc, 'yyyy-MM-dd'),//this.selectSiniestro.dFecNotificacion,
        this.datepipe.transform(this.selectSiniestro.dfechaInicioProc, 'HH:mm'),//this.selectSiniestro.dHoraNotificacion,
        this.datepipe.transform(this.selectSiniestro.dfechaFinProc, 'yyyy-MM-dd'),//this.selectSiniestro.dFecNotificacion,
        this.datepipe.transform(this.selectSiniestro.dfechaFinProc, 'HH:mm'),//this.selectSiniestro.dHoraNotificacion,
        this.selectSiniestro.dtipoasesoria,
        this.selectSiniestro.dkilometraje,
        this.datepipe.transform(this.selectSiniestro.dfechaAsignacion, 'yyyy-MM-dd')||"",//this.selectSiniestro.dFecNotificacion,
        this.datepipe.transform(this.selectSiniestro.dfechaAsignacion, 'HH:mm')||"",//this.selectSiniestro.dHoraNotificacion,
        this.selectSiniestro.idprocurador
      );
      var respuesta = data[0].respuesta;
      if (respuesta == "true") {
        alert("Los datos del Procurador se actualizaron Satisfactoriamente")
      } else {
        alert("Hubo un error al actualizar Datos")
      }
      loading.dismiss();
    } catch (error) {
      loading.dismiss();
    }  
  }

  async actualizartab3Automatico() {

    try {
     
      var data = await this.siniestroService.ActualizarProcuracion(
        this.selectSiniestro.idsiniestro,
        this.selectDatoSiniestro.hechosSiniestros,
        this.selectDatoSiniestro.apreciacionSiniestros,
        this.datepipe.transform(this.selectSiniestro.dfechaReporteProc, 'yyyy-MM-dd'),//this.selectSiniestro.dFecNotificacion,
        this.datepipe.transform(this.selectSiniestro.dfechaReporteProc, 'HH:mm'),//this.selectSiniestro.dHoraNotificacion,
        this.datepipe.transform(this.selectSiniestro.dfechaInicioProc, 'yyyy-MM-dd'),//this.selectSiniestro.dFecNotificacion,
        this.datepipe.transform(this.selectSiniestro.dfechaInicioProc, 'HH:mm'),//this.selectSiniestro.dHoraNotificacion,
        this.datepipe.transform(this.selectSiniestro.dfechaFinProc, 'yyyy-MM-dd'),//this.selectSiniestro.dFecNotificacion,
        this.datepipe.transform(this.selectSiniestro.dfechaFinProc, 'HH:mm'),//this.selectSiniestro.dHoraNotificacion,
        this.selectSiniestro.dtipoasesoria,
        this.selectSiniestro.dkilometraje,
        this.datepipe.transform(this.selectSiniestro.dfechaAsignacion, 'yyyy-MM-dd')||"",//this.selectSiniestro.dFecNotificacion,
        this.datepipe.transform(this.selectSiniestro.dfechaAsignacion, 'HH:mm')||"",//this.selectSiniestro.dHoraNotificacion,
        this.selectSiniestro.idprocurador
      );
  
    } catch (error) {
    }  
  }

  async agregarSeccion() {
    if (this.selectSiniestro.descripcionseccion==""){
      alert("Ingrese Nombre de Sección a registrar.")
      return
    }
    var data = await this.siniestroService.InsertarSeccionProcuracion(this.selectSiniestro.idsiniestro, this.selectSiniestro.descripcionseccion)
    if (data == "incompleto") {
      alert("No se pudo registrar. Complete las fotos de la sección anterior.")
    } else if (data == "cantidad") {
      alert("Solo se pueden registrar hasta 5 secciones.")
    }
    await this.ListarSeccionesProcuracion();
  }

  selectFile = (event: any) => {
    if (event.target.files.length === 0) {
      return;
    }
    this.selectedFile = event.target.files[0];      
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event2: any) => {
        this.compressFile(event2.target.result,event.target.files[0].name)
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  async agregarImagen(idseccion: string) {
    if (this.selectedFile == null){
      alert("Seleccione un imagen")
      return false;
    }
    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: '<div class="custom-spinner-container"><div class="custom-spinner-box"></div>Agregando Imagen</div>',
    });
    try {
      let fileSize = this.selectedFile.size;
      var siezekiloByte = fileSize / 1024;

      if (siezekiloByte > 1024) {
        alert("No se puede GUARDAR la imagen porque supera el tamaño de : 01 MB");
        return false;
      }
      var data = await this.siniestroService.GuardarFotoProcuracion(this.selectSiniestro.idsiniestro, this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm'), this.selectSiniestro.descripcionimagen, idseccion);
      loading.dismiss();
      const formData = new FormData();
      //formData.append(data[0].respuesta, this.selectedFile);

      formData.append('file',this.selectedFile, data[0].respuesta);

      this.siniestroService.ResponseGuardarImgProSucces(formData).subscribe((data: any) => {
        loading.dismiss();
        alert('La imagen fue guardada satisfactoriamente');
        this.ListarSeccionesProcuracion();
      },
      err => {
        loading.dismiss();
      });

    } catch (error) {
      loading.dismiss();
      console.log(error);
    }
    return true;
  }

  compressFile(image:any,fileName:any) {
    var orientation = -1;
    this.sizeOfOriginalImage = this.imageCompress.byteCount(image)/(1024*1024);
    console.warn('Size in bytes is now:',  this.sizeOfOriginalImage);

    

    this.imageCompress.compressFile(image, orientation, 50, 50).then(result => {
      this.imgResultAfterCompress = result;
      this.localCompressedURl = result;
      this.sizeOFCompressedImage = this.imageCompress.byteCount(result)/(1024*1024)
      console.warn('Size in bytes after compression:',  this.sizeOFCompressedImage);
      // create file from byte
      //const imageName = fileName;
      // call method that creates a blob from dataUri
      
      this.selectedFile = this.dataURItoFile(this.dataURItoBlob(this.imgResultAfterCompress.split(',')[1]),this.selectedFile.name );
      //imageFile created below is the new compressed file which can be send to API in form data
      //const imageFile = new File([result], imageName, { type: 'image/jpeg' });
    });
  }

  dataURItoFile(blob:any,fileName:any) {
    const file = new File([blob], fileName);

    return file;
}

  dataURItoBlob(dataURI:any) {
      const byteString = window.atob(dataURI);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([int8Array], { type: 'image/jpeg' });
      return blob;
  }

  onBlurUbigeo(){
    setTimeout(() => {
      if (!this.changeList){
        this.vubigeolist = false;
        if (this.selectSiniestro.smidubigeo==null){
          this.selectSiniestro.vdescripcionubi="";
        }
      }  
      this.changeList=false;
    }, 1000);  
  }

  getUbigeo(event: any) {
    this.vubigeolist = true;
    this.selectSiniestro.smidubigeo = null;
    this.siniestroService.ubigeo(event.target.value).subscribe((data: any) => {
      this.ubigeo = data;
    });
  }

  setUbigeo(item: IUbigeos) {
    this.changeList=true;
    this.vubigeolist = false;
    this.selectSiniestro.vdescripcionubi = item.vdescripcion;
    this.selectSiniestro.smidubigeo = item.smidubigeo;
  }

  async getComisaria(event: any) {
    this.vcomisarialist = true;
    this.selectSiniestro.idcomisaria = null;

    await this.siniestroService.Listar_Comisaria(event.target.value).then(res => {
        this.listComisaria = res;        
    }).catch(error => { 
        console.log(error); 
    });    
  }
  onBlurComisaria(){
    setTimeout(() => {
      if (!this.changeList){
        this.vcomisarialist = false;
        if (this.selectSiniestro.idcomisaria==null){
          this.selectSiniestro.descomisaria="";
        }
      }  
      this.changeList=false;
    }, 1000);    
  }
  setComisaria(item: IComisaria) {
    this.changeList=true;
    this.vcomisarialist = false;
    this.selectSiniestro.descomisaria = item.vdescripcion;
    this.selectSiniestro.idcomisaria = item.idcomisaria.toString();
  }

  async ListarSeccionesProcuracion() {
    try {
      var data = await this.siniestroService.ListarSeccionesProcuracion(this.selectSiniestro.idsiniestro)
      // .subscribe(async (data: any) => {
      this.listSeccionProcuracion = data;
      // });
    } catch (error) {
    }
  }

  EliminarFotoProcuracion(idimagen: string) {
    this.siniestroService.EliminarFotoProcuracion(idimagen).then(async (data: any) => {
      alert('Se eliminó satisfactoriamente');
      this.ListarSeccionesProcuracion();
    });
  }

  downloadMyFile(idimagen: string) {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', environment.BASE_BACKEND_WORKER + '/imgProc/' + idimagen + '.jpg');
    //link.setAttribute('download', `products.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  establecerActivoSeccion = (idseccion: number) => {
    if (idseccion == this.idseccionActive) {
      this.idseccionActive = 0;
    } else {
      this.idseccionActive = idseccion;
    }
    this.selectSiniestro.descripcionimagen = "";
  }

  evaluarActivoSeccion = (idseccion: number) => {
    if (idseccion == this.idseccionActive)
      return true;
    else
      return false;
  }

  onSelected(value: string): void {
    this.selectedEstadoSiniestro = value;
  }

  async loadCoberturaInit() {

    var dataCobertura = await
      this.siniestroService.ComboCoberturaGeneral(this.selectSiniestro.smcausa,
        this.selectSiniestro.idetallecausa,
        this.selectSiniestro.idplan)
    this.listCoberturaModalGeneral = dataCobertura;

    var deducibleMultiple = await this.siniestroService.ComboDeducibleMultiple(this.selectSiniestro.smcausa);
    this.listDeducibleMultiple = deducibleMultiple;

    this.selectSiniestro.Moneda = "2";
    //TraerDcminimo

    //TraerSumaAsegurada
    //await this.TraerSumaAsegurada()

    this.ManejoAusenciaControl();

  }

  async VerificarPersonaCobertura(smcobgeneral: string = '') {
    var personaCobertura = await this.siniestroService.VerificarPersonaCobertura(smcobgeneral);
    this.listPersonaCobertura = personaCobertura;
    let respuesta = this.listPersonaCobertura[0].respuesta;
    if (respuesta === "true") {

      sessionStorage.setItem('tablaGuardar', "persona");
      this.establecerCoberturaModalTabActivo(1);
      // $('#persona').addClass('show active');
      //           $('#home').removeClass('show active');


      //           $('#persona-tab').removeClass('disabled');
      //           $('#persona-tab').addClass('active');


      //           $('#vehasegurado-tab').removeClass('active');
      //           $('#vehasegurado-tab').addClass('disabled');

      //           //
      //           $('#vehotro-tab').removeClass('disabled');
      sessionStorage.setItem('validarPVO', "PersonaVehicul");

    } else if (respuesta === "reply_v") {
      sessionStorage.setItem('tablaGuardar', "vehiculo");
      this.establecerCoberturaModalTabActivo(2);
      // $('#persona').removeClass('show active');

      // $('#home').addClass('show active');
      // $('#profile').removeClass('show active');

      // $('#persona-tab').removeClass('active');
      // $('#persona-tab').addClass('disabled');


      // $('#vehasegurado-tab').removeClass('disabled');
      // $('#vehasegurado-tab').addClass('active');


      // $('#vehotro-tab').removeClass('active');
      // $('#vehotro-tab').addClass('disabled');
    } else if (respuesta === "reply_p") {

      sessionStorage.setItem('tablaGuardar', "persona");
      this.establecerCoberturaModalTabActivo(1);
      // $('#persona').addClass('show active');
      // $('#home').removeClass('show active');
      // $('#profile').removeClass('show active');


      // $('#persona-tab').removeClass('disabled');
      // $('#persona-tab').addClass('active');


      // $('#vehasegurado-tab').removeClass('active');
      // $('#vehasegurado-tab').addClass('disabled');

      // //
      // $('#vehotro-tab').removeClass('active');
      // $('#vehotro-tab').addClass('disabled');
    }


  }

  public async NuevaCobertura(): Promise<void> {
    if (this.selectSiniestro.smcausa !== "" &&
      this.selectSiniestro.idetallecausa !== "" &&
      this.selectSiniestro.idconsecuencia !== "") {
      if (this.selectSiniestro.smcausades === "" &&
        this.selectSiniestro.iddetalledes === "") {
        alert("Actualice el siniestro.");
      } else {
        if (
          this.selectSiniestro.estadopoliza === "ANULADA"
          || this.selectSiniestro.estadopoliza === 'CANCELADA'
          || this.selectSiniestro.estadopoliza === 'TERMINADO'
          || this.selectSiniestro.estadopoliza === 'SUSPENDIDA'
          && (this.selectSiniestro.iestadosiniestro === "1" || this.selectSiniestro.iestadosiniestro === "2")) {
          alert('No puede registrar una COBERTURA por el estado de la POLIZA ');
        } else if (this.selectSiniestro.estadopoliza === 'CANCELADA' || this.selectSiniestro.estadopoliza === 'ANULADA'
          || this.selectSiniestro.estadopoliza === 'TERMINADO' || this.selectSiniestro.estadopoliza === 'SUSPENDIDA') {
          alert('No puede registrar una COBERTURA por el estado de la POLIZA ');
        } else if (this.selectSiniestro.iestadosiniestro === "3" || this.selectSiniestro.iestadosiniestro === "4") {
          var estadoDescription = this.listEstadoSiniestro.filter(f => f.smiddetalle === Number(this.selectSiniestro.iestadosiniestro));
          alert('No se puede registrar una cobertura, porque el estado del siniestro es ' + estadoDescription[0].vdescripcion + '.');
        } else if (this.selectSiniestro.idplan === "11") {
          alert('No se puede registrar una cobertura, el plan de la poliza no tiene coberturas.');
        } else {

          // var Existe = await this.siniestroService.Existe_Cobertura(this.selectSiniestro.smcausa, this.selectSiniestro.idplan);

          // if (Existe === "no") {
          //   alert('No se ha registrado cobertura general para el siniestro');
          // } else {

          //       this.loadCoberturaInit();

          // }
          //VerificarPersonaCobertura($('#sp_cobergen').val());


          //   if ($('#idplan').val() == 4 && $('#sp_Causa').val() == 1) {
          //     //console.log('JULIO')
          //     $('#persona-tab').addClass('active show');
          //     $('#persona-tab').removeClass('disabled');
          //     $('#vehasegurado-tab').removeClass('active show');
          //     $('#vehasegurado-tab').addClass('disabled');
          //     $('#vehotro-tab').removeClass('active show');
          //     $('#vehotro-tab').addClass('disabled');
          // }

          // //COMENTAR 1
          // if ($('#sp_cobergen').val() == 1) {
          //     $('#chkPerdidaTotal').css('display', 'table-cell');
          //     $('#labelPerdidaTotal').css('display', 'table-cell');
          //     //$('#labelAusenciaControl').css('display', 'table-cell');
          //     //$('#chkAusenciaControl').css('display', 'table-cell');

          // }
          await this.limpiar_cajas_nueCober();
          this.selectSiniestro.smcausageneral = "1";
          this.selectSiniestro.perdidaTotal = false;

          this.showCobertura = true;
        }
      }
    } else {
      //No se puede crear cobertura, ingrese Causa/det/cons
      alert("Actualice el siniestro con los campos Causa, Detalle Causa y/o Consecuencia.");
      return;
    }


  }

  public async CloseCobertura(): Promise<void> {
    this.showCobertura = false;
  }

  public async NuevaOT(): Promise<void> {
    let perdidaTotal = sessionStorage.getItem('perdidaTotal');
    let userperfil = sessionStorage.getItem("userperfil");
    let valorEditable = sessionStorage.getItem('valorEditable');

    if (userperfil === "3") {
      sessionStorage.removeItem('CoberturaSeleccionada');
    } else {
      if (valorEditable === "disabled") {
        alert('Debe Registrar Nueva Cobertura');
      } else {
        let coberturaSeleccionada = sessionStorage.getItem('CoberturaSeleccionada');
        if (coberturaSeleccionada === null) {
          alert('Debe seleccionar una Cobertura!');
        } else {
          if (perdidaTotal === '1') {
            alert('La cobertura esta como PERDIDA TOTAL, no se pueden crear OTs. ');
          } else {
            if (coberturaSeleccionada != 'CG' && coberturaSeleccionada != '0') {
              //Validar si existe tipo de cambio para la fecha de registro
              //monedaChange('OT');
            } else {
              //SI LA COBERTURA SELECCIONADA ES UN --> CG --> NO DEBE PERMITIR ABRIR EL BOTON OT
              alert('Debe Seleccionar la cobertura Correcta para OT');
              // $('#agregarOT').modal('hide');
              // var valor2vez = sessionStorage.getItem('ValorRegistro');
              // $(valor2vez).removeClass('pruebahover2');
              sessionStorage.removeItem('ValorRegistro');
              sessionStorage.removeItem('CoberturaSeleccionada');
            }
          }
        }
      }
    }

  }

  public async NuevaCG(): Promise<void> {
    let usuario = sessionStorage.getItem("userperfil");
    let valorEditable = sessionStorage.getItem('valorEditable');

    if (usuario === "3") {
      sessionStorage.removeItem('CoberturaSeleccionada');
    } else {
      if (valorEditable == 'disabled') {
        alert('Debe Registrar Nueva Cobertura');
      } else {
        var coberturaSeleccionada = sessionStorage.getItem('CoberturaSeleccionada');

        if (coberturaSeleccionada == null) {
          alert('Debe seleccionar una Cobertura!');
        } else {
          if (coberturaSeleccionada != 'OT' && coberturaSeleccionada != '0') {

            //Validar si existe tipo de cambio para la fecha de registro
            //monedaChangeCG('CG');
            var botonGuardar = sessionStorage.getItem('botonGuardarCG');
            if (botonGuardar === "0") {
              if (this.selectSiniestro.iestadosiniestro === "4") {
                alert('No se puede registrar una CG ni Ampliaciòn CG porque el Siniestro se encuentra Desistido')
              } else {
                alert('No se puede registrar una CG porque la Cobetura se encuentra Rechazada ')
              }
            }
            sessionStorage.removeItem('RegistrarCGAMP');
          } else {
            sessionStorage.removeItem('ValorRegistro');
            sessionStorage.removeItem('CoberturaSeleccionada');
            alert('Debe Seleccionar la cobertura Correcta para CG');
          }
        }
      }
    }
  }

  public async VerReserva(): Promise<void> {

    this.showCoberturaReserva = true;
    var reservas = await this.siniestroService.ListarReservas(this.selectSiniestro.idsiniestro);
    this.listReserva = reservas;

  }

  public async AjusteReserva(): Promise<void> {
    let valorEditable = sessionStorage.getItem('valorEditable');
    let usuario = sessionStorage.getItem("userperfil");

    if (valorEditable === "disabled") {
      alert('Debe Registrar Nueva Cobertura');
    } else {
      var coberturaSeleccionada = sessionStorage.getItem('CoberturaSeleccionada');

      if (coberturaSeleccionada == null) {
        alert('Debe seleccionar una Cobertura!');
      } else {
        var botonGuardar = sessionStorage.getItem('botonGuardarCG');

        if (botonGuardar === "0") {
          alert('No se puede registrar un ajuste de reserva porque la cobertura se encuentra rechazada.')
        } else {
          // var fechasistema = (fechanotifi.getFullYear() + "-" + mes + "-" + dia);
          // $('#fechaAjusteReserva').val(fechasistema);
          // $('#sp_tipoAjusteReserva').val(0);
          // $('#montoAjusteReserva').val('');
          //$('#AjusteReserva').modal('show');
        }
      }
    }
  }

  async TraerSumaAsegurada(idetallecausa: string, smcausa: string, smcobgeneral: string, idsiniestro: string, numLesionados: string) {
    var listasumaAsegurada = await this.siniestroService.TraerSumaAsegurada(idetallecausa, smcausa, smcobgeneral, idsiniestro, numLesionados)
    this.listSumaAsegurada = listasumaAsegurada;

    let sumaAseguradaresp = this.listSumaAsegurada[0].sumaAsegurada;
    let smcobgeneralresp = this.listSumaAsegurada[0].smcobgeneral;

    // $('#sumaAseguradaCoberVehiculo').val(sumaAseguradaresp);
    // $('#sumaAseguradaCoberPersona').val(sumaAseguradaresp);
    if (smcobgeneralresp === "1" || smcobgeneralresp === "8" || smcobgeneralresp === "9"
      || smcobgeneralresp === "11" || smcobgeneralresp === "12" || smcobgeneralresp === "13") {
      this.selectSiniestro.sumaAsegurada = sumaAseguradaresp;
    } else if (smcobgeneralresp === "3") {
      // $('#idSumaAseguradaP').val(sumaAsegurada);
      // $('#idSumaAseguradaVO').val(sumaAsegurada);
    } else {
      //$('#idSumaAseguradaP').val(sumaAsegurada);
    }
  }

  async TraerDcminimo(idetallecausa: string, smcausa: string, smcobgeneral: string, idplan: string) {

    //   if ($("#idsiniestro_reg").val() != '') {
    //     idsiniestro = parseInt($("#idsiniestro_reg").val().substring(3, $("#idsiniestro_reg").val().length));
    // }

    // var flag_ac = 0;
    // if ($("#chkAusenciaControl").is(':checked')) {
    //     flag_ac = 1;
    // } else if ($("#chkAusenciaControl_persona").is(':checked')) {
    //     flag_ac = 1;
    // } else if ($("#chkAusenciaControl_vo").is(':checked')) {
    //     flag_ac = 1;
    // }
    // //console.log(idsiniestro);
    // if (idsiniestro != '') {
    //     ValidarPickUp(idsiniestro);
    // }

    var listaDcminimo = await this.siniestroService.TraerDcminimo(idetallecausa, smcausa, smcobgeneral, idplan);
    this.listDcminimo = listaDcminimo;
    sessionStorage.removeItem('porcenDedu');

    let respuesta = this.listDcminimo[0].respuesta;
    let dcminimo = this.listDcminimo[0].dcminimo;
    let porceDedu = this.listDcminimo[0].porcentajeDedu;
    let idetallecausares = this.listDcminimo[0].idetallecausa;
    let smidcobertura = this.listDcminimo[0].smidcobertura;


    sessionStorage.setItem('porcenDedu', porceDedu.toString());
    sessionStorage.setItem('dcminimo', dcminimo.toString());

    this.selectSiniestro.dcminimo = dcminimo.toString();

    if (respuesta === "repply") {
      //sessionStorage.setItem('smidcoberturaCDM', smidcobertura);
      this.selectSiniestro.porcentajeDedu = porceDedu.toString();

    } else if (respuesta === "true") {


    }

  }

  async TraerPersonaCoberPersona(idsiniestro: string, flag: string){
    var data = await this.siniestroService.TraerPersonaCoberPersona(idsiniestro, flag);

  //   if (FlagPersona == '1') {
  //     $('#nrodoc_personaPC').val(NomPersona);
  //     $('#idpersonaTP').val(IdPersona);
  // } else {
  //     $('#nrodoc_personaPC').val(NomPersona);
  //     $('#idpersonaTP').val(IdPersona);
  // }
    // if(data[0].flagper === "1"){
    // }else{
    // }
      this.selectSiniestro.personaPC = data[0].persona;
      this.selectSiniestro.idpersonaTP = data[0].idpersona;
  }

  cerrarModalCoberturaReserva() {
    this.showCoberturaReserva = false;
  }

  /*
    Inicio Modal Cobertura
  */
  async limpiar_cajas_nueCober() {

    if (this.selectSiniestro.smcausa !== "" &&
      this.selectSiniestro.idetallecausa !== "" &&
      this.selectSiniestro.idconsecuencia !== "") {
      if (this.selectSiniestro.smcausades === "" &&
        this.selectSiniestro.iddetalledes === "") {
        alert("Actualice el siniestro.");
      } else {

        var resp = await this.siniestroService.Existe_Cobertura(this.selectSiniestro.smcausa, this.selectSiniestro.idplan);

        if (resp === "no") {
          alert('No se ha registrado cobertura general para el siniestro');
        } else {
          let usuario = sessionStorage.getItem("userperfil");

          if (usuario === "3") {
            //cargar estados
            //Spinner_EstadoCobertura_Operador();
          }

          this.loadCoberturaInit();

          if (this.selectSiniestro.smcausa !== "9") {
            await this.TraerDcminimo(this.selectSiniestro.idetallecausa, this.selectSiniestro.smcausa, this.selectSiniestro.smcausa, this.selectSiniestro.idplan);
          }

          await this.TraerSumaAsegurada(this.selectSiniestro.idetallecausa, this.selectSiniestro.smcausa, this.selectSiniestro.smcausa
            , this.selectSiniestro.idsiniestro, this.selectSiniestro.iocupantes);

          await this.VerificarPersonaCobertura("1");
        }
      }

    }
  }

  async ManejoAusenciaControl() {
    let cobertura = this.selectSiniestro.smcausa;
    let plan = this.selectSiniestro.idplan;

    if (plan === "12") {
      if (cobertura === "1") {
        // $("#labelAusenciaControl").show();
        // $('#chkAusenciaControl').show();
        this.chkAusenciaControl = true;

        // $("#labelAusenciaControl_persona").hide();
        // $('#chkAusenciaControl_persona').hide();

        // $("#labelAusenciaControl_vo").hide();
        // $('#chkAusenciaControl_vo').hide();
      }

      if (cobertura === "2") {
        // $("#labelAusenciaControl").hide();
        // $('#chkAusenciaControl').hide();
        this.chkAusenciaControl = false;

        // $("#labelAusenciaControl_persona").show();
        // $('#chkAusenciaControl_persona').show();

        // $("#labelAusenciaControl_vo").hide();
        // $('#chkAusenciaControl_vo').hide();
      }

      if (cobertura === "3") {
        // $("#labelAusenciaControl").hide();
        // $('#chkAusenciaControl').hide();
        this.chkAusenciaControl = false;

        // $("#labelAusenciaControl_persona").show();
        // $('#chkAusenciaControl_persona').show();

        // $("#labelAusenciaControl_vo").show();
        // $('#chkAusenciaControl_vo').show();
      }

    } else {
      // $("#labelAusenciaControl").css("display", "none!important");
      // $('#chkAusenciaControl').css('display', 'none!important');
      this.chkAusenciaControl = false;
    }
  }

  async onCheckboxChange_PerdidaTotal(event: any) {

    let smcobgeneral = this.selectSiniestro.smcausageneral; //$("#sp_cobergen").val();
    let smcausa = this.selectSiniestro.smcausa;//$("#sp_causa").val();
    let idetallecausa = this.selectSiniestro.idetallecausa; //$('#sp_detacausa').val();
    let numLesionados = this.selectSiniestro.iocupantes; //$('#nroaccidentados_reg').val();
    let idsiniestro = this.selectSiniestro.idsiniestro; //sessionStorage.getItem("idsiniestro");

    if (event.target.checked) {
      //Spinner_ComboDeducibleMultiple
      var deducibleMultiple = await this.siniestroService.ComboDeducibleMultiple(smcausa);
      this.listDeducibleMultiple = deducibleMultiple;

      //TraerPlan($("#poliza_reg").val(), '');
      var plan = await this.siniestroService.TraerPlan(this.selectSiniestro.idpoliza);
      let idplan = plan[0].idplan;

      //TraerSumaAsegurada
      await this.TraerSumaAsegurada(idetallecausa, smcausa, smcobgeneral, idsiniestro, numLesionados);

      if (idplan === "3" || idplan === "6" || idplan === "10") {
        this.selectSiniestro.reserinireg = (Number(this.selectSiniestro.sumaAsegurada) * 100 / 75).toString();

      } else {
        this.selectSiniestro.reserinireg = (Number(this.selectSiniestro.sumaAsegurada)).toString();
      }

      this.readOnlyReservaInicial = true;
      sessionStorage.setItem('anulacion_ri', '1');
      this.selectSiniestro.porcentajeDedu = "0";
      this.selectSiniestro.dcminimo = "0";
    } else {

      if (this.chkAusenciaControl === false) {
        this.selectSiniestro.reserinireg = "0";
        this.readOnlyReservaInicial = false;
        this.selectSiniestro.porcentajeDedu = sessionStorage.getItem('porcenDedu');
        this.selectSiniestro.dcminimo = sessionStorage.getItem('dcminimo');
        sessionStorage.setItem('anulacion_ri', '0');
      } else {
        //Spinner_ComboDeducibleMultiple
        var deducibleMultiple = await this.siniestroService.ComboDeducibleMultiple(smcausa);
        this.listDeducibleMultiple = deducibleMultiple;

        this.selectSiniestro.dcminimo = "250";
        this.selectSiniestro.porcentajeDedu = "20";
        sessionStorage.setItem('porcenDedu', "20");
        this.readOnlyReservaInicial = false;
        this.selectSiniestro.reserinireg = "0";
      }

      //Si la AC no está activada, toma los valores normales
      //   if(!$("#chkAusenciaControl").is(':checked')){
      //     sumaasegurada = 0.00;
      //     $('#reserinireg').val(sumaasegurada);
      //     $('#reserinireg').prop("disabled", false);
      //     $("#dedureg").val(Deducible);
      //     $("#deduciminreg").val(DeducibleMinimo);
      //     //set anulacion de reserva inicial
      //     sessionStorage.setItem('anulacion_ri', '0');
      // } else{
      //     Spinner_ComboDeducibleMultiple(smcausa);
      //     idcobertura_AC = 107;
      //     $("#deduciminreg").val('250.00');
      //     $("#dedureg").val('20');//20%
      //     sessionStorage.setItem('porcenDedu', 20);
      //     $("#reserinireg").prop("disabled", false);
      //     $("#reserinireg").val('0');
      // }

    }
  }

  async onChangeDedicible_Multiple(event: any) {
    await this.CambiarDcminimo(this.selectSiniestro.smcausageneral, event.target.value);
  }

  async onCheckboxChange_Asegurado(event: any) {
    if (event.target.checked){
      await this.TraerPersonaCoberPersona(this.selectSiniestro.idsiniestro, "1");
      this.selectSiniestro.flagAsegurado = true;
      this.selectSiniestro.flagConductor = false;
    }
    else{
      this.selectSiniestro.flagAsegurado = false;
      this.selectSiniestro.personaPC = "";
      this.selectSiniestro.idpersonaTP = "";
    }
  }

  async onCheckboxChange_Conductor(event: any) {
    if (event.target.checked){
      await this.TraerPersonaCoberPersona(this.selectSiniestro.idsiniestro, "2");
      this.selectSiniestro.flagConductor = true;
      this.selectSiniestro.flagAsegurado = false;
    }
    else{
      this.selectSiniestro.flagConductor = false;
      this.selectSiniestro.personaPC = "";
      this.selectSiniestro.idpersonaTP = "";
    }
  }

  async onChangeCoberturaGeneral(event: any) {
    this.chkAusenciaControl = false;

    //VERIFICAR SI EXISTE COBERTURA
    //var varsmcobgeneral = event.target.value;
    //var varidplan = "";//$('#idplan').val();
    //resp = ExisteCobertura(varsmcobgeneral, varidplan)

    var resp = await this.siniestroService.Existe_Cobertura(event.target.value, this.selectSiniestro.idplan);

    //ManejoAusenciaControl();
    await this.ManejoAusenciaControl();

    if (resp === "no") {
      alert('No se ha registrado cobertura general para el siniestro');
    } else {

      if (this.selectSiniestro.smcausageneral === "1") {
        this.visiblePerdidaTotal = true;
      } else {
        this.visiblePerdidaTotal = false;
      }

      if (this.selectSiniestro.smcausageneral === "9") {
        this.chkAusenciaControl = false;
        this.selectSiniestro.dcminimo = "0.00";
        this.selectSiniestro.porcentajeDedu = "0.00";
      }

      if (this.selectSiniestro.smcausageneral === "4" && this.selectSiniestro.Asientos === "0") {
        alert('No podrá registrar una cobertura RC FRENTE OCUPANTES MUERTE por el numero de lesionados en 0');
        await this.limpiar_cajas_nueCober();
      }
      else {

        //   if (smcobgeneral == 3) {
        //     $('#ObservacionCoberR').removeClass('Ocultar')
        // } else {
        //     $('#ObservacionCoberR').addClass('Ocultar')
        // }

         // if (smcobgeneral == 3) {
        //     $('#chkflagAseguradoP').prop("disabled", true);

        // } else {
        //     $('#chkflagAseguradoP').prop("disabled", false);
        // }

        if (this.selectSiniestro.smcausageneral === "3") {
          this.visibleObservacionesCober = true;
          this.disabledflagAseguradoP = true;
          this.disabledflagConductorP = true;
        } else {
          this.visibleObservacionesCober = false;
          this.disabledflagAseguradoP = false;
          this.disabledflagConductorP = false;
        }


        await this.VerificarPersonaCobertura(event.target.value);

        //var idplan = $('#idplan').val();
        if (event.target.value !== "9") {
          await this.TraerDcminimo(this.selectSiniestro.idetallecausa, this.selectSiniestro.smcausa, event.target.value, this.selectSiniestro.idplan);
        }
        await this.TraerSumaAsegurada(this.selectSiniestro.idetallecausa, this.selectSiniestro.smcausa, event.target.value, this.selectSiniestro.idsiniestro, this.selectSiniestro.Asientos);

        await this.siniestroService.VerificarPersonaCobertura(this.selectSiniestro.idsiniestro);
      }
    }
  }

  async CambiarDcminimo(smcausa: string, smiddeducible: string) {
    var data = await this.siniestroService.CambiarDcminimo(smcausa, smiddeducible);

    let dcminimo = data[0].dcminimo;
    let porceDedu = data[0].porcentajeDedu;
    let perdidaTotal = sessionStorage.getItem('chkperdidatotal')

    if (perdidaTotal === "1") {
      //$("#dedureg").val(0);
      //$("#deduciminreg").val(0);

      this.selectSiniestro.porcentajeDedu = "0";
      this.selectSiniestro.dcminimo = "0";

    } else {
      //$('#deduciminreg').val(dcminimo);
      this.selectSiniestro.dcminimo = dcminimo.toString();
      this.selectSiniestro.porcentajeDedu = porceDedu.toString();

      //  $('#deduciminregP').val(dcminimo);
      //  $('#deduciminregVO').val(dcminimo);

      //  $('#porcentajeVS').val(porceDedu);
      //  $('#porcentajeP').val(porceDedu);
      //  $('#porcentajeVO').val(porceDedu);
    }

    await this.ComprobarReservaInicial();

  }

  async ComprobarReservaInicial() {
    let porcentaje = sessionStorage.getItem('porcenDedu');
    let cobgeneral = this.selectSiniestro.smcausageneral;  //$("#sp_cobergen").val();
    let reserva = this.selectSiniestro.reserinireg; //$("#reserinireg").val();
    sessionStorage.removeItem('porcenDeduVS');

    if (porcentaje !== "") {
      var porceCambiado = "0";//$('#porcentajeVS').val();
      if (porceCambiado === "") {
        var porcentajeC = sessionStorage.getItem('porcenDedu');
      } else {
        var porcentajeC = "0";//$('#porcentajeVS').val();
      }

      var porcentajeComporbar = porcentajeC;
      if (porcentajeComporbar === "0") {
        var capturar_dcminimo = this.selectSiniestro.dcminimo;//$('#deduciminreg').val();
        //$('#dedureg').val(capturar_dcminimo);
        this.selectSiniestro.porcentajeDedu = capturar_dcminimo;
        //$('#deduciminreg').val(capturar_dcminimo);
        this.selectSiniestro.dcminimo = capturar_dcminimo;
      } else {

        sessionStorage.setItem('porcenDeduVS', porcentajeC);

        if (cobgeneral !== "9") {
          await this.calcularDeducible();
        } else { // si es accesorios especiales, el exceso tiene un deducible de 10%
          if (Number(parseFloat(reserva).toFixed(2)) > 3000.00) {
            reserva = (parseFloat(reserva) - 3000.00).toString();
            //reserva = reserva.toFixed(2);
            capturar_dcminimo = (Number(reserva) * 0.1).toFixed(2);
            alert("Ha superado el límite para esta cobertura $3000, se considerará el 10% al exceso.");
            //$('#deduciminreg').val('0.00');
            this.selectSiniestro.dcminimo = "0.00";
            //$('#dedureg').val(capturar_dcminimo);
            this.selectSiniestro.porcentajeDedu = capturar_dcminimo;
          } else {
            //$('#deduciminreg').val('0.00');
            this.selectSiniestro.dcminimo = "0.00";
            //$('#dedureg').val('0.00');
            this.selectSiniestro.porcentajeDedu = "0.00";
          }
        }
      }

    }

  }

  async calcularDeducible() {
    let porcentajeC = Number(sessionStorage.getItem('porcenDeduVS'));
    let deduciblemin = parseFloat(this.selectSiniestro.dcminimo);
    let reservaInicial = parseFloat(this.selectSiniestro.reserinireg);

    if (deduciblemin + '' == 'NaN') {
      deduciblemin = parseFloat("0");
    }

    if (reservaInicial + '' == 'NaN') {
      reservaInicial = parseFloat("0");
    }

    let montofinal = reservaInicial * (porcentajeC / 100);

    if (montofinal <= deduciblemin) {
      montofinal = deduciblemin;
    }

    let perdidaTotal = sessionStorage.getItem('chkperdidatotal')

    if (perdidaTotal == '1') {
      //$('#reserinireg').val(reservaInicial.toFixed(2))
      this.selectSiniestro.reserinireg = reservaInicial.toFixed(2);
      //$("#dedureg").val(0);
      this.selectSiniestro.porcentajeDedu = "0";
      //$("#deduciminreg").val(0);
      this.selectSiniestro.dcminimo = "0";
    } else {
      //$('#deduciminreg').val(deduciblemin.toFixed(2))
      this.selectSiniestro.dcminimo = deduciblemin.toFixed(2);
      //$('#reserinireg').val(reservaInicial.toFixed(2))
      this.selectSiniestro.reserinireg = reservaInicial.toFixed(2);
      //$('#dedureg').val(montofinal.toFixed(2))
      this.selectSiniestro.porcentajeDedu = montofinal.toFixed(2);
    }
  }

  evaluarCoberturaModalTabActivo = (idTab: number) => {
    if (idTab == this.idCoberturaModalTabActive)
      return true;
    else
      return false;
  }

  establecerCoberturaModalTabActivo = (idTab: number) => {
    this.idCoberturaModalTabActive = idTab;
  }

  cerrarModalCobertura() {
    this.showCobertura = false;
  }
  /*
    Fin Modal Cobertura
  */
}
