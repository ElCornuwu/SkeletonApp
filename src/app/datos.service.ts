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
    return this.http.post(this.apiURL + '/viaje', viaje, { responseType: 'json' });
  }
}

