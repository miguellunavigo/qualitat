export class ISelectedSiniestro {
  editsiniestro: boolean = false;
  idsiniestro: string = "";
  icodigorenovacion: string = "";
}

export class IImagenProcuracion {
  idimagen: string = "";
  descripcion: string = "";
  hora: string = "";
}
export class ISeccionProcuracion{
  descripcion: string = "";
  idseccion:number=0;
  imagenes:IImagenProcuracion[];
  nombre:string="";

}

export class ISelectedSiniestroCobertura {
  smcausa: string = "";
  iddetallecausa: string = "";
  idplan: string = "";
}

export class IReserva {
  TipoTran: string = "";
  codTipoTran: string = "";
  dcMontoAjuste: string = "";
  dcMontoPagadoTotal: string = "";
  dcMontoReserva: string = "";
  dcMontoToal: string = "";
  dcMontoTotalSinIgv: string = "";
  fechRegistro: string = "";
  idprincipal: string = "";
  maxAmpliacion: string = "";
  proveedor: string = "";
  reservaInicial: string = "";
  saldoCobertura: string = "";
  smidcobertura: string = "";
  vnro_doc: string = "";
}


