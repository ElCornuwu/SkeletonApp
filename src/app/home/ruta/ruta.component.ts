import { Component, OnInit } from '@angular/core';
import { DatosService } from 'src/app/datos.service';

@Component({
  selector: 'app-ruta',
  templateUrl: './ruta.component.html',
  styleUrls: ['./ruta.component.scss'],
})
export class RutaComponent implements OnInit {

  viajes: any[] = [];
  nuevoViaje = { destino: '', hora: '', precio: 0 };
  mostrarFormulario = false;

  constructor(private datosService: DatosService) { }

  ngOnInit() {

    this.loadViajes();

  }

  loadViajes(){
    this.datosService.getViajes().subscribe((data) => {  
      console.log(data);
      this.viajes = data;
    }, (error) => {
      console.error("Error al obtener los viajes: ", error);
    });
  }

  eliminarViaje(id: number){
    this.datosService.deleteViaje(id).subscribe(()=>{
      console.log(`Viaje con ID ${id} eliminado`);
      this.loadViajes();
    }, (error) =>{
      console.error('Error al eliminar el viaje: ', error);
    })
  }

  mostrarFormularioNuevoViaje() {
    this.mostrarFormulario = true;
  }

  agregarViaje() {
    this.datosService.addViaje(this.nuevoViaje).subscribe(() => {
      console.log('Nuevo viaje agregado');
      this.nuevoViaje = { destino: '', hora: '', precio: 0 };
      this.mostrarFormulario = false;
      this.loadViajes();
    }, (error) => {
      console.error('Error al agregar el viaje: ', error);
    });
  }

}
