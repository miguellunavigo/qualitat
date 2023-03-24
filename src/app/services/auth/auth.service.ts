//import { IOAuthTokens } from 'src/app/common/interfaces/auth.interface';
import { SIGN_IN_MOCK, REVOCATION_MOCK } from 'src/app/common/mocks/auth.mocks';
import { HttpService } from 'src/app/services/http/http.service';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
//import { IUserLogin } from 'src/app/common/interfaces/auth.interface';
import {
    CREATE_TOKEN,
    REFRESH_TOKEN,
    RESCUE_SESSION_TOKEN,
    USER_INFO,
    CREATE_TOKEN_PATH,
    REFRESH_TOKEN_PATH,
    RESCUE_TOKEN_EXPIRES,
    USER_ID,
    SECONDS_TO_MILLISECONDS,
    REFRESH_TOKEN_REQUEST_DIFFERENTIAL,
} from 'src/app/common/constants/auth.constants';
import { Subscription, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilsService } from 'src/app/services/utils/utils';
import { UserService } from 'src/app/services/user/user.service';

//import { INFORMATIVE_MODALS_VIEWED } from '@common/constants/misc.constants';
import { MENU_OPTIONS } from 'src/app/common/constants/routes.constants';
import { IUserDatos } from 'src/app/common/interfaces/auth.interface';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
  public myDateExpire: Date = new Date();

  public isLoggedIn: boolean;
  //public currentToken: IOAuthTokens;
  public userDatos : IUserDatos;
  public subscription: Subscription;
  public refreshTokenExpired: Subject<boolean>;
  public refreshTokenFailed!: boolean;
  public refreshTokenRunning!: boolean;
  public tokenExpiresMillis!: number;
  public refreshTokenExpiresMillis!: number;

  constructor(
    private http: HttpService,
    private userService: UserService,
    private cookieService: CookieService
    ) {
      this.myDateExpire.setHours( this.myDateExpire.getHours() + 1 );

    this.refreshTokenExpired = new Subject<boolean>();
  }

  public isAuthenticated(): boolean {
    //debugger
    this.checkIfReloadedPage();
    //return this.currentToken !== null && this.currentToken !== undefined;
    return this.userDatos !== null && this.userDatos !== undefined;
  }

  private checkIfReloadedPage(): void {
    //debugger
    if (!this.userDatos) {
      if (this.cookieService.get(RESCUE_SESSION_TOKEN)!=""){
        const token = this.getSessionToken();
        if (token) {
          this.setSessionInfo(token);
          UtilsService.setInformativeModalsViewed();
        }
      }
    }
    if (!this.tokenExpiresMillis || !this.refreshTokenExpiresMillis) {
      if (this.cookieService.get(RESCUE_TOKEN_EXPIRES)!=""){
        const tokenExpires = this.getSessionTokenExpires();
        if (tokenExpires) {
          this.setTokenExpires(tokenExpires);
          UtilsService.setInformativeModalsViewed();
        }
      }
    }
  }

  public async signIn(usuario: string, contra:string): Promise<any> {
    //debugger    
    //this.storage.set(USER_INFO, {usuario:usuario,contra:contra});
    return await this.generateToken(usuario,contra, CREATE_TOKEN);
  }

  public async signOut(): Promise<void> {
    //debugger
    //let headers = {} as HttpHeaders;
    //const identifier = this.identifier;
    //headers = new HttpHeaders().set('Identifier', identifier.toString());
    //headers = headers.set('Channel', this.utilsService.getChannelCode());
    //const encodedObject = { revokeToken: this.currentToken ? this.currentToken.refreshToken : localStorage.getItem(RESCUE_SESSION_TOKEN) };
    //const url = environment.BASE_BACKEND_WORKER + '/admin/user/revoke/token';

    //await this.http.post(url, encodedObject, headers).toPromise();
    this.cleanSessionInfo();
    return Promise.resolve();
  }

  // public async signOut_two(): Promise<void> {
  //   debugger
  //   let headers = {} as HttpHeaders;
  //   //const identifier = UtilsService.getIdentifier();
  //   const refreshToken = this.getTokenRefreshLogout();

  //   //headers = new HttpHeaders().set('Identifier', identifier.toString());
  //   //headers = headers.set('Channel', this.utilsService.getChannelCode());
  //   const encodedObject = { revokeToken: refreshToken };



  //   const url = environment.BASE_BACKEND_WORKER + '/admin/user/revoke/token';

  //   await this.http.post(url, encodedObject, headers).toPromise();
  //   this.cleanSessionInfo();
  //   return Promise.resolve();
  // }

  public setTokenExpires(tokenExpires: { token: number, refresh: number }): void {
    //debugger
    this.tokenExpiresMillis = tokenExpires.token;
    this.refreshTokenExpiresMillis = tokenExpires.refresh;
    this.cookieService.set(RESCUE_TOKEN_EXPIRES, JSON.stringify({
      token: this.tokenExpiresMillis,
      refresh: this.refreshTokenExpiresMillis
    }),this.myDateExpire);
  }

  public async refreshIfTokenIsInvalid(): Promise<boolean> {
    //debugger
    if (!this.userDatos) { return false; }
    const currentTime = Date.now();
    if (currentTime >= this.refreshTokenExpiresMillis) {
      if (!this.refreshTokenFailed) { this.refreshTokenExpired.next(true); }
      return this.refreshTokenFailed = true;
    }
    if (currentTime >= this.tokenExpiresMillis && !this.refreshTokenRunning) {
      this.refreshTokenRunning = true;
      //const requestBody = { refreshToken: this.currentToken.refreshToken };
      //await this.generateToken(requestBody, REFRESH_TOKEN);
      this.refreshTokenRunning = false;
      return false;
    }
    return false;
  }
  
  public async refreshToken(): Promise<boolean> {   
    if (!this.userDatos) { return false; }
    this.refreshTokenRunning = true;
    //const requestBody = { refreshToken: this.currentToken.refreshToken };
    //await this.generateToken(requestBody, REFRESH_TOKEN);
    this.refreshTokenRunning = false;
    return false;
  }

  private async generateToken(usuario: string,contra:string, serviceType: number): Promise<void> {
    try {
      let headers = new HttpHeaders({
        'accept': 'application/json'
      }); 
      headers = headers.set('Content-Type', "application/json");
      headers = headers.set('Access-Control-Allow-Origin', "*");
      headers = headers.set('Access-Control-Allow-Methods', "GET,PUT,POST,DELETE");
      const url = environment.BASE_BACKEND_WORKER + 'Services/ValidarLogin?usuario='+usuario+'&contra='+contra;
      const token = await this.http.post(url,"",headers).toPromise();      
      this.setSessionInfo(token[0]);
      return token;
    } catch (e:any) {
      console.log(e);      
      this.refreshTokenFailed = true;
      this.refreshTokenExpired.next(true);
    }
  }

  public getSessionToken(): IUserDatos {
    //debugger
    return JSON.parse(this.cookieService.get(RESCUE_SESSION_TOKEN));
  }

  public getUserIdToken(): string {
    //debugger
    return this.cookieService.get(USER_ID);
  }

  public getTokenRefreshLogout(): string {    
    return localStorage.getItem(RESCUE_SESSION_TOKEN);
  }

  public setSaveUserIdToken(): string {
    return this.cookieService.get(USER_ID);
  }

  private getSessionTokenExpires(): { token: number, refresh: number } {
    return JSON.parse(this.cookieService.get(RESCUE_TOKEN_EXPIRES));
  }


  public setSessionInfo(token: IUserDatos): void {    
    this.userDatos = token;
    this.cookieService.set(RESCUE_SESSION_TOKEN, JSON.stringify(token),this.myDateExpire);
    this.cookieService.set(USER_ID, `${token.idusuario}`,this.myDateExpire);
    this.refreshTokenFailed = false;
     this.setTokenExpires({
       token: Date.now() + 100000000,//REFRESH_TOKEN_REQUEST_DIFFERENTIAL * this.currentToken.expiresIn * SECONDS_TO_MILLISECONDS,
       refresh: Date.now() + 1000000 //this.currentToken.refreshExpiresIn * SECONDS_TO_MILLISECONDS,
     });
  }

  
  private cleanSessionInfo(): void {
    //debugger
    this.userService.userInformation = null;
    this.userDatos = null ;
    //this.openAccountService.resetVars();
    this.cookieService.delete(RESCUE_SESSION_TOKEN);
    //this.cookieService.removeItem(RESCUE_IDENTIFIER);

    //this.storage.remove(USER_INFO);
    this.cookieService.deleteAll();
    this.cookieService.delete(RESCUE_TOKEN_EXPIRES);
    this.cookieService.delete(USER_ID);

    //this.cookieService.removeItem(INFORMATIVE_MODALS_VIEWED);
    localStorage.removeItem(MENU_OPTIONS);

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
