import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-formulario-viaje',
  templateUrl: './formulario-viaje.component.html',
  styleUrls: ['./formulario-viaje.component.scss'],
})
export class FormularioViajeComponent implements OnInit {

  @Input() viaje: any; // Recibe el viaje como parámetro si se está editando
  nuevoViaje = { destino: '', hora: '', precio: 0 };

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    // Si el viaje fue pasado, cargar sus datos en el formulario
    if (this.viaje) {
      this.nuevoViaje = { ...this.viaje };
    }
  }

  // Cerrar el modal sin pasar datos
  cerrarModal() {
    this.modalCtrl.dismiss();
  }

  // Enviar los datos y cerrar el modal
  agregarViaje() {
    this.modalCtrl.dismiss({
      viaje: this.nuevoViaje
    });
  }
}
