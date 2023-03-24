import { HttpHeaders } from '@angular/common/http';

export interface IMockup {
  success: Array<any>;
  failures: Array<any>;
}

export interface IHttpParams {
  method: 'delete' | 'get' | 'put' | 'post';
  url: string;
  data?: any;
  customHeaders?: HttpHeaders;
}
