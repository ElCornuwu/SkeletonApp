import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' :'*'
    })
  }

  apiURL = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  getViajes(): Observable<any> {
    return this.http.get(this.apiURL + '/viaje').pipe(
      retry(3)
    );
  }

  deleteViaje(id: number): Observable<any> {
    return this.http.delete(this.apiURL+'/viaje/' + id, {responseType: 'json'});
  }
  
  addViaje(viaje: any): Observable<any> {
    if (viaje.id) {
      // Si el viaje tiene un ID, actualizar el viaje (PUT)
      return this.http.put(this.apiURL + '/viaje/' + viaje.id, viaje, { responseType: 'json' });
    } else {
      // Si no tiene ID, agregar un nuevo viaje (POST)
      return this.http.post(this.apiURL + '/viaje', viaje, { responseType: 'json' });
    }
  }
}

