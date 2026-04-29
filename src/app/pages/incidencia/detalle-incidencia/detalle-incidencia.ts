import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { IncidenciaService } from '../../../core/services/incidencia.service';
import { Incidencia } from '../../../core/models/incidencia.model';

@Component({
  selector: 'app-detalle-incidencia',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle-incidencia.html'
})
export class DetalleIncidenciaComponent implements OnInit {
  id: string | null = null;
  incidencia: Incidencia | null = null;
  cargando: boolean = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private incidenciaService: IncidenciaService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this.id) {
      this.cargando = true;
        this.incidenciaService.obtenerIncidenciaPorId(Number(this.id))
        .subscribe({
          next: (incidencia) => {
            this.incidencia = incidencia;
            this.cargando = false;
          },
          error: (err) => {
            this.error = 'No se pudo cargar la incidencia.';
            this.cargando = false;
          }
        });
    }
  }
}