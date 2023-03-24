import { Observable, Subscription } from 'rxjs';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.scss'],
})

export class GenericModalComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() title: string;
  @Input() message: string;
  @Input() primaryButtonText: string;
  @Input() secondaryButtonText: string;
  @Input() icon: string;
  @Input() dynamicSource: Observable<string>;
  @Input() extraClass?: string;
  @Input() showCloseButton: boolean;
  @Input() enableBackdropDismiss: boolean;
  @Input() extraClass2?: string;
  @Input() extraClass1?: string;
  @Input() closeSesion?: boolean;
  @ViewChild('secondButton') secondButton: ElementRef;
  subscription: Subscription;
  fadeOut: boolean=false;
  isActiveModal: boolean=false;
  hide: boolean=false;
  fromRoute;
  constructor(
    private viewController: ModalController,
    private authService: AuthService,
    private route: ActivatedRoute,
    element: ElementRef
  ) {
    this.dynamicSource = new Observable<string>;    
    this.secondButton = element;

    this.subscription = new Subscription();
    this.title =  '';
    this.message = '';
    this.primaryButtonText = '';
    this.secondaryButtonText = '';
    this.icon = 'i-smartphone-purple';
    this.showCloseButton = true;
    this.enableBackdropDismiss = false;
    this.fromRoute = this.route.snapshot.queryParams
  }

  ngAfterViewInit(): void {

  }

  ngOnInit() {
    
    this.subscription = new Subscription();
    if (this.dynamicSource) {
      this.subscription.add(
        this.dynamicSource.subscribe((message) => {
          this.message = message;
        })
      );
    }
  }

  dismissModal() {
    this.viewController.dismiss();
    const second = 300;
    this.fadeOut = true;
    setTimeout(() => {
      this.hide = true;
    }, second);
    this.isActiveModal = false;
  }

  onPrimaryClick() {
    this.viewController.dismiss('primaryButtonPressed');
  }

  async onSecondaryClick() {
      if(this.closeSesion) {
        await this.authService.signOut();
        this.viewController.dismiss('secondaryButtonPressed');
      } else {
        this.viewController.dismiss('secondaryButtonPressed');
      }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
