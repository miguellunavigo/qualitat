
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable()
export class MethodInterceptor implements HttpInterceptor {

  constructor(public router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {        
    if (request.method === 'POST' || request.method === 'PUT') {            
      if (request.body instanceof FormData) {
      }
      else {
        request = request.clone({
          setHeaders: {'Content-Type':  'application/json'},
          body: request.body,
        });
      }
    } else {
      request = request.clone({
            setHeaders: {
              'Content-Type':  'application/json',
            },
            body: request.body,
          });
    }      
    return next.handle(request).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }
}
