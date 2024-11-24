import { Component, OnInit } from '@angular/core';
import { DatosService } from 'src/app/datos.service';

@Component({
  selector: 'app-administrar-reserva',
  templateUrl: './administrar-reserva.component.html',
  styleUrls: ['./administrar-reserva.component.scss'],
})
export class AdministrarReservaComponent  implements OnInit {
  viajes: any[] = []; // Almacena los viajes creados por el conductor
  reservasPorViaje: { [key: string]: any[] } = {}; // Relaciona viajeID con sus reservas
  userId: number = 0; // ID del conductor autenticado

  constructor(private datosService: DatosService) {
    this.userId = this.datosService.getUserId();
   }

  ngOnInit() {
    this.loadViajes();
  }

  loadViajes() {
    this.datosService.getViajes().subscribe(
      (data) => {
        // Filtrar viajes creados por el conductor autenticado
        this.viajes = data.filter((viaje: any) => viaje.userID === String(this.userId));
        this.loadReservas();
      },
      (error) => {
        console.error('Error al cargar los viajes:', error);
      }
    );
  }

  loadReservas() {
    this.datosService.getReservas().subscribe(
      (data) => {
        // Agrupar reservas por viajeID
        this.viajes.forEach((viaje) => {
          this.reservasPorViaje[viaje.id] = data.filter(
            (reserva: any) => reserva.viajeID === viaje.id
          );
        });
      },
      (error) => {
        console.error('Error al cargar las reservas:', error);
      }
    );
  }

}
