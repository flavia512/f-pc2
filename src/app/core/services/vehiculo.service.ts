import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Vehiculo } from '../models/vehiculo.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  crearVehiculo(vehiculo: { matricula: string }): Observable<Vehiculo> {
    return this.http.post<Vehiculo>(`${this.apiUrl}/users/crear_vehiculo`, vehiculo);
  }

  obtenerVehiculos(): Observable<Vehiculo[]> {
  return this.http.get<{ vehiculos: Vehiculo[] }>(`${this.apiUrl}/users/obtener_vehiculos`)
    .pipe(
      map(response => {
        console.log('RESPONSE COMPLETA:', response);        // ¿Qué llega?
        console.log('VEHICULOS:', response.vehiculos);      // ¿Es array?
        return response.vehiculos;
      })
    );
}
  eliminarVehiculo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/eliminar_vehiculo/${id}`);
  }
}
