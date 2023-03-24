import { Injectable } from '@angular/core';
// import * as _ from 'lodash';
//import { RESCUE_IDENTIFIER } from '@common/constants/auth.constants';
// import {
//   MOBILE_BREAKPOINT
// } from 'src/app/common/constants/misc.constants';
// import { PdfService } from 'src/app/services/pdf/pdf.service';
import { AlertController } from '@ionic/angular';
// import { FileOpener } from '@ionic-native/file-opener/ngx';
// import { AlertService } from 'src/app/services/alert/alert.service';
import { Router } from '@angular/router';
import { DEFAULT_MSG_ERROR, HEADER_ERROR } from 'src/app/common/utils/utils.constants';
import { DomSanitizer } from '@angular/platform-browser';
import { Platform, ToastController } from '@ionic/angular';
// import { SocialSharing } from '@ionic-native/social-sharing/ngx';
// import { Coordinates } from '@ionic-native/geolocation/ngx';
//import { format } from 'date-fns';
import { Platforms } from '@ionic/core/dist/types/utils/platform';

const FOUR = 4;

@Injectable()
export class UtilsService {

  //static pdfService: PdfService;
  public nativeAndroid: boolean = false;
  public nativeIos: boolean = false;
  public iosWeb: boolean = false;
  public desktop: boolean = false;
  public androidWeb: boolean = false;

  constructor(
    private platform: Platform,
    //private fileOpener: FileOpener,
    //private alertService: AlertService,
    private alertCtrl: AlertController,
    private sanitizer: DomSanitizer,
    //private router: Router,
    //private toastController: ToastController,
    // private socialSharing: SocialSharing,
  ) {
    this.nativeAndroid = (this.platform.is('cordova') && this.platform.is('android'));
    this.nativeIos = (this.platform.is('cordova') && this.platform.is('ios'));
    this.iosWeb = (this.platform.is('ios') && this.platform.is('mobileweb'));
    this.androidWeb = (this.platform.is('android') && this.platform.is('mobileweb'));
    this.desktop = this.platform.is('desktop');
  }


  // static encodeJSONToWWWUrlForm(object: object, extraFixedOptions: string = '') {
  //   let urlEncoded = '';
  //   for (const key in object) {
  //     if (object.hasOwnProperty(key)) {
  //       urlEncoded += encodeURIComponent(key) + '=' + encodeURIComponent(object[key]) + '&';
  //     }
  //   }
  //   urlEncoded += extraFixedOptions;
  //   return urlEncoded;
  // }

  // tslint:disable:no-magic-numbers no-bitwise
  static getUUIDV4() {
    let date = new Date().getTime();
    let newDate = (performance && performance.now && (performance.now() * 1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let random = Math.random() * 16;
        if (date > 0) {
          random = (date + random) % 16 | 0;
          date = Math.floor(date / 16);
        } else {
          random = (newDate + random) % 16 | 0;
          newDate = Math.floor(newDate / 16);
        }
        return (c === 'x' ? random : (random & 0x3 | 0x8)).toString(16);
    });
  }

  // static getDistanceFromLatLonInKm(firstCoordinate: Coordinates, secondCoordinate: Coordinates) {
  //   const cos = Math.cos;
  //   const haversine = 0.5 - cos((secondCoordinate.latitude - firstCoordinate.latitude) * MATH_RADIANS) / 2 +
  //     cos(firstCoordinate.latitude * MATH_RADIANS) * cos(secondCoordinate.latitude * MATH_RADIANS) *
  //     (1 - cos((secondCoordinate.longitude - firstCoordinate.longitude) * MATH_RADIANS)) / 2;
  //   return EARTH_DIAMETER_IN_KM * Math.asin(Math.sqrt(haversine));
  // }

  static addDistanceUnit(distance: number) {
    const unit = distance < 1 ? ' mts' : ' km';
    const kmInMeters = 1000;
    const fixedDistance = distance < 1 ? Math.ceil((distance * kmInMeters)) : Number(distance.toFixed(1));
    return fixedDistance + unit;
  }

  // static formatDateForGoogleCalendar(paymentDate) {
  //   const DATE_REGEX_FOR_G_CALENDAR = /(-)|(T.*)/g;
  //   const convertedDate = UtilsService.dateConvert(paymentDate);
  //   const dateEnd = new Date(convertedDate.getTime() + 24 * 60 * 60 * 1000);
  //   return `${convertedDate.toJSON().replace(DATE_REGEX_FOR_G_CALENDAR, '')}` +
  //     `/${dateEnd.toJSON().replace(DATE_REGEX_FOR_G_CALENDAR, '')}`;
  // }
  // tslint:enable:no-magic-numbers no-bitwise

  static setInformativeModalsViewed() {
    //sessionStorage.setItem(INFORMATIVE_MODALS_VIEWED, 'true');
  }

  // static getIdentifier(): number {
  //   debugger
  //   return JSON.parse(sessionStorage.getItem(RESCUE_IDENTIFIER)) || '';
  //}


  // static dateConvert(dateString) {
  //   const [day, month, year] = dateString.split('/');
  //   const date = new Date(Number(year), Number(month) - 1, Number(day));
  //   return date;
  // }

  static showRecaptchaBadge() {
    document.body.classList.add('recaptcha');
  }

  static hideRecaptchaBadge() {
    document.body.classList.remove('recaptcha');
  }

  static isPdfUrl(url: string): boolean {
    return url.includes('.pdf');
  }

  // static viewportLabel(): string {
  //   return window.innerWidth > MOBILE_BREAKPOINT ? 'Desktop' : 'Mobile';
  // }

  // static isDesktop(): boolean {
  //   return window.innerWidth > MOBILE_BREAKPOINT;
  // }

  static checkOnlyNumbers($event: any) {
    const regex = /[0-9]+/g;
    const resp = $event.target.value.match(regex);
    return $event.target.value = resp ? resp.join('') : '';
  }

  static checkNoRepeatNumbers($event: any) {

    const regex = /^(?!.*(.)\1)/;
    const resp = $event.target.value.match(regex);
    return $event.target.value = resp ? resp.join('') : '';

  }


  static OStype() {
    let OSName = 'Unknown OS';
    if (navigator.appVersion.indexOf('Win') !== -1) {
      return 'Windows';
    }
    if (navigator.appVersion.indexOf('Mac') !== -1) {
      return 'MacOS';
    }
    if (navigator.appVersion.indexOf('X11') !== -1) {
      return 'UNIX';
    }
    OSName = navigator.userAgent || navigator.vendor;
    if (/windows phone/i.test(OSName)) {
      return 'Windows Phone';
    }
    if (/android/i.test(OSName)) {
      return 'Android';
    }
    if (/iPad|iPhone|iPod/.test(OSName)) {
      return 'iOS';
    }
    if (navigator.appVersion.indexOf('Linux') !== -1) {
      return 'Linux';
    }
    return OSName;
  }

  static capitalizeWords(text: string) {
    return text.toLowerCase().replace(/(?:^|\s)\S/g, (word) => word.toUpperCase());
  }

  static formatUserId(dNumber: string, dType: string) {
    return `${dType}-${dNumber}`;
  }



  public async showError(error?: string, header?: string, button?: string) {
    const alert = await this.alertCtrl.create({
      header: header || HEADER_ERROR,
      subHeader: error || DEFAULT_MSG_ERROR,
      buttons: [button || 'Cerrar']
    });
    await alert.present();
  }

  // public formatDate(date: Date, formatDate: string = 'DD/MM/YYYY'): string {
  //   return format(date, formatDate);
  // }

  // public changeTimezone(date, ianatz = 'America/Santiago', reverse: boolean = false) {
  //   const invdate = new Date(date.toLocaleString('en-US', {
  //     timeZone: ianatz
  //   }));
  //   const diff = date.getTime() - invdate.getTime();
  //   return reverse ? new Date(date.getTime() - diff) : new Date(date.getTime() + diff);
  // }

  // public openRedirectPath(url: string) {
  //   UtilsService.isPdfUrl(url) ? this.openPdf(url) : window.open(url, '_blank');
  // }

  // public openPdf(pdfUrl: string): void {
  //   if (!this.nativeAndroid) {
  //     window.open(pdfUrl, '_blank');
  //   } else {
  //     if (pdfUrl.includes('https://')) {
  //       window['nativeOpen'](pdfUrl, '_system');
  //     } else {
  //       this.fileOpener.open(pdfUrl, 'application/pdf')
  //         .catch(() => {
  //           this.alertService.openErrorAlert(this.router.url, false, true);
  //         });
  //     }
  //   }
  // }

  public isNative(): boolean {
    return this.platform.is('cordova');
  }

  public isNativePlatform(platform: Platforms): boolean {
    return this.platform.is('cordova') && this.platform.is(platform);
  }

  public getNativeStoreUrl(): string {
    if (this.isNativePlatform('android')) {
      return 'com.qualitat.genesis.vehicular';
    } else if (this.isNativePlatform('ios')) {
      return 'id1425352352';
    }
    return 'web';
  }

  public getChannelCode(): string {
    return "";//return this.isNative() === true ? CHANNEL_CODE_PWA_APP : CHANNEL_CODE;
  }

  public sanitizeHtml(html:any) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  public getHtmlContent(html:any) {
    return html.replace(/<\/?[^>]+(>|$)/g, '');
  }

  public getScssUrl(url: string) {
    if (url) {
      return 'url(\'' + url.trim() + '\')';
    }
    return 'url(undefined)';
  }

  // public async shareData(data: string, title: string = null, file: string = null, url: string = null): Promise<void> {
  //   if (this.platform.is('cordova')) {
  //     this.socialSharing.share(data, title, file, url)
  //       .catch(() => {
  //         this.alertService.simpleMessageError('Error', 'Ocurrió un error al momento de compartir los datos.');
  //       });
  //   } else {
  //     const selBox = document.createElement('textarea');
  //     selBox.style.position = 'fixed';
  //     selBox.style.left = '0';
  //     selBox.style.top = '0';
  //     selBox.style.opacity = '0';
  //     selBox.value = url ? data + '\n' + url : data;
  //     document.body.appendChild(selBox);
  //     selBox.select();
  //     selBox.focus();
  //     document.execCommand('copy');
  //     document.body.removeChild(selBox);
  //     const toast = await this.toastController.create({
  //       message: 'Tus datos han sido copiados al portapapeles.',
  //       duration: 2500
  //     });
  //     toast.present();
  //   }
  // }

  public async safePromise(promise: Promise<any>) {
    return promise.then((data) => [ data ]).catch((error) => [ null, error ]);
  }
}

export const LOTTIE_CONFIG = {
  path: 'assets/json/loading-spinner-pwa.json',
  autoplay: true,
  loop: true,
  renderer: 'svg',
  sizes: {
    big: {
      height: 120,
      width: 120
    },
    small: {
      height: 94,
      width: 94
    }
  }
};

export const DateFormats = {
  Format01: 'DD/MM/YYYY HH:mm'
};
