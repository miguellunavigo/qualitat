
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IReserva } from 'src/app/model/ISelectedSiniestro';
import { IAnalista, IAseguradora, ICausa, ICobertura, ICoberturaGeneral, IComisaria, IConsecuencia, IDatoSiniestro, IDcminimo, IDeducibleMultiple, IDetalleCausa, IParentesco, IPersonaCobertura, IPolizaVehiculo, ISumaAsegurada, ITipoDeclarante, ITipoDocumento, IVerificarPersonaCobertura } from 'src/app/model/ISiniestro';
import { IUsuario } from 'src/app/model/IUsuario';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IActualizarSiniestro, IListadoSiniestro, IProcuracion } from 'src/app/model/IProcuracion';

@Injectable({
  providedIn: 'root'
})
export class SiniestroService {
  constructor(
    //private http: httpService.HttpService,
    private http: HttpClient
  ) { }

  public listadoEstado() {
    try {
      let headers = new HttpHeaders({
        'accept': 'application/json'
      });
      return this.http.post(environment.BASE_BACKEND_WORKER + "Services/ListarEstadoPoliza", "", { headers: headers })
    } catch (e: any) {
      console.log(e);
      throw (e);
    }
  }

  public async listado(idsiniestro: string = "", poliza: string = "", placa: string = "", fechaini: string = "", fechafin: string = "", nombre: string = "", idsemaforo: string = "", idperfil: string = "", usuario: string = "", icodigorenovacion: string = "", idordenatencion: string = "", NroDePagina: string = "", RegPorPag: string = ""): Promise<any> {
    try {
      let headers = new HttpHeaders({
        'accept': 'application/json'
      });
      headers = new HttpHeaders().set('Content-Type', "application/json");
      
      let url = environment.BASE_BACKEND_WORKER + 'Services/Listarsiniestro';
      var obj1 = new IListadoSiniestro();
      obj1.idsiniestro=idsiniestro;
      obj1.poliza=poliza;
      obj1.placa=placa;
      obj1.fechaini=fechaini;
      obj1.fechafin=fechafin;
      obj1.nombre=nombre;
      obj1.NroDePagina=NroDePagina;
      obj1.RegPorPag=RegPorPag;
      obj1.idsemaforo=idsemaforo;
      obj1.idperfil=idperfil;
      obj1.usuario=usuario;
      obj1.icodigorenovacion=icodigorenovacion; 
      obj1.idordenatencion=idordenatencion;
      return await this.http.post(url, obj1, { headers: headers }).toPromise()

    } catch (e: any) {
      console.log(e);
      throw (e);
    }
  }

  public async SelectSiniestro(idsiniestro: string = "", icodigorenovacion: string = "0") : Promise<any> {
    try {
      let headers = new HttpHeaders({
        'accept': 'application/json'
      });
      headers = new HttpHeaders().set('Content-Type', "application/json");
      let url = environment.BASE_BACKEND_WORKER + 'Services/SelectSiniestro';
      url = url + "?idsiniestro=" + idsiniestro;
      url = url + "&icodigorenovacion=" + icodigorenovacion;
      return this.http.post(url, "", { headers: headers }).toPromise()
    } catch (e: any) {
      console.log(e);
      throw (e);
    }
  }

  public async ListarEstadoCobertura() {
    try {
      let headers = new HttpHeaders({
        'accept': 'application/json'
      });
      headers = new HttpHeaders().set('Content-Type', "application/json");
      const url = environment.BASE_BACKEND_WORKER + 'Services/ListarEstadoCobertura';
      const response = await this.http.post<any>(url, "", { headers: headers }).toPromise();
      return response;
    } catch (e: any) {
      console.log(e);
      throw (e);
    }
  }

  public async Combo_Usuario(idperfil: string = '3'): Promise<IUsuario[]> {
    try {
      let headers = new HttpHeaders({
        'accept': 'application/json'
      });
      headers = new HttpHeaders().set('Content-Type', "application/json");
      let url = environment.BASE_BACKEND_WORKER + 'Services/Combo_Usuario';
      url = url + "?idperfil=" + idperfil;
      const response = await this.http.post<any>(url, "", { headers: headers }).toPromise();
      return response;
    } catch (e: any) {
      console.log(e);
      throw (e);
    }
  }

  public async Combo_Causa(idplan: string = '1'): Promise<ICausa[]> {
    try {
      let headers = new HttpHeaders({
        'accept': 'application/json'
      });
      headers = new HttpHeaders().set('Content-Type', "application/json");
      let url = environment.BASE_BACKEND_WORKER + 'Services/Combo_Causa';
      url = url + "?idplan=" + idplan;
      const response = await this.http.post<any>(url, "", { headers: headers }).toPromise();
      return response;
    } catch (e: any) {
      console.log(e);
      throw (e);
    }
  }

  public async Combo_DetalleCausa(smcausa: string = '', idpoliza: string = ''): Promise<IDetalleCausa[]> {
    try {
      let headers = new HttpHeaders({
        'accept': 'application/json'
      });
      headers = new HttpHeaders().set('Content-Type', "application/json");
      let url = environment.BASE_BACKEND_WORKER + 'Services/Combo_DetalleCausa';
      url = url + "?smcausa=" + smcausa;
      url = url + "&idpoliza=" + idpoliza;
      const response = await this.http.post<any>(url, "", { headers: headers }).toPromise();
      return response;
    } catch (e: any) {
      console.log(e);
      throw (e);
    }
  }

  public async Combo_Consecuencia(): Promise<IConsecuencia[]> {
    try {
      let headers = new HttpHeaders({
        'accept': 'application/json'
      });
      headers = new HttpHeaders().set('Content-Type', "application/json");
      const url = environment.BASE_BACKEND_WORKER + 'Services/Combo_Consecuencia';
      const response = await this.http.post<any>(url, "", { headers: headers }).toPromise();
      return response;
    } catch (e: any) {
      console.log(e);
      throw (e);
    }
  }

  public async AutocompletarAnalista(nombresusu: string = ''): Promise<IAnalista[]> {
    try {
      let headers = new HttpHeaders({
        'accept': 'application/json'
      });
      headers = new HttpHeaders().set('Content-Type', "application/json");
      let url = environment.BASE_BACKEND_WORKER + 'Services/AutocompletarAnalista';
      url = url + "?nombresusu=" + nombresusu;
      const response = await this.http.post<any>(url, "", { headers: headers }).toPromise();
      return response;
    } catch (e: any) {
      console.log(e);
      throw (e);
    }
  }

  public async ListarSeguroSOAT(): Promise<IAseguradora[]> {
    try {
      let headers = new HttpHeaders({
        'accept': 'application/json'
      });
      headers = new HttpHeaders().set('Content-Type', "application/json");
      const url = environment.BASE_BACKEND_WORKER + 'Services/ListarSeguroSOAT';
      const response = await this.http.post<any>(url, "", { headers: headers }).toPromise();
      return response;
    } catch (e: any) {
      console.log(e);
      throw (e);
    }
  }

  public async Combo_TipoDeclarante(): Promise<ITipoDeclarante[]> {
    try {
      let headers = new HttpHeaders({
        'accept': 'application/json'
      });
      headers = new HttpHeaders().set('Content-Type', "application/json");
      const url = environment.BASE_BACKEND_WORKER + 'Services/Combo_TipoDeclarante';
      const response = await this.http.post<any>(url, "", { headers: headers }).toPromise();
      return response;
    } catch (e: any) {
      console.log(e);
      throw (e);
    }
  }

  public async ListarTipoDocumento(): Promise<ITipoDocumento[]> {
    try {
      let headers = new HttpHeaders({
        'accept': 'application/json'
      });
      headers = new HttpHeaders().set('Content-Type', "application/json");
      const url = environment.BASE_BACKEND_WORKER + 'Services/ListarTipoDocumento';
      const response = await this.http.post<any>(url, "", { headers: headers }).toPromise();
      return response;
    } catch (e: any) {
      console.log(e);
      throw (e);
    }
  }

  public async Combo_Parentesco(): Promise<IParentesco[]> {
    try {
      let headers = new HttpHeaders({
        'accept': 'application/json'
      });
      headers = new HttpHeaders().set('Content-Type', "application/json");
      const url = environment.BASE_BACKEND_WORKER + 'Services/Combo_Parentesco';
      const response = await this.http.post<any>(url, "", { headers: headers }).toPromise();
      return response;
    } catch (e: any) {
      console.log(e);
      throw (e);
    }
  }

  public async Listar_Comisaria(vdescripcion: string = '', vdireccion: string = '',
    NroDePagina: number = 1, RegPorPag: number = 1000): Promise<IComisaria[]> {
    try {
      let headers = new HttpHeaders({
        'accept': 'application/json'
      });
      headers = new HttpHeaders().set('Content-Type', "application/json");
      let url = environment.BASE_BACKEND_WORKER + 'Services/Listar_Comisaria';
      url = url + "?vdescripcion=" + vdescripcion;
      url = url + "&vdireccion=" + vdireccion;
      url = url + "&NroDePagina=" + NroDePagina;
      url = url + "&RegPorPag=" + RegPorPag;
      const response = await this.http.post<any>(url, "", { headers: headers }).toPromise();
      return response;
    } catch (e: any) {
      console.log(e);
      throw (e);
    }
  }

  public async ListarDatosSiniestro(idsiniestro: string = "", icodigorenovacion: string = "0"): Promise<IDatoSiniestro[]> {
    try {
      let headers = new HttpHeaders({
        'accept': 'application/json'
      });
      headers = new HttpHeaders().set('Content-Type', "application/json");
      let url = environment.BASE_BACKEND_WORKER + 'Services/ListarDatosSiniestro';
      url = url + "?idsiniestro=" + idsiniestro;
      url = url + "&icodigorenovacion=" + icodigorenovacion;
      return await this.http.post<any>(url, "", { headers: headers }).toPromise();
    } catch (e: any) {
      console.log(e);
      throw (e);
    }
  }

  public async ListarCobertura(idsiniestro: string = ""): Promise<ICobertura[]> {
    try {
      let headers = new HttpHeaders({
        'accept': 'application/json'
      });
      headers = new HttpHeaders().set('Content-Type', "application/json");
      let url = environment.BASE_BACKEND_WORKER + 'Services/ListarCobertura';
      url = url + "?idsiniestro=" + idsiniestro;
      return await this.http.post<any>(url, "", { headers: headers }).toPromise();
    } catch (e: any) {
      console.log(e);
      throw (e);
    }
  }


  public async ActualizaSiniestro(idsiniestro: string = "", idpoliza: string = "", icodigorenovacion: string = "", idvehiculo: string = "", smidciaseguros: string = "", iestadosiniestro: string = "",
    dFecNotificacion: string = "", dHoraNotificacion: string = "", dFecRegistro: string = "", dHoraRegistro: string = "", dFecModifi: string = "", dHoraModifi: string = "",
    idconsecuencia: string = "", dFecOcurrencia: string = "", dHoraOcurrencia: string = "", vlugarsiniestro: string = "", iocupantes: string = "", vtelef_declarante: string = "",
    iparentaseg_declarante: string = "", vmaildeclarante: string = "", vlicencia: string = "", iparentaseg_conductor: string = "", vtelef_conductor: string = "", vemail_conductor: string = "",
    dvencilicencia: string = "", idcomisaria: string = "", vcategoria: string = "", vdetasiniestro: string = "", nidusuario: string = "", idgravedad: string = "", smcausa: string = "",
    idetallecausa: string = "", idtipo_decla: string = "", idtipo_docid_decla: string = "", idnrodoc_decla: string = "", vnombres_decla: string = "", vapellidopat_decla: string = "",
    vapellidomat_decla: string = "", idtipo_conduc: string = "", idtipo_docid_conduc: string = "", idnrodoc_conduc: string = "", vnombres_conduc: string = "", vapellidopat_conduc: string = "",
    vapellidomat_conduc: string = "", smidubigeo: string = "", dFecDenunciaP: string = "", dHoraDenunciaP: string = "", dFecCambioEstado: string = "", dUserAprobado: string = "",
    smidanalista: string = "", idaseguradora: string = "", usuarioLogin: string = "", idsemaforo: string = "", usuario: string = "", ip: string = ""): Promise<any> {
    try {
      let headers = new HttpHeaders({
        'accept': 'application/json'
      });
      headers = new HttpHeaders().set('Content-Type', "application/json");

      let url = environment.BASE_BACKEND_WORKER + 'Services/ActualizaSiniestro';

      var obj1 = new IActualizarSiniestro();

      obj1.idsiniestro= idsiniestro;
      obj1.idpoliza= idpoliza;
      obj1.icodigorenovacion=icodigorenovacion;
      obj1.idvehiculo= idvehiculo;
      obj1.smidciaseguros= smidciaseguros;
      obj1.iestadosiniestro= iestadosiniestro;
      obj1.dFecNotificacion= dFecNotificacion;
      obj1.dHoraNotificacion= dHoraNotificacion;
      obj1.dFecRegistro= dFecRegistro;
      obj1.dHoraRegistro= dHoraRegistro;
      obj1.dFecModifi= dFecModifi;
      obj1.dHoraModifi= dHoraModifi;
      obj1.idconsecuencia= idconsecuencia;
      obj1.dFecOcurrencia= dFecOcurrencia;
      obj1.dHoraOcurrencia= dHoraOcurrencia;
      obj1.vlugarsiniestro= vlugarsiniestro;
      obj1.iocupantes= iocupantes;
      obj1.vtelef_declarante= vtelef_declarante;
      obj1.iparentaseg_declarante= iparentaseg_declarante;
      obj1.vmaildeclarante= vmaildeclarante;
      obj1.vlicencia= vlicencia;
      obj1.iparentaseg_conductor= iparentaseg_conductor;
      obj1.vtelef_conductor= vtelef_conductor;
      obj1.vemail_conductor= vemail_conductor;
      obj1.dvencilicencia= dvencilicencia;
      obj1.idcomisaria= idcomisaria;
      obj1.vcategoria= vcategoria;
      obj1.vdetasiniestro= vdetasiniestro;
      obj1.nidusuario= nidusuario;
      obj1.idgravedad= idgravedad;
      obj1.smcausa= smcausa;
      obj1.idetallecausa= idetallecausa;
      obj1.idtipo_decla= idtipo_decla;
      obj1.idtipo_docid_decla= idtipo_docid_decla;
      obj1.idnrodoc_decla= idnrodoc_decla;
      obj1.vnombres_decla= vnombres_decla;
      obj1.vapellidopat_decla= vapellidopat_decla;
      obj1.vapellidomat_decla= vapellidomat_decla;
      obj1.idtipo_conduc= idtipo_conduc;
      obj1.idtipo_docid_conduc= idtipo_docid_conduc;
      obj1.idnrodoc_conduc= idnrodoc_conduc;
      obj1.vnombres_conduc= vnombres_conduc;
      obj1.vapellidopat_conduc= vapellidopat_conduc;
      obj1.vapellidomat_conduc= vapellidomat_conduc;
      obj1.smidubigeo= smidubigeo;
      obj1.dFecDenunciaP= dFecDenunciaP??"";
      obj1.dHoraDenunciaP= dHoraDenunciaP??"";
      obj1.dFecCambioEstado= dFecCambioEstado;
      obj1.dUserAprobado= dUserAprobado;
      obj1.smidanalista= smidanalista;
      obj1.idaseguradora= idaseguradora;
      obj1.usuarioLogin= usuarioLogin;
      obj1.idsemaforo= idsemaforo;
      obj1.usuario= usuario;
      obj1.ip= ip;

      return await this.http.post(url, obj1, { headers: headers }).toPromise();
    } catch (e: any) {
      console.log(e);
      throw (e);
    }
  }

  public async ActualizarProcuracion(idsiniestro: string = "", hechosSiniestros: string = "", apreciacionSiniestro: string = "", dFecReporteProc: string = "", dHoraReporteProc: string = "", dFecInicioProc: string = "",
    dHoraInicioProc: string = "", dFecFinProc: string = "", dHoraFinProc: string = "", tipoasesoria: string = "", ikilometraje: string = "", fechaAsignacion: string = "",
    horaAsignacion: string = "", procurador_id: string = ""): Promise<any> {
    try {
      let headers = new HttpHeaders({
        'accept': 'application/json; charset=utf-8'
      });
      headers = new HttpHeaders().set('Content-Type', "application/json; charset=utf-8");
       let url = environment.BASE_BACKEND_WORKER + 'Services/ActualizarProcuracion';
      var obj1=new IProcuracion();
      obj1.idsiniestro=idsiniestro;
      obj1.hechosSiniestros=hechosSiniestros;
      obj1.apreciacionSiniestro=apreciacionSiniestro;
      obj1.dFecReporteProc=dFecReporteProc;
      obj1.dHoraReporteProc=dHoraReporteProc;
      obj1.dFecInicioProc=dFecInicioProc;
      obj1.dHoraInicioProc=dHoraInicioProc;
      obj1.dFecFinProc=dFecFinProc;
      obj1.dHoraFinProc=dHoraFinProc;
      obj1.tipoasesoria=tipoasesoria;
      obj1.ikilometraje=ikilometraje;
      obj1.fechaAsignacion=fechaAsignacion;
      obj1.horaAsignacion=horaAsignacion;
      obj1.procurador_id=procurador_id;


      return await this.http.post(url, obj1, { headers: headers }).toPromise()
    } catch (e: any) {
      console.log(e);
      throw (e);
    }
  }

  public async InsertarSeccionProcuracion(idsiniestro: string = "", nombre: string = "", descripcion: string = "",): Promise<any> {
    try {
      let headers = new HttpHeaders({
        'accept': 'application/json'
      });
      headers = new HttpHeaders().set('Content-Type', "application/json");
      let url = environment.BASE_BACKEND_WORKER + 'Services/InsertarSeccionProcuracion';
      url = url + "?idsiniestro=" + idsiniestro
      url = url + "&nombre=" + nombre
      url = url + "&descripcion=" + descripcion

      return await this.http.post(url, { headers: headers }).toPromise();
    } catch (e: any) {
      console.log(e);
      throw (e);
    }

  }

  public async GuardarFotoProcuracion(idsiniestro: string = "", fecha: string = "", descripcion: string = "", idseccion: string = ""): Promise<any> {
    try {
      let headers = new HttpHeaders({
        'accept': 'application/json'
      });
      headers = new HttpHeaders().set('Content-Type', "application/json");
      let url = environment.BASE_BACKEND_WORKER + 'Services/GuardarFotoProcuracion';
      url = url + "?idsiniestro=" + idsiniestro
      url = url + "&fecha=" + fecha
      url = url + "&descripcion=" + descripcion
      url = url + "&idseccion=" + idseccion

      return await this.http.post<any>(url, { headers: headers }).toPromise();
    } catch (e: any) {
      console.log(e);
      throw (e);
    }

  }

  ResponseGuardarImgProSucces(formdata: any): Observable<any> {
    let url = environment.BASE_BACKEND_WORKER + 'api/fileUpload2';
    return this.http.post<any>(url, formdata, { reportProgress: true });
  }

  public async ListarSeccionesProcuracion(idsiniestro: string = ""): Promise<any> {
    try {
      let headers = new HttpHeaders({
        'accept': 'application/json'
      });
      headers = new HttpHeaders().set('Content-Type', "application/json");
      let url = environment.BASE_BACKEND_WORKER + 'Services/ListarSeccionesProcuracion';
      url = url + "?idsiniestro=" + idsiniestro;
      return await this.http.post(url, "", { headers: headers }).toPromise();
    } catch (e: any) {
      console.log(e);
      throw (e);
    }
  }

  public async ImagenesProcuracion(idsiniestro: string = ""): Promise<any> {
    try {
      let headers = new HttpHeaders({
        'accept': 'application/json'
      });
      headers = new HttpHeaders().set('Content-Type', "application/json");
      let url = environment.BASE_BACKEND_WORKER + 'Services/ImagenesProcuracion';
      url = url + "?idsiniestro=" + idsiniestro;
      return await this.http.post(url, "", { headers: headers }).toPromise();
    } catch (e: any) {
      console.log(e);
      throw (e);
    }
  }

  public async EliminarFotoProcuracion(idimagen: string = "") {
    try {
      let headers = new HttpHeaders({
        'accept': 'application/json'
      });
      headers = new HttpHeaders().set('Content-Type', "application/json");
      let url = environment.BASE_BACKEND_WORKER + 'Services/EliminarFotoProcuracion';
      url = url + "?idimagen=" + idimagen;
      return await this.http.post(url, "", { headers: headers }).toPromise()
    } catch (e: any) {
      console.log(e);
      throw (e);
    }
  }

  public async ComboCoberturaGeneral(smcausa: string = '', iddetallecausa: string = '',
    idplan: string = ''): Promise<ICoberturaGeneral[]> {
    try {
      let headers = new HttpHeaders({
        'accept': 'application/json'
      });
      headers = new HttpHeaders().set('Content-Type', "application/json");
      let url = environment.BASE_BACKEND_WORKER + 'Services/ComboCoberturaGeneral';
      url = url + "?smcausa=" + smcausa;
      url = url + "&iddetallecausa=" + iddetallecausa;
      url = url + "&idplan=" + idplan;
      const response = await this.http.post<any>(url, "", { headers: headers }).toPromise();
      return response;
    } catch (e: any) {
      console.log(e);
      throw (e);
    }
  }

  public async TraerSumaAsegurada(idetallecausa: string = '', smcausa: string = '',
    idcobgeneral: string = '', idsiniestro: string = '',
    numLesionados: string = '', flag_pickup: string = '0',
    flag_ac: string = '0'): Promise<ISumaAsegurada[]> {
    try {
      let headers = new HttpHeaders({
        'accept': 'application/json'
      });
      headers = new HttpHeaders().set('Content-Type', "application/json");
      let url = environment.BASE_BACKEND_WORKER + 'Services/TraerSumaAsegurada';
      url = url + "?idetallecausa=" + idetallecausa;
      url = url + "&smcausa=" + smcausa;
      url = url + "&idcobgeneral=" + idcobgeneral;
      url = url + "&idsiniestro=" + idsiniestro;
      url = url + "&numLesionados=" + numLesionados;
      url = url + "&flag_pickup=" + flag_pickup;
      url = url + "&flag_ac=" + flag_ac;
      const response = await this.http.post<any>(url, "", { headers: headers }).toPromise();
      return response;
    } catch (e: any) {
      console.log(e);
      throw (e);
    }
  }

  public async ComboDeducibleMultiple(smcausa: string = ''): Promise<IDeducibleMultiple[]> {
    try {
      let headers = new HttpHeaders({
        'accept': 'application/json'
      });
      headers = new HttpHeaders().set('Content-Type', "application/json");
      let url = environment.BASE_BACKEND_WORKER + 'Services/ComboDeducibleMultiple';
      url = url + "?smcausa=" + smcausa;
      const response = await this.http.post<any>(url, "", { headers: headers }).toPromise();
      return response;
    } catch (e: any) {
      console.log(e);
      throw (e);
    }
  }

  public async Existe_Cobertura(smcobgeneral: string = '', idplan: string = ''): Promise<any> {
    try {
      let headers = new HttpHeaders({
        'accept': 'application/json'
      });
      headers = new HttpHeaders().set('Content-Type', "application/json");
      let url = environment.BASE_BACKEND_WORKER + 'Services/Existe_Cobertura';
      url = url + "?smcobgeneral=" + smcobgeneral;
      url = url + "&idplan=" + idplan;
      const response = await this.http.post<any>(url, "", { headers: headers }).toPromise();
      return response;
    } catch (e: any) {
      console.log(e);
      throw (e);
    }
  }

  public async ListarReservas(idsiniestro: string = ''): Promise<IReserva[]> {
    try {
      let headers = new HttpHeaders({
        'accept': 'application/json'
      });
      headers = new HttpHeaders().set('Content-Type', "application/json");
      let url = environment.BASE_BACKEND_WORKER + 'Services/ListarReservas';
      url = url + "?idsiniestro=" + idsiniestro;
      const response = await this.http.post<any>(url, "", { headers: headers }).toPromise();
      return response;
    } catch (e: any) {
      console.log(e);
      throw (e);
    }
  }

  public ubigeo(vdescripcion: string): Observable<any> {
    try {
      let headers = new HttpHeaders({
        'accept': 'application/json'
      });
      headers = new HttpHeaders().set('Content-Type', "application/json");
      const url = environment.BASE_BACKEND_WORKER + 'Services/AutocompletarUbigeo?vdescripcion=' + vdescripcion;
      return this.http.post(url, "", { headers: headers })

    } catch (e: any) {
      console.log(e);
      throw (e);
    }
  }

  public async VerificarPersonaCobertura(smcobgeneral: string = ''): Promise<IVerificarPersonaCobertura[]> {
    try {
      let headers = new HttpHeaders({
        'accept': 'application/json'
      });

      headers = new HttpHeaders().set('Content-Type', "application/json");
      let url = environment.BASE_BACKEND_WORKER + 'Services/VerificarPersonaCobertura';
      url = url + "?smcobgeneral=" + smcobgeneral;
      const response = await this.http.post<any>(url, "", { headers: headers }).toPromise();
      return response;
    } catch (e: any) {
      console.log(e);
      throw (e);
    }
  }

  public async TraerDcminimo(idetallecausa: string = '', smcausa: string = '',
    smcobgeneral: string = '', idplan: string = '', flag_pickup: string = '0',
    flag_ac: string = '0'): Promise<IDcminimo[]> {
    try {
      let headers = new HttpHeaders({
        'accept': 'application/json'
      });
      headers = new HttpHeaders().set('Content-Type', "application/json");
      let url = environment.BASE_BACKEND_WORKER + 'Services/TraerDcminimo';
      url = url + "?idetallecausa=" + idetallecausa;
      url = url + "&smcausa=" + smcausa;
      url = url + "&idcobgeneral=" + smcobgeneral;
      url = url + "&idplan=" + idplan;
      url = url + "&flag_pickup=" + flag_pickup;
      url = url + "&flag_ac=" + flag_ac;
      const response = await this.http.post<any>(url, "", { headers: headers }).toPromise();
      return response;
    } catch (e: any) {
      console.log(e);
      throw (e);
    }
  }

  public async TraerPlan(idpoliza: string = '', idvehiculo: string = ''): Promise<IPolizaVehiculo[]> {
    try {
      let headers = new HttpHeaders({
        'accept': 'application/json'
      });
      headers = new HttpHeaders().set('Content-Type', "application/json");
      let url = environment.BASE_BACKEND_WORKER + 'Services/Select_PolizaVehiculo';
      url = url + "?idpoliza=" + idpoliza;
      url = url + "&idvehiculo=" + idvehiculo;
      const response = await this.http.post<any>(url, "", { headers: headers }).toPromise();
      return response;
    } catch (e: any) {
      console.log(e);
      throw (e);
    }
  }

  public async CambiarDcminimo(smcausa: string = '', smiddeducible: string = ''): Promise<IDcminimo[]> {
    try {
      let headers = new HttpHeaders({
        'accept': 'application/json'
      });
      headers = new HttpHeaders().set('Content-Type', "application/json");
      let url = environment.BASE_BACKEND_WORKER + 'Services/CambiarDcminimo';
      url = url + "?smcausa=" + smcausa;
      url = url + "&smiddeducible=" + smiddeducible;
      const response = await this.http.post<any>(url, "", { headers: headers }).toPromise();
      return response;
    } catch (e: any) {
      console.log(e);
      throw (e);
    }
  }

  public async ComboLugarVehiculo(): Promise<ITipoDocumento[]> {
    try {
      let headers = new HttpHeaders({
        'accept': 'application/json'
      });
      headers = new HttpHeaders().set('Content-Type', "application/json");
      const url = environment.BASE_BACKEND_WORKER + 'Services/ComboLugarVehiculo';
      const response = await this.http.post<any>(url, "", { headers: headers }).toPromise();
      return response;
    } catch (e: any) {
      console.log(e);
      throw (e);
    }
  }

  public async ComboTrasladoPaciente(): Promise<ITipoDocumento[]> {
    try {
      let headers = new HttpHeaders({
        'accept': 'application/json'
      });
      headers = new HttpHeaders().set('Content-Type', "application/json");
      const url = environment.BASE_BACKEND_WORKER + 'Services/ComboTrasladoPaciente';
      const response = await this.http.post<any>(url, "", { headers: headers }).toPromise();
      return response;
    } catch (e: any) {
      console.log(e);
      throw (e);
    }
  }

  public async ComboParentesco(): Promise<ITipoDocumento[]> {
    try {
      let headers = new HttpHeaders({
        'accept': 'application/json'
      });
      headers = new HttpHeaders().set('Content-Type', "application/json");
      const url = environment.BASE_BACKEND_WORKER + 'Services/ComboParentesco';
      const response = await this.http.post<any>(url, "", { headers: headers }).toPromise();
      return response;
    } catch (e: any) {
      console.log(e);
      throw (e);
    }
  }

  public async Combo_UsuarioP(idperfil: string = '3'): Promise<IUsuario[]> {
    try {
      let headers = new HttpHeaders({
        'accept': 'application/json'
      });
      headers = new HttpHeaders().set('Content-Type', "application/json");
      let url = environment.BASE_BACKEND_WORKER + 'Services/Combo_UsuarioP';
      url = url + "?idperfil=" + idperfil;
      const response = await this.http.post<any>(url, "", { headers: headers }).toPromise();
      return response;
    } catch (e: any) {
      console.log(e);
      throw (e);
    }
  }

  public async ListarTipoMoneda(): Promise<ITipoDocumento[]> {
    try {
      let headers = new HttpHeaders({
        'accept': 'application/json'
      });
      headers = new HttpHeaders().set('Content-Type', "application/json");
      const url = environment.BASE_BACKEND_WORKER + 'Services/ListarTipoMoneda';
      const response = await this.http.post<any>(url, "", { headers: headers }).toPromise();
      return response;
    } catch (e: any) {
      console.log(e);
      throw (e);
    }
  }

  public async TraerPersonaCoberPersona(idsiniestro: string = '', flag: string = ''): Promise<IPersonaCobertura[]> {
    try {
      let headers = new HttpHeaders({
        'accept': 'application/json'
      });
      headers = new HttpHeaders().set('Content-Type', "application/json");
      let url = environment.BASE_BACKEND_WORKER + 'Services/TraerPersonaCoberPersona';
      url = url + "?idsiniestro=" + idsiniestro;
      url = url + "&flag=" + flag;
      const response = await this.http.post<any>(url, "", { headers: headers }).toPromise();
      return response;
    } catch (e: any) {
      console.log(e);
      throw (e);
    }
  }

}
