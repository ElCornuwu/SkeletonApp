import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { DatosService } from '../datos.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private authService: DatosService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // Verifica si el usuario está autenticado
    if (this.authService.isAuthenticated()) {
      const rol = this.authService.getUserRole()||'';
      const allowedRoles = route.data['roles'] as Array<string>; // Extrae los roles permitidos de la ruta

      // Verifica si el rol del usuario está permitido en la ruta
      if (allowedRoles.includes(rol)) {
        return true;
      }
    }

    // Redirige al login si no está autenticado o no tiene permisos
    this.router.navigate(['/login']);
    return false;
  }
}
