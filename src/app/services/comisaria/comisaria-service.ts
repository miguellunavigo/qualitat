import { HttpService } from 'src/app/services/http/http.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComisariaService {
  constructor(
    private http: HttpService,
  ) { }

  public listado(comisaria: string,NroDePagina: string,RegPorPag: string): Observable<any> {
    try {
      let headers = new HttpHeaders({
        'accept': 'application/json'
      }); 
      headers = new HttpHeaders().set('Content-Type', "application/json");
      const url = environment.BASE_BACKEND_WORKER + 'Services/ListarComisarias?comisaria='+comisaria+'&NroDePagina='+NroDePagina+'&RegPorPag='+RegPorPag;
      return  this.http.post(url,"",headers)
      
    } catch (e:any) {
      console.log(e);      
      throw(e);
    }
  }

  public obtener(idcomisaria : number): Observable<any> {
    try {
      let headers = new HttpHeaders({
        'accept': 'application/json'
      }); 
      headers = new HttpHeaders().set('Content-Type', "application/json");
      const url = environment.BASE_BACKEND_WORKER + 'Services/ListarComisaria?idcomisaria='+idcomisaria;
      return  this.http.post(url,"",headers)
      
    } catch (e:any) {
      console.log(e);      
      throw(e);
    }
  }

  public ActualizarComisaria(idcomisaria:string="",nombre:string="",direccion:string="",telefono:string="",ubigeo:string=""): Observable<any>{
    try {
      let headers = new HttpHeaders({
        'accept': 'application/json'
      });
      headers = new HttpHeaders().set('Content-Type', "application/json");
      //{idcomisaria:'785',nombre:'COMISARIA MEJIA',direccion:'AV. TAMBO S/N MZ H1 LOTE 8', telefono:'054555091', ubigeo:'473'}
      let url = environment.BASE_BACKEND_WORKER + 'Services/ActualizarComisaria';
      url = url +"?idcomisaria="+idcomisaria				
      url = url +"&nombre="+nombre
      url = url +"&direccion="+direccion   
      url = url +"&telefono="+telefono      
      url = url +"&ubigeo="+ubigeo      
            
      return this.http.post(url,"",headers)
    } catch (e:any) {
      //debugger
      console.log(e);
      throw(e);
    }

  }
  
  public ubigeo(vdescripcion : string): Observable<any> {
    try {
      let headers = new HttpHeaders({
        'accept': 'application/json'
      }); 
      headers = new HttpHeaders().set('Content-Type', "application/json");
      const url = environment.BASE_BACKEND_WORKER + 'Services/AutocompletarUbigeo?vdescripcion='+vdescripcion;
      return  this.http.post(url,"",headers)
      
    } catch (e:any) {
      console.log(e);      
      throw(e);
    }
  }
}
