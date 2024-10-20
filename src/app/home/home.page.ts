import { Component } from '@angular/core';
import { DatosService } from '../datos.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage{

constructor (public datosService: DatosService){}

}

