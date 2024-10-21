import { Component, OnInit } from '@angular/core';
import { DatosService } from 'src/app/datos.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-ruta',
  templateUrl: './ruta.component.html',
  styleUrls: ['./ruta.component.scss'],
})
export class RutaComponent implements OnInit {
  viajes: any[] = [];
  filtroViajes: any[] = [];
  buscar: string = "";

  constructor(private datosService: DatosService, private alertController: AlertController) { }

  ngOnInit() {
    this.loadViajes();
  }

  loadViajes() {
    this.datosService.getViajes().subscribe((data) => {
      console.log(data);
      this.viajes = data;
      this.filtroViajes = this.viajes;
    }, (error) => {
      console.error("Error al obtener los viajes: ", error);
    });
  }

  filtrarViajes() {
    this.filtroViajes = this.viajes.filter(viaje =>
      viaje.destino.toLowerCase().includes(this.buscar.toLowerCase())
    );
  }

  async reservarCupo(viaje: any) {
    const alert = await this.alertController.create({
      header: 'Reservar Cupo',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Ingresa tu nombre'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Reserva cancelada');
            return true;
          }
        },
        {
          text: 'Reservar',
          handler: (data) => {
            if (data.nombre.trim().length === 0) {

              console.log('El nombre no puede estar vacío');
              return false;
            }
            this.agregarReserva(viaje, data.nombre);
            return true;
          }
        }
      ]
    });
  
    await alert.present();
  }

  agregarReserva(viaje: any, nombre: string) {
    if (nombre.trim().length === 0) {
      console.error('El nombre del usuario no puede estar vacío');
      return;
    }

    if (viaje.cupo > 0) {
      const nuevaReserva = {
        viajeID: viaje.id,
        usuarioID: this.datosService.getUserNombre().id,
        usuarioNombre: nombre 
      };
  

      viaje.cupo -= 1;
  

      this.datosService.updateViaje(viaje).subscribe(() => {

        this.datosService.addReserva(nuevaReserva).subscribe(() => {
          console.log('Reserva realizada con éxito');
          this.loadViajes();
        }, (error) => {
          console.error('Error al agregar la reserva:', error);
        });
      }, (error) => {
        console.error('Error al actualizar el viaje:', error);
      });
    } else {
      console.log('No hay cupos disponibles');
    }
  }
}
