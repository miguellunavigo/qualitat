import { Component} from '@angular/core';
import { MOBILE_BREAKPOINT, SCREEN_WIDTH } from 'src/app/common/constants/misc.constants';
import { MOBILE_HOME_BUTTONS} from 'src/app/common/constants/routes.constants';
import { ISideMenuButton } from 'src/app/common/interfaces/routes.interface';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { RESCUE_SESSION_TOKEN } from 'src/app/common/constants/auth.constants';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IUserDatos } from 'src/app/common/interfaces/auth.interface';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  nomperfil:string;
  homeButtons: ISideMenuButton[];
  userdatos: IUserDatos;
  constructor(
    public platform: Platform,  
    private router: Router,
    private authService:AuthService,
    private cookieService: CookieService
    ) {
    this.homeButtons = MOBILE_HOME_BUTTONS;
  }

  public get isDesktop(): boolean {    
    return window.innerWidth > MOBILE_BREAKPOINT;
  }

  async ngOnInit(){
    //JSON.stringify(token)
    this.userdatos = this.authService.getSessionToken();   
    this.nomperfil= this.cookieService.get("nameperfil");
    //debugger
  }
  async ionViewWillEnter() {
    
  }

  async ionViewDidEnter() {
    
  }

  get isMobile() {
    return window.innerWidth < SCREEN_WIDTH.TABLET;
  }

  redirecciona(url:any){
    //location.href=url;
    this.router.navigateByUrl(url,);

  }

  ngOnDestroy() {

  }
}
