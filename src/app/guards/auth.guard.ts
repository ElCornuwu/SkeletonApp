import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { DatosService } from '../datos.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private authService: DatosService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    if (this.authService.isAuthenticated()) {
      const rol = this.authService.getUserRole() || '';
      const allowedRoles = route.data['roles'] as Array<string>;
  
      if (allowedRoles.includes(rol)) {
        return true;
      }
    }
  

    this.router.navigate(['/login']);
    return false;
  }
}
