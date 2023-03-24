import { Subject, Subscription } from 'rxjs';
import { Component, HostListener, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IDLE_EXIT_AFTER_WARNING_TIMEOUT, SCREEN_WIDTH } from 'src/app/common/constants/misc.constants';
import {
  IDLE_SESSION_WARNING_MODAL_PROPS, SIGNOUT_WARNING_MODAL_PROPS
} from 'src/app/common/constants/modal-props.constants';
import { INACTIVITY_CLOSED_SESSION_STORAGE_KEY, RESCUE_SESSION_TOKEN } from 'src/app/common/constants/auth.constants';
import {
  LOGIN_ROUTE,
  HOME_ROUTE,
  MOBILE_MENU_HOME_BUTTONS,
} from 'src/app/common/constants/routes.constants';
import { ISideMenuButton } from 'src/app/common/interfaces/routes.interface';
import { IUserInformation } from 'src/app/common/interfaces/user.interface';
import { GenericModalComponent } from 'src/app/components/generic-modal/generic-modal.component';
import { IonSlides, MenuController, ModalController } from '@ionic/angular';
// import { Storage } from '@ionic/storage-angular';

import { AuthService } from 'src/app/services/auth/auth.service';

import { IdleService } from 'src/app/services/idle/idle.service';
import { UserService } from 'src/app/services/user/user.service';
import { UtilsService } from 'src/app/services/utils/utils';

import { IUserDatos, IUserLogin } from 'src/app/common/interfaces/auth.interface';
//import { USER_INFO } from 'src/app/common/constants/auth.constants';

//import { MenuOptionsService } from 'src/app/services/menu-options/menu-options.service';
//import { DeviceService } from 'src/app/services/device/device.service';


import { LOTTIE_CONFIG } from 'src/app/services/utils/utils';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})

export class MainPage implements OnInit, OnDestroy {

  side: string;
  menuButtons: ISideMenuButton[];
  subscription: Subscription;
  currentRoute: string;
  userInformation: IUserInformation;
  warningStream: boolean;
  idleModal: HTMLIonModalElement;
  counterValue: number;
  counterSource: Subject<string>;
  userInfo: IUserLogin;
  userdatos: IUserDatos;
  loading: boolean;
  modalFlag: boolean;
  customerType: string;
  @ViewChild(IonSlides) slides: IonSlides;
  @HostListener('window:resize', ['$event'])
  onResize() {
    //this.updateMenuSide();
  }

  get customerTypeFormatted() { return this.customerType ? this.customerType.toLowerCase() : '' }

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private modalCtrl: ModalController,
    private idleService: IdleService,
    // private storage: Storage,
    // private utilsService: UtilsService,
    // private menuOptionsService: MenuOptionsService,
    // private deviceService: DeviceService,
    //private menu: MenuController,
  ) {
    this.menuButtons = MOBILE_MENU_HOME_BUTTONS;
    this.currentRoute = '';
    this.counterSource = new Subject<string>();
    //this.updateMenuSide();
    //Object.defineProperty(window, 'configuration', { value: {} });
    this.loading = true;
  }


  async ngOnInit() {
    
    this.userdatos = this.authService.getSessionToken();
    


    this.subscription = new Subscription();
    ///this.subscription.add(this.router.events.subscribe(async (event: NavigationEnd) => {
    //debugger
    this.subscription.add(this.router.events.subscribe(async () => {      
      if (this instanceof NavigationEnd) {
        this.currentRoute = this.urlAfterRedirects;
        if (this.urlAfterRedirects === `/${LOGIN_ROUTE}`) { this.stopWatching(); }
      }
    }));

    this.currentRoute = this.router.url;
    if (this.currentRoute !== `/${HOME_ROUTE}`) {
      UtilsService.setInformativeModalsViewed();
    }

    this.subscription.add(
      this.idleService.onTimerStart().subscribe(async () => {
        if (!this.warningStream) {
          //COLOCAR EL SIGNOUT
          await this.closeModal();          
          this.showIdleSessionWarningModal();
        }
        this.counterSource.next(`Se cerrará la sesión en ${this.counterValue} segundos`);
        this.counterValue = this.counterValue > 0 ? this.counterValue - 1 : this.counterValue;
        this.warningStream = true;
      })
    );

    this.subscription.add(
      this.idleService.onTimeout().subscribe(() => {             
        if (this.idleModal) {
          this.modalCtrl.dismiss();
        }
        this.signOut(true);
      })
    );
    
    this.authService.refreshTokenExpired.subscribe((failed: boolean) => {
      if (failed) {
        this.signOut(true);
      }
    });
  }

  public lottieConfig: object = LOTTIE_CONFIG;
  public lottieHeight: number = LOTTIE_CONFIG.sizes.big.height;
  public lottieWidth: number = LOTTIE_CONFIG.sizes.big.width;

  async ionViewWillEnter() {
    try {

       await Promise.all([
         //this.userService.getUserInformation(),
         //this.storage.get(USER_INFO),
         //this.deviceService.getIP()f
       ]).then();

      //this.userInformation = this.userService.userInformation;
    } catch (e) {
      console.error(e);
    }

    this.startWatching();
    this.idleModal = null;
    this.warningStream = false;
    //debugger
    //this.userInfo = await this.storage.get(USER_INFO);
  }
  

  //private updateMenuSide() {
//    this.side = window.innerWidth > SCREEN_WIDTH.MOBILE ? 'start' : 'end';
//  }

  public async signOut(inactivity: boolean = false) {
    debugger
    if (inactivity) { sessionStorage.setItem(INACTIVITY_CLOSED_SESSION_STORAGE_KEY, 'true'); }
    await this.authService.signOut();
    this.warningStream = true;
    this.router.navigateByUrl(LOGIN_ROUTE, { replaceUrl: true });
  }

  public async openSignoutModal() {
    const signoutModal = await this.modalCtrl.create({
      component: GenericModalComponent,
      cssClass: 'form-modal',
      componentProps: SIGNOUT_WARNING_MODAL_PROPS,
    });
    await signoutModal.present();
    const option = await signoutModal.onDidDismiss();
    if (option.data === 'primaryButtonPressed') {
      this.signOut();
    }
  }

  public async closeModal() {
    const isModalOpen = await this.modalCtrl.getTop();
    if (isModalOpen) {
      await this.modalCtrl.dismiss();
    }
  }

  async navigateToRoute(viewPath: string) {
    if (this.currentRoute !== viewPath) {
      this.currentRoute=viewPath;
      this.router.navigateByUrl(viewPath);     
    }
  }

  private async showIdleSessionWarningModal() {
    if (!this.idleModal && !this.modalFlag) {
      this.modalFlag = true;
      this.idleModal = await this.modalCtrl.create({
        component: GenericModalComponent,
        cssClass: 'form-modal',
        componentProps: { ...IDLE_SESSION_WARNING_MODAL_PROPS, dynamicSource: this.counterSource.asObservable() },
      });
      if (this.currentRoute !== `/${LOGIN_ROUTE}`) {
        await this.idleModal.present();
        const option = await this.idleModal.onDidDismiss();
        if (option.data === 'secondaryButtonPressed') {
          this.signOut();
        } else {
          this.authService.refreshToken();
        }
        this.modalFlag = false;
        this.resetTimer();
        this.warningStream = false;
        this.idleModal = null;
      }
    }
  }

  private stopWatching() {
    this.idleService.stopWatching();
    this.counterValue = IDLE_EXIT_AFTER_WARNING_TIMEOUT;
  }

  private startWatching() {
    this.idleService.startWatching();
    this.counterValue = IDLE_EXIT_AFTER_WARNING_TIMEOUT;
  }

  private resetTimer() {
    this.idleService.resetTimer();
    this.counterValue = IDLE_EXIT_AFTER_WARNING_TIMEOUT;
  }

  public async goToView(page?: string, params?: any) {
    if (page.includes('https://') || page.includes('http://')) {
      window.open(page);
      return;
    }
  }

  ionViewWillLeave() {
    this.stopWatching();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
