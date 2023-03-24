import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RedirectionGuard implements CanActivate {

  constructor(
    private router: Router,
    private location: Location,
  ) { }

  public canActivate(route: ActivatedRouteSnapshot) {
    //debugger
    const returnUrl = route.queryParams['returnUrl'];
    if (returnUrl) {
      this.location.replaceState('/home');
      this.router.navigateByUrl(returnUrl);
      return false;
    }
    return true;
  }
}
