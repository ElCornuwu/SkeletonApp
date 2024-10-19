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

  
}

