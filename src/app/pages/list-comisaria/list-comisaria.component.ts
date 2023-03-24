import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ComisariaService } from 'src/app/services/comisaria/comisaria-service';
import { LoadingController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs'

interface IComisarias {
  TotalRegistros:string;
  idComisaria:number;
  vdescripcion:string;
  vdireccion:string;
  vtelefono:string;
  ubigeoid:string;
  vubigeo:string;
}
interface IUbigeos {
  smidubigeo :string;
  vdescripcion:string;
}

@Component({
  selector: 'app-list-comisaria',
  templateUrl: './list-comisaria.component.html',
  styleUrls: ['./list-comisaria.component.scss'],
})


export class ListComisariaComponent {
  filterForm: FormGroup;
  globalStepTitle: string;
  loading: boolean;
  showModal: boolean=false;
  isEdit: boolean=false;
  visiblelist: boolean=false;
  ubigeo: IUbigeos[];
  page = 1;
  pageSize = 10;
  listcomisarias: IComisarias[];
  comisaria: IComisarias;
  comisariaForm: FormGroup;

  constructor(
    private location: Location,
    private comisariaService:ComisariaService,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder
  ) {

  }
  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      comisaria: new FormControl(''),
    });
    
    this.comisariaForm = this.formBuilder.group({
      vdescripcion: new FormControl(''),
      vdireccion: new FormControl(''),
      vtelefono: new FormControl(''),
      vubigeo: new FormControl(''),
    });
    this.list();
  }

  async list(){
    const loading = await this.loadingCtrl.create({
      message: 'Cargando resultados',
      duration: 2000
    });
    loading.present();
    this.comisariaService.listado(this.filterForm.value.comisaria,this.page.toString(),this.pageSize.toString()).subscribe((data: any) => {
      loading.dismiss();
      this.listcomisarias = data;
    });
  }

  editarComisaria(editar:boolean,comisaria:IComisarias){
    this.isEdit=editar;
    this.comisariaService.obtener(comisaria.idComisaria).subscribe((data: any) => {
      this.showModal = true;
      this.comisaria = data[0];
    });

  }
  getUbigeo(event:any){
    this.visiblelist=true;
    this.comisariaService.ubigeo(event.target.value).subscribe((data: any) => {
      this.ubigeo = data;
    });
  }

  setUbigeo(item:IUbigeos){
    this.visiblelist=false;
    //alert(item.smidubigeo);
    this.comisaria.vubigeo=item.vdescripcion;
    this.comisaria.ubigeoid=item.smidubigeo;
  }

  async ActualizarComisaria(){
      const loading = await this.loadingCtrl.create({
        spinner: 'bubbles',
        message:'<div class="custom-spinner-container"><div class="custom-spinner-box"></div>Actualizando</div>',
      });

      loading.present();
      this.comisariaService.ActualizarComisaria(this.comisaria.idComisaria.toString(),this.comisaria.vdescripcion,this.comisaria.vdireccion,this.comisaria.vtelefono,this.comisaria.ubigeoid).subscribe((data: any) => {
        loading.dismiss();
        alert("Se actualizo correctamente")
        this.showModal = false;
      });
  }

  cerrarComisaria(){
    this.showModal = false;
  }

  async ngAfterViewInit () {
    this.loading = true;
  }
  ionViewWillEnter() {
    //this.externalForm.setupFormPage();
  }
  public goBack(): void {
      this.location.back();
  }
}
