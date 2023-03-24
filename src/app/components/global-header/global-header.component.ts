import { Component, OnInit, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MenuController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SCREEN_WIDTH } from 'src/app/common/constants/misc.constants';
import { HOME_ROUTE, LOGIN_ROUTE } from 'src/app/common/constants/routes.constants';
import { GenericModalComponent } from 'src/app/components/generic-modal/generic-modal.component';
import { SIGNOUT_WARNING_MODAL_PROPS } from 'src/app/common/constants/modal-props.constants';

@Component({
  selector: 'app-global-header',
  templateUrl: './global-header.component.html',
  styleUrls: ['./global-header.component.scss'],
})
export class GlobalHeaderComponent implements OnInit {

  currentPath: string;
  showBackButton: boolean;
  // showPoints: boolean;
  customerType: string;
  customerTypeLogo: string;
  signoutModal: HTMLIonModalElement;
  @Input() hideMenu: boolean;
  @Input() hideBackButton: boolean;
  @Input() title: string;
  @Input() customBackEvent: boolean;
  @Input() classType: string;
  @Output() backButtonClick = new EventEmitter<void>();

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.showBackButton = this.showBackButtonValidation();
  }
  public folder!: string;
  constructor(
    private router: Router,
    private authService: AuthService,
    private location: Location,
    private menu: MenuController,    
    private modalCtrl: ModalController,    
  ) {
    
    //this.signoutModal=new HTMLIonModalElement;
    this.customerType = this.title = this.currentPath = "muiguel";
    // this.customerTypeLogo = "";
    // this.classType= "";
    
    this.hideMenu = this.hideBackButton = this.customBackEvent = this.showBackButton = false;
    this.backButtonClick = new EventEmitter();
  }

  private showBackButtonValidation(): boolean {

    return this.currentPath !== HOME_ROUTE && window.innerWidth <= SCREEN_WIDTH.MOBILE;
  }

  public goBack(): void {
    if (this.customBackEvent) {
      this.backButtonClick.emit();
    } else {
      this.location.back();
    }
  }

  async ngOnInit(): Promise<void> {
    this.currentPath = this.router.url.replace('/', '');
    this.showBackButton = this.showBackButtonValidation();
    if (this.hideMenu) {
      const menuElement = await this.menu.get();
      menuElement.swipeGesture = false;
    }
    if (window.innerWidth > SCREEN_WIDTH.MOBILE) {
    }
  }

  public async signOut(): Promise<void> {
    await this.authService.signOut();    
    
    this.router.navigateByUrl(LOGIN_ROUTE, { replaceUrl: true });
  }

  public async openSignoutModal(): Promise<void> {
    this.signoutModal = await this.modalCtrl.create({
      component: GenericModalComponent,
      cssClass: 'form-modal',
      componentProps: SIGNOUT_WARNING_MODAL_PROPS,
    });
    await this.signoutModal.present();
    const option = await this.signoutModal.onDidDismiss();
    if (option.data === 'primaryButtonPressed') {
      this.signOut();
    }
  }

}
