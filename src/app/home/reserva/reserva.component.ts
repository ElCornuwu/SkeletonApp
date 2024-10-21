import { Component, OnInit } from '@angular/core';
import { DatosService } from 'src/app/datos.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss'],
})
export class ReservaComponent implements OnInit {
  reservas: any[] = [];
  userId: number = 0; // Aquí deberías obtener el ID del usuario logueado
  viajes: { [key: string]: any } = {}; // Almacenará los viajes por ID

  constructor(private datosService: DatosService, private alertController: AlertController) {
    this.userId = this.datosService.getUserId();
  }

  ngOnInit() {
    this.loadReservas();
  }

  loadReservas() {
    console.log('User ID:', this.userId);
    this.datosService.getReservas().subscribe((data) => {
      // Filtra las reservas por el ID del usuario
      this.reservas = data.filter((reserva: any) => reserva.usuarioID === this.userId);
      // Carga los detalles de cada viaje asociado
      this.loadViajes();
    }, (error) => {
      console.error('Error al obtener las reservas:', error);
    });
  }

  loadViajes() {
    // Cargar detalles del viaje para cada reserva
    const viajeIDs = this.reservas.map(reserva => reserva.viajeID);
    viajeIDs.forEach(viajeID => {
      this.datosService.getDetallesViaje(viajeID).subscribe(viaje => {
        this.viajes[viajeID] = viaje; // Almacena el viaje en el objeto de viajes
      }, (error) => {
        console.error('Error al obtener detalles del viaje:', error);
      });
    });
  }

  async eliminarReserva(reserva: any) {
    const alert = await this.alertController.create({
      header: 'Eliminar Reserva',
      message: '¿Estás seguro de que quieres eliminar esta reserva?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelado');
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            // Primero obtenemos el viaje asociado a la reserva
            this.datosService.getDetallesViaje(reserva.viajeID).subscribe(viaje => {
              // Verificamos que el viaje existe y que tiene cupo
              if (viaje && viaje.cupo >= 0) {
                // Incrementamos el cupo en uno
                viaje.cupo += 1; 
  
                // Actualizamos el viaje
                this.datosService.updateViaje(viaje).subscribe(() => {
                  // Luego eliminamos la reserva
                  this.datosService.deleteReserva(reserva.id).subscribe(() => {
                    this.loadReservas(); // Refresca la lista de reservas
                  }, (error) => {
                    console.error('Error al eliminar la reserva:', error);
                  });
                }, (error) => {
                  console.error('Error al actualizar el viaje:', error);
                });
              } else {
                console.error('El viaje no existe o no tiene cupo disponible.');
              }
            }, (error) => {
              console.error('Error al obtener detalles del viaje:', error);
            });
          }
        }
      ]
    });
  
    await alert.present();
  }
}
