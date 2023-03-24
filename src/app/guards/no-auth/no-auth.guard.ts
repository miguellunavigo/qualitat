import { Injectable } from '@angular/core';
import {
  CanLoad,
  Router,
  Route,
} from '@angular/router';
import { Observable } from 'rxjs';
import { HOME_ROUTE } from 'src/app/common/constants/routes.constants';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    //debugger
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl(HOME_ROUTE);
      return false;
    }
    return true;
  }
}
