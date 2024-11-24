import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-formulario-viaje',
  templateUrl: './formulario-viaje.component.html',
  styleUrls: ['./formulario-viaje.component.scss'],
})
export class FormularioViajeComponent implements OnInit {

  @Input() viaje: any; 
  nuevoViaje = { destino: '', fecha: '', hora: '', precio: 0, patente: '', cupo: 0 };

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
   
    if (this.viaje) {
      this.nuevoViaje = { ...this.viaje };
    }
  }


  cerrarModal() {
    this.modalCtrl.dismiss();
  }


  agregarViaje() {
    this.modalCtrl.dismiss({
      viaje: this.nuevoViaje
    });
  }
}
