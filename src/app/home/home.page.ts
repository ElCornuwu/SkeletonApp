import { Component, OnInit } from '@angular/core';
import { DatosService } from '../datos.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit{
  nombre: string;
  userRole: string | null = null;

  constructor(public datosService: DatosService) {
    // Aquí puedes obtener el usuario desde el servicio
    const user = this.datosService.getUserNombre(); // Asegúrate de tener este método en tu servicio
    this.nombre = user ? user.nombre : 'Nombre no disponible';
  }
  ngOnInit(): void {
    this.getUserRole(); 
 }
 // Obtiene el rol del usuario al cargar el componente
 getUserRole() {
  this.userRole = this.datosService.getUserRole();
}

// Método que verifica si el rol del usuario es 'Conductor'
isConductor(): boolean {
  return this.userRole === 'Conductor';
}

// Método que verifica si el rol del usuario es 'Pasajero'
isPasajero(): boolean {
  return this.userRole === 'Pasajero';
}

}