import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import Swal from 'sweetalert2';
import { Toaster } from '../../common/toaster';

@Injectable({
  providedIn: "root"
})

export class UserGuard implements CanActivate {
  private toaster: Toaster = new Toaster();

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    if (!this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/']);
      this.toaster.showInfo("You are already logged in.");
      return false;
    }
  }
}
