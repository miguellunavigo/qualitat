import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
} from '@angular/router';
import { HOME_ROUTE, LOGIN_ROUTE } from 'src/app/common/constants/routes.constants'; // HOME_ROUTE
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {}

  async canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {    
    // MLV PARA VALIDAR SI EL USUARIO FUE AUTENTIFICADO
      //debugger
      if (!this.isAuthenticated(state)) {
        return false;
      }
      const finalUrl: string = this.router.getCurrentNavigation() &&
      this.router.getCurrentNavigation().finalUrl &&
      this.router.getCurrentNavigation().finalUrl.toString() || '';

      if (finalUrl !== `/${HOME_ROUTE}`) { 

        //if (!this.userService.userInformation && finalUrl !== `/${HOME_ROUTE}`) {
      try {
        //await this.userService.getUserInformation();
      } catch (e) {
         await this.authService.signOut();
         this.router.navigateByUrl(`${LOGIN_ROUTE}`);
      }
    }
    return true;
  }

  private isAuthenticated(state: RouterStateSnapshot): boolean {
    //debugger
    if (!this.authService.isAuthenticated()) {
      this.router.navigate([`${LOGIN_ROUTE}`], { replaceUrl: true, queryParams: { returnUrl: state.url }});
      return false;
    }
    return true;
  }
}
