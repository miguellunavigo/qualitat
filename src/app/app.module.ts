import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { HTTP } from '@ionic-native/http/ngx';
 import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { IDLE_EXIT_AFTER_WARNING_TIMEOUT, IDLE_WARNING_TIMEOUT } from './common/constants/misc.constants';
import { LottieAnimationViewModule } from 'ng-lottie';
import { DatePipe } from '@angular/common';
import { MethodInterceptor } from './common/interceptors/MethodInterceptor';
import {NgxImageCompressService} from "ngx-image-compress";
import { CookieService } from 'ngx-cookie-service';
import { CacheModule } from "ionic-cache";

@NgModule({
  declarations: [AppComponent],
  imports: [
    ComponentsModule,
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(), 
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    LottieAnimationViewModule.forRoot(),
    CacheModule.forRoot()
  ],
  providers: [
    DatePipe,
    NgxImageCompressService,
    CookieService,
    SplashScreen,
    StatusBar,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MethodInterceptor,
      multi: true
    },
    { 
      provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy 
    },
    {
      provide: 'idleConfig', useValue: {
        idle: IDLE_WARNING_TIMEOUT,
        timeout: IDLE_EXIT_AFTER_WARNING_TIMEOUT,
      }
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    // Do nothing
  }
}