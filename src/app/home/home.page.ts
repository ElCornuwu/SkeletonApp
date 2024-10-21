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

    const user = this.datosService.getUserNombre(); 
    this.nombre = user ? user.nombre : 'Nombre no disponible';
  }
  ngOnInit(): void {
    this.getUserRole(); 
 }

 getUserRole() {
  this.userRole = this.datosService.getUserRole();
}


isConductor(): boolean {
  return this.userRole === 'Conductor';
}


isPasajero(): boolean {
  return this.userRole === 'Pasajero';
}
}