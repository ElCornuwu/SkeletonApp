import { Component, OnInit } from '@angular/core';
import { DatosService } from 'src/app/datos.service';


@Component({
  selector: 'app-ruta',
  templateUrl: './ruta.component.html',
  styleUrls: ['./ruta.component.scss'],
})
export class RutaComponent implements OnInit {

  viajes: any[] = [];
  filtroViajes: any[] = [];
  buscar: string = "";

  constructor(private datosService: DatosService,) { }

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
    )
  }

}