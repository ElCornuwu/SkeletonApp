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
  userId: number = 0;
  viajes: { [key: string]: any } = {};

  constructor(private datosService: DatosService, private alertController: AlertController) {
    this.userId = this.datosService.getUserId();
  }

  ngOnInit() {
    this.loadReservas();
  }

  loadReservas() {
    console.log('User ID:', this.userId);
    this.datosService.getReservas().subscribe((data) => {

      this.reservas = data.filter((reserva: any) => reserva.usuarioID === this.userId);

      this.loadViajes();
    }, (error) => {
      console.error('Error al obtener las reservas:', error);
    });
  }

  loadViajes() {

    const viajeIDs = this.reservas.map(reserva => reserva.viajeID);
    viajeIDs.forEach(viajeID => {
      this.datosService.getDetallesViaje(viajeID).subscribe(viaje => {
        this.viajes[viajeID] = viaje;
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

            this.datosService.getDetallesViaje(reserva.viajeID).subscribe(viaje => {

              if (viaje && viaje.cupo >= 0) {

                viaje.cupo += 1; 
  

                this.datosService.updateViaje(viaje).subscribe(() => {

                  this.datosService.deleteReserva(reserva.id).subscribe(() => {
                    this.loadReservas();
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
