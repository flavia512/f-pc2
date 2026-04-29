import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Incidencia } from '../models/incidencia.model';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class IncidenciaService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  crearIncidencia(vehiculo: { nombre: string }): Observable<Incidencia> {
      return this.http.post<Incidencia>(`${this.apiUrl}/users/crear_incidente`, vehiculo);
    }
  
    obtenerIncidencias(): Observable<Incidencia[]> {
    return this.http.get<{ incidencias: Incidencia[] }>(`${this.apiUrl}/users/listar_incidentes`)
      .pipe(
        map(response => {
          console.log('RESPONSE COMPLETA:', response);        // ¿Qué llega?
          console.log('INCIDENCIAS:', response.incidencias);      // ¿Es array?
          return response.incidencias;
        })
      );
  }
  obtenerIncidenciaPorId(id: number): Observable<Incidencia> {
    return this.http.get<Incidencia>(`${this.apiUrl}/users/incidente/${id}`);
  }
    eliminarIncidencia(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/users/eliminar_incidente/${id}`);
    }
  
  
}
