import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DatosService } from '../datos.service'; // Importa el AuthService que maneja la lógica de autenticación

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  
  constructor(private authService: DatosService, private router: Router) {}

  
  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      const role = this.authService.getUserRole();
      // Permitir acceso a ambas rutas
      if (role === 'Conductor' || role === 'Pasajero') {
        return true;
      }
    }
    
    this.router.navigate(['/login']); // Redirige si no está autenticado
    return false;
  }  
}