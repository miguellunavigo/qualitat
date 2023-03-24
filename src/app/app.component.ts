import { Component, OnDestroy } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GenericModalComponent } from 'src/app/components/generic-modal/generic-modal.component';
import { TAMPERED_DEVICE_PROPS } from 'src/app/common/constants/modal-props.constants';
import { LOTTIE_CONFIG } from 'src/app/services/utils/utils';
import { Subscription } from 'rxjs/internal/Subscription';
import { NavigationStart, Router } from '@angular/router';
import { CacheService } from "ionic-cache";

declare const IRoot:any;

export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnDestroy {

  statusBarBackgroundColor = '#F4F4F4';
  subscription: Subscription;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private modalCtrl: ModalController,
    private router: Router,
    cache: CacheService
  ) {
    cache.setDefaultTTL(60 * 60); //set default cache TTL for 1 hour    
    this.detectTamperedDevices();
    this.initializeApp();
    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
      }
    });
    
  }

  public lottieConfig: object = LOTTIE_CONFIG;
  public lottieHeight: number = LOTTIE_CONFIG.sizes.big.height;
  public lottieWidth: number = LOTTIE_CONFIG.sizes.big.width;

  public initializeApp() {
    this.platform.ready().then((source) => {
      if (source === 'cordova') {
        (window as any).nativeOpen = window.open;
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        this.statusBar.backgroundColorByHexString(this.statusBarBackgroundColor);
      }
    });
  }

  public tamperModalCheck = async () => {
    const modal = await this.modalCtrl.create({
      component: GenericModalComponent,
      cssClass: 'rooted-modal',
      componentProps: TAMPERED_DEVICE_PROPS
    });
    await modal.present();
  }

  public detectTamperedDevices() {
    this.platform.ready().then((source) => {
      if (source === 'cordova') {
        IRoot.isRooted(this.tamperSuccessCallback, this.tamperErrorCallback);
      }
    });
  }

  public tamperErrorCallback = async () => this.tamperModalCheck();

  public tamperSuccessCallback = async (tampered:any) => {
    if (tampered) {
      await this.tamperModalCheck();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}


// import { Component } from '@angular/core';
// @Component({
//   selector: 'app-root',
//   templateUrl: 'app.component.html',
//   styleUrls: ['app.component.scss'],
// })
// export class AppComponent {
//   public appPages = [
//     { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
//     { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
//     { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
//     { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
//     { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
//     { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
//   ];
//   public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
//   constructor() {}
// }
