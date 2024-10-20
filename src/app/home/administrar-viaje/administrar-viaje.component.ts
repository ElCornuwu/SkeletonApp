import { Component, OnInit } from '@angular/core';
import { DatosService } from 'src/app/datos.service';
import { ModalController } from '@ionic/angular';
import { FormularioViajeComponent } from 'src/app/formulario-viaje/formulario-viaje.component';

@Component({
  selector: 'app-administrar-viaje',
  templateUrl: './administrar-viaje.component.html',
  styleUrls: ['./administrar-viaje.component.scss'],
})
export class AdministrarViajeComponent  implements OnInit {

  viajes: any[] = [];
  userID: number | null = null;

  constructor(private datosService: DatosService, private modalCtrl: ModalController) { } // Inyecta ModalController

  ngOnInit() {
    this.loadViajes();
    this.userID = this.datosService.getUserNombre()?.id;
  }

  loadViajes() {
    this.datosService.getViajes().subscribe((data) => {
      console.log(data);
      this.viajes = data.filter((viaje: any) => viaje.userID === this.userID);
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

  async mostrarFormularioNuevoViaje() {
    const modal = await this.modalCtrl.create({
      component: FormularioViajeComponent,
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data && data.viaje) {
      data.viaje.userID = this.userID; // Asignar el userID al nuevo viaje
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
      componentProps: { viaje }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data && data.viaje) {
      data.viaje.userID = this.userID; // Asegúrate de mantener el userID al editar
      this.datosService.addViaje(data.viaje).subscribe(() => {
        console.log('Viaje actualizado');
        this.loadViajes(); // Refresca la lista de viajes
      }, (error) => {
        console.error('Error al actualizar el viaje: ', error);
      });
    }
  }

}
