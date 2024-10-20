import { Component, OnInit } from '@angular/core';
import { DatosService } from 'src/app/datos.service';
import { ModalController } from '@ionic/angular'; // Importa ModalController
import { FormularioViajeComponent } from 'src/app/formulario-viaje/formulario-viaje.component';

@Component({
  selector: 'app-ruta',
  templateUrl: './ruta.component.html',
  styleUrls: ['./ruta.component.scss'],
})
export class RutaComponent implements OnInit {

  viajes: any[] = [];

  constructor(private datosService: DatosService, private modalCtrl: ModalController) { } // Inyecta ModalController

  ngOnInit() {
    this.loadViajes();
  }

  loadViajes() {
    this.datosService.getViajes().subscribe((data) => {
      console.log(data);
      this.viajes = data;
    }, (error) => {
      console.error("Error al obtener los viajes: ", error);
    });
  }

  eliminarViaje(id: number) {
    this.datosService.deleteViaje(id).subscribe(() => {
      console.log(`Viaje con ID ${id} eliminado`);
      this.loadViajes();
    }, (error) => {
      console.error('Error al eliminar el viaje: ', error);
    })
  }

  // Abre el modal
  async mostrarFormularioNuevoViaje() {
    const modal = await this.modalCtrl.create({
      component: FormularioViajeComponent,
    });

    await modal.present();

    // Obtener los datos cuando el modal se cierre
    const { data } = await modal.onWillDismiss();
    if (data && data.viaje) {
      this.datosService.addViaje(data.viaje).subscribe(() => {
        console.log('Nuevo viaje agregado');
        this.loadViajes(); // Refresca la lista de viajes
      }, (error) => {
        console.error('Error al agregar el viaje: ', error);
      });
    }
  }

  async mostrarFormularioEditarViaje(viaje: any) {
    const modal = await this.modalCtrl.create({
      component: FormularioViajeComponent,
      componentProps: { viaje } // Pasar el viaje seleccionado como propiedad
    });

    await modal.present();

    // Obtener los datos cuando el modal se cierre
    const { data } = await modal.onWillDismiss();
    if (data && data.viaje) {
      this.datosService.addViaje(data.viaje).subscribe(() => {
        console.log('Viaje actualizado');
        this.loadViajes(); // Refresca la lista de viajes
      }, (error) => {
        console.error('Error al actualizar el viaje: ', error);
      });
    }
  }
}