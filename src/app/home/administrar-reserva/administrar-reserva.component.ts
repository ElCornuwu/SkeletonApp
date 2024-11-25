import { Component, OnInit } from '@angular/core';
import { DatosService } from 'src/app/datos.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-administrar-reserva',
  templateUrl: './administrar-reserva.component.html',
  styleUrls: ['./administrar-reserva.component.scss'],
})
export class AdministrarReservaComponent  implements OnInit {
  viajes: any[] = []; // Almacena los viajes creados por el conductor
  reservasPorViaje: { [key: string]: any[] } = {}; // Relaciona viajeID con sus reservas
  userId: number = 0; // ID del conductor autenticado

  constructor(private datosService: DatosService, private alertController: AlertController) {
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

  async eliminarReserva(reservaId: string, viajeId: string) {
    const alert = await this.alertController.create({
      header: 'Eliminar Reserva',
      message: '¿Estás seguro de que quieres eliminar esta reserva?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelado');
          },
        },
        {
          text: 'Eliminar',
          handler: () => {
            // Obtener los detalles del viaje relacionado con la reserva
            this.datosService.getDetallesViaje(viajeId).subscribe(
              (viaje) => {
                if (viaje) {
                  // Incrementar el cupo del viaje
                  viaje.cupo += 1;
  
                  // Actualizar el viaje en el servidor
                  this.datosService.updateViaje(viaje).subscribe(
                    () => {
                      // Eliminar la reserva una vez actualizado el viaje
                      this.datosService.deleteReserva(reservaId).subscribe(
                        () => {
                          this.loadReservas(); // Refrescar las reservas
                          console.log('Reserva eliminada y cupo actualizado correctamente.');
                        },
                        (error) => {
                          console.error('Error al eliminar la reserva:', error);
                        }
                      );
                    },
                    (error) => {
                      console.error('Error al actualizar el viaje:', error);
                    }
                  );
                } else {
                  console.error('El viaje no existe.');
                }
              },
              (error) => {
                console.error('Error al obtener detalles del viaje:', error);
              }
            );
          },
        },
      ],
    });
  
    await alert.present();
  }

}
