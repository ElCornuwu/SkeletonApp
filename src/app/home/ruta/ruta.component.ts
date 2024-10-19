import { Component, OnInit } from '@angular/core';
import { DatosService } from 'src/app/datos.service';

@Component({
  selector: 'app-ruta',
  templateUrl: './ruta.component.html',
  styleUrls: ['./ruta.component.scss'],
})
export class RutaComponent implements OnInit {

  viajes: any[] = [];

  constructor(private datosService: DatosService) { }

  ngOnInit() {
    this.datosService.getViajes().subscribe((data) => {  
      console.log(data);
      this.viajes = data;
    }, (error) => {
      console.error("Error al obtener los viajes: ", error);
    });
  }
}
