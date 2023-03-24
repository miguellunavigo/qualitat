export class ICausa {
  smcausa: string = "";
  smcobgeneral: string = "";
  vdescripcion: string = "";
}

export class IDetalleCausa {
  idetallecausa: string = "";
  smcausa: string = "";
  smcobgeneral: string = "";
  smtipobeneficiario: number = 0;
  vdescripcion: string = "";
}

export class IConsecuencia {
  idConsecuencia: string = "";
  vDescripcion: string = "";
}

export class IAnalista {
  nidUsuario: string = "";
  nombresusu: string = "";
}

export class IAseguradora {
  smidciaseguros: string = "";
  vdescripcion: string = "";
}

export class ITipoDeclarante {
  idTipoDeclarante: string = "";
  vDescripcion: string = "";
}

export class ITipoDocumento {
  smiddetalle: string = "";
  vdescripcion: string = "";
}

export class IParentesco {
  idParentesco: string = "";
  vDescripcion: string = "";
}

export class IComisaria {
  TotalRegistros: number = 0;
  idcomisaria: number = 0;
  vdescripcion: string = "";
  vdireccion: string = "";
}

export class IDatoSiniestro {
  apreciacionSiniestros:string="";
  hechosSiniestros:string="";
  idetallecausa:number = 0;
  idetallecausadesc:string = "";
  idmarca:number = 0;
  idmodelo:number = 0;
  idplan:number = 0;
  idsemaforo:number = 0;
  idvehiculo:number = 0;
  iocupantes:number = 0;
  marca:string = "";
  modelo:string = "";
  nidusuario:string = "";
  smcausa:number = 0;
  smcausadesc:string = "";
  smcobgeneral:number = 0;
  smianiofabricacion:number = 0;
  vplaca:string = "";
}

export class ICobertura{
  coberturageneral:string = "";
  sumaAsegurada:string = "";
  saldoreserva:string = "";
  deducible:string = "";
  persona:string = "";
  estado:string = "";
  dtfecregistro:string = "";
}

export class ICoberturaGeneral {
  smcobgeneral: string = "";
  smcobgeneralList: string = "";
  vdescripcion: string = "";
}

export class ISumaAsegurada {
  dcminimo: number = 0;
  dcminimoOT: string = "";
  dcporcentajeOT: string = "";
  idetallecausa: number = 0;
  porcentajeDedu: number = 0;
  respuesta: string = "";
  smcausa: number = 0;
  smcobgeneral: string = "";
  smidcobertura: number = 0;
  smiddeducible: number = 0;
  sumaAsegurada: string = "";
  vdescripcion: string = "";
}

export class IDeducibleMultiple {
  dcminimo: number = 0;
  smiddeducible: number = 0;
  vdescripcion: string = "";
}

export class IVerificarPersonaCobertura {
  cantidadLiquidaciones: string = "";
  contra: string = "";
  estado: string = "";
  idVehOtros: number = 0;
  idampliacion: number = 0;
  idcobsiniestro: string = "";
  idliquidacion: number = 0;
  idmarca: string = "";
  idordenatencion: string = "";
  idpagodirecto: number = 0;
  idperfil: number = 0;
  idtarifa: number = 0;
  idusuario: string = "";
  montoAsegurado: string = "";
  nomusuario: string = "";
  nrolesionados: string = "";
  numOcupantes: string  = "";
  respuesta: string = "";
  smcobgeneral: string = "";
  smidcobertura: string = "";
  ultimoEstado: string = "";
  usuario: string = "";
  vplaca: string = "";
}

export class IDcminimo {
  dcminimo: number = 0;
  dcminimoOT: string = "";
  dcporcentajeOT: string = "";
  idetallecausa: number = 0;
  porcentajeDedu: number = 0;
  respuesta: string = "";
  smcausa: number = 0;
  smcobgeneral: string = "";
  smidcobertura: number = 0;
  smiddeducible: number = 0;
  sumaAsegurada: string = "";
  vdescripcion: string = "";
}

export class IPolizaVehiculo {
  Estado: string = "";
  aniofab: string = "";
  asientos: string = "";
  clase: string = "";
  claseVeh: string = "";
  color: string = "";
  desumaasegurada: string = "";
  icodigorenovacion: string = "";
  idestado: string = "";
  idmarca: string = "";
  idplan: string = "";
  idpoliza: string = "";
  idtipoveh: string = "";
  idvehiculo: string = "";
  kilometraje: string = "";
  marca: string = "";
  modelo: string = "";
  motor: string = "";
  persona: string = "";
  placa: string = "";
  planPoliza: string = "";
  smidciaseguros: string = "";
  suma: string = "";
  tipouso: string = "";
  vigencia: string = "";
  vin: string = "";
}

export class IPersonaCobertura{
  apellidoMa: string = "";
  apellidoPa: string = "";
  celular: string = "";
  dcperitaje: string = "";
  dfechafallecimiento: string = "";
  direccion: string = "";
  email: string = "";
  fechanac: string = "";
  flagper: string = "";
  idasegurado: string = "";
  idauditor: string = "";
  idconductor: string = "";
  idpersona: string = "";
  nomasegurado: string = "";
  nombre: string = "";
  nomconductor: string = "";
  nrodocumento: string = "";
  persona: string = "";
  sexo: string = "";
  smidtablalugarveh: string = "";
  smidtablamoneda: string = "";
  smidtablaparentesco: string = "";
  smidtablatraslado: string = "";
  vobservacion: string = "";
}
