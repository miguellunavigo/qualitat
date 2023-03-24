import { CanLoad, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { MAINTENANCE_ROUTE } from 'src/app/common/constants/routes.constants';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceGuard implements CanLoad {
  isInMaintenance: boolean;

  constructor(private router: Router) {
    //this.isInMaintenance = environment.MAINTENANCE;
  }

  canLoad(): boolean {
    //debugger
    if (this.isInMaintenance) { this.router.navigateByUrl(MAINTENANCE_ROUTE); }
    return !this.isInMaintenance;
  }
}
