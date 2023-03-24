import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { INVALID_CREDENTIALS_CODE, LOCKED_USER_BY_ADMIN_CODE, USER_INFO } from 'src/app/common/constants/auth.constants';
import { Router } from '@angular/router';
import { HOME_ROUTE } from 'src/app/common/constants/routes.constants';
import { IUserLogin, IUserLoginInfo } from 'src/app/common/interfaces/auth.interface';
import { IDataLoaded } from 'src/app/common/interfaces/default.interface';
// import { Storage } from '@ionic/storage-angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { CookieService } from 'ngx-cookie-service';
import { CacheService } from 'ionic-cache';

export class Profile {
  idPerfil: number = 0;   
  vnombrePerfil: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  isSignedIn: IDataLoaded;
  loginForm: FormGroup;
  documentNumberLength: number;
  usuarioPlaceholder: string;
  contraseniaPlaceholder: string;
  errorMessage: string;
  loginButtonDisabled: boolean;
  listProfile : Profile[] = null;
  errorLogin : boolean=false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router:Router,
    private cookieService: CookieService, 
    private cache: CacheService
  ) {
    this.isSignedIn = {
      isLoaded: true,
      hasErrors: false
    };
    this.loginForm = this.formBuilder.group({
      usuario: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required])),
    });
    this.errorMessage = '';
    this.usuarioPlaceholder = 'Escribe tu usuario';
    this.contraseniaPlaceholder = 'Escribe tu contraseña';
    this.loginButtonDisabled = true;
  }

  ngOnInit() {

  }

  ionViewDidEnter() {

  }

  ionViewWillLeave() {
    this.loginForm.reset();
    this.loginForm.enable();
    this.isSignedIn.isLoaded = true;
    this.errorMessage = '';
  }

  get usuario() { return this.loginForm.controls["usuario"] }

  get password() { return this.loginForm.controls["password"]; }

  public changepassword($event: any) {      
    if ($event.target.value.length > 3) {
      this.loginButtonDisabled = false;
    } else {
      this.loginButtonDisabled = true;
    }
  }

  public async signIn(loginInfo: IUserLoginInfo) {
    if (this.loginForm.valid && this.isSignedIn.isLoaded) {
      this.errorMessage = '';
      this.isSignedIn.isLoaded = false;
      this.isSignedIn.hasErrors = false;
      
      const loginInfoUp: IUserLogin = {
        usuario: loginInfo.usuario,        
        contra: loginInfo.password 
      };
      this.loginForm.disable();
      if (!this.validateProfile()){
        await this.validarIngreso(loginInfo.usuario,loginInfo.password) ;
      }else{
        await this.validarIngresoPerfil(loginInfo.idprofile) ;
      }
    }
  }

  validateProfile() : boolean{
    return this.listProfile != null;
  }

  async seleccionPerfil(idUsuario:any) {    
    this.listProfile = await this.userService.perfilesUsuario(idUsuario);
    this.isSignedIn.isLoaded = true;
    this.loginForm.removeControl('idprofile')
    this.loginForm.addControl('idprofile',new FormControl('', Validators.compose([Validators.required])));
  }

  async validarIngreso(usuario:string,password:string) {
    try { 

      
      var logeo = await this.authService.signIn(usuario,password);
      
      if (logeo[0].respuesta == 'true') {
        if (logeo[0].idusuario == "2") {
          this.cookieService.set("userperfil", "4",this.authService.myDateExpire);
          //         window.location = ".." + pathname + "GestionSiniestro/ListarSiniestro"
          this.cookieService.set("sesionlogin", 'user',this.authService.myDateExpire);
        } else if (logeo[0].idusuario == "3") {
          this.cookieService.set("userperfil", "10",this.authService.myDateExpire);
          this.cookieService.set("usercodigo", logeo[0].nomusuario);
          //         window.location = ".." + pathname + "OrdenTrabajo/ListarOrdenTrabajo"
          this.cookieService.set("sesionlogin", 'ruc',this.authService.myDateExpire)
        } else {
          this.isSignedIn.isLoaded = true;
          this.errorLogin = false ;
          await this.seleccionPerfil(logeo[0].idusuario);
        }        
      }
      else{
        if (logeo[0].respuesta == 'ruc') {
          //se establece perfil fijo porque es proveedor
          this.cookieService.set("userperfil", "10",this.authService.myDateExpire);
          this.cookieService.set("usercodigo", logeo[0].nomusuario,this.authService.myDateExpire);
          //         window.location = ".." + pathname + "OrdenTrabajo/ListarOrdenTrabajo"
          this.cookieService.set("sesionlogin", 'ruc',this.authService.myDateExpire)
        }
        else {
          this.isSignedIn.isLoaded = true;
          this.loginForm.enable();
          this.errorLogin = true ;
          //alert('Usuario y/o Password incorrectos');
        }
      }
      //
    } catch (err: any) {
      this.isSignedIn.hasErrors = true;
      this.isSignedIn.isLoaded = true;
      this.loginForm.enable();
      if (err.error) {
        this.loginButtonDisabled = true;
      }
      
      if (err.error && err.error === INVALID_CREDENTIALS_CODE) {
        this.errorMessage = err.message;
      } else if (err.error && err.error === LOCKED_USER_BY_ADMIN_CODE) {

      } else {

      }
    }
  }
  
  validarIngresoPerfil(idprofile:number) {
    this.isSignedIn.isLoaded = true;
    this.loginForm.disable();
     var usercodigo = '1';
     if (idprofile == 0) {
         alert('Seleccione Perfil');
     }
     else {
         this.cookieService.set("userperfil", idprofile.toString(),this.authService.myDateExpire);
         this.cookieService.set("nameperfil", this.listProfile.filter(p=>p.idPerfil==idprofile)[0].vnombrePerfil,this.authService.myDateExpire);                 
        this.listProfile.filter(p=>p.idPerfil==idprofile).values
         if (idprofile == 7) {
          this.router.navigate([`/${HOME_ROUTE}`], { state: { from: 'login' }, replaceUrl: true, queryParamsHandling: 'preserve'});
             //window.location = ".." + pathname + "OrdenTrabajo/ListadoSiniestro"
             this.cookieService.set("sesionlogin", 'user',this.authService.myDateExpire);
         } else {
             if (idprofile == 8 || idprofile == 9 || idprofile == 4  || idprofile == 11) {
              this.router.navigate([`/${HOME_ROUTE}`], { state: { from: 'login' }, replaceUrl: true, queryParamsHandling: 'preserve'});
                 //window.location = ".." + pathname + "GestionSiniestro/ListarSiniestro"
                 this.cookieService.set("sesionlogin", 'user',this.authService.myDateExpire);
             }
             else {
                 if (idprofile == 10) {
                  this.router.navigate([`/${HOME_ROUTE}`], { state: { from: 'login' }, replaceUrl: true, queryParamsHandling: 'preserve'});
                    //window.location = ".." + pathname + "OrdenTrabajo/ListarOrdenTrabajo"
                     this.cookieService.set("sesionlogin", 'ruc',this.authService.myDateExpire)
                 } else {
                     this.cookieService.set("usercodigo", usercodigo);
                     this.router.navigate([`/${HOME_ROUTE}`], { state: { from: 'login' }, replaceUrl: true, queryParamsHandling: 'preserve'});
                     //window.location = ".." + pathname + "Poliza/ListarPoliza"
                     this.cookieService.set("sesionlogin", 'user',this.authService.myDateExpire);
                 }
             }
         }
     }
  }
}
