import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IHttpParams, IMockup } from 'src/app/common/interfaces/http.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private httpSuccessCode = 200;
  private httpFailureCode = 400;
  private headers = new HttpHeaders();

  constructor(private http: HttpClient) {}

  private mockedResponse(mockup: IMockup): Observable<any> {
    let responseStatus="success";
    let responseNumber = 0;
    if (mockup.success) {
      responseStatus = (mockup.failures && (Math.random() > environment.MOCK_SUCCESS_RATE)) ? 'failures' : 'success';
      responseNumber = Math.floor(Math.random() * mockup[(mockup.failures && (Math.random() > environment.MOCK_SUCCESS_RATE)) ? 'failures' : 'success'].length);
    } else {
       responseStatus = 'failures'; 
       responseNumber = Math.floor(Math.random() * mockup["failures"].length);
    }

     
    const responseOptionsParams = {
      status: responseStatus === 'success' ? this.httpSuccessCode : this.httpFailureCode,
      body:"",
      error:""
    };
    if (responseStatus === 'success') {
      responseOptionsParams['body'] = mockup["success"][responseNumber];
    } else {
      responseOptionsParams['error'] = mockup["failures"][responseNumber];
    }
    const response = new HttpResponse(responseOptionsParams);
    const responseError = new HttpErrorResponse(responseOptionsParams);
    return responseStatus === 'success' ? of(response.body).pipe(delay(environment.MOCK_DELAY_MILISECONDS))
      : throwError(responseError.error);
  }

  private httpCall({ method, url, data, customHeaders }: IHttpParams): Observable<any> {   
    const header = customHeaders ? customHeaders : this.headers;
    //if (environment.USING_MOCKS) { return this.mockedResponse(mockup); }
    if (method === 'delete') { 
      return this.http[method]<any>(url, { headers: header }); 
    }else if ( method === 'get') { 
      return this.http[method]<any>(url, { headers: header }); 
    }
    return this.http[method]<any>(url, data, { headers: header });
  }

  public delete(url: string, customHeaders?: HttpHeaders): Observable<any> {
    return this.httpCall({ method: 'delete', url, data: false, customHeaders });
  }

  public get(url: string,  customHeaders?: HttpHeaders): Observable<any> {
    return this.httpCall({ method: 'get', url, data: false, customHeaders });
  }

  public post(url: string, data: any,  customHeaders?: HttpHeaders): Observable<any> {
    return this.httpCall({ method: 'post', url, data, customHeaders });    
  }

  public put(url: string, data: any,  customHeaders?: HttpHeaders): Observable<any> {
    return this.httpCall({ method: 'put', url, data, customHeaders });
  }
}

