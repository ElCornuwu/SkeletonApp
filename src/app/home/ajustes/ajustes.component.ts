import { Component, OnInit } from '@angular/core';
import { TextZoom } from '@capacitor/text-zoom';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.scss'],
})
export class AjustesComponent{
  currentZoom: number = 1;

  constructor() {
    this.getCurrentZoom();
  }

  async getCurrentZoom() {
    const result = await TextZoom.get();
    this.currentZoom = result.value;
  }

  async setZoom(zoomLevel: number) {
    console.log('Setting zoom level to:', zoomLevel);
    await TextZoom.set({ value: zoomLevel });
  }

}
