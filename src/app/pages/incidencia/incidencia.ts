// adaptalo a incidencia 
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Incidencia } from '../../core/models/incidencia.model';
import { IncidenciaService } from '../../core/services/incidencia.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-incidencias',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './incidencias.html',
})
export class Incidencias implements OnInit, OnDestroy {

  incidencias: Incidencia[] = [];
  incidenciaForm: FormGroup;
  cargando: boolean = false;
  error: string | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private incidenciaService: IncidenciaService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef  
  ) {
    this.incidenciaForm = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarIncidencias();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cargarIncidencias(): void {
    this.cargando = true;
    this.error = null;

    this.incidenciaService.obtenerIncidencias()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (incidencias) => {
          this.incidencias = [...incidencias]; // ← nueva referencia
          this.cdr.detectChanges();        // ← forzar detección
          this.cargando = false;
          console.log('ASIGNADO:', this.incidencias);
        },
        error: (err) => {
          console.error('Error al cargar incidencias:', err);
          this.error = 'No se pudieron cargar las incidencias.';
          this.cargando = false;
        }
      });
  }
  crearIncidencia(): void {
    if (this.incidenciaForm.invalid) {
      return;
    }
    const nuevaIncidencia = { nombre: this.incidenciaForm.value.nombre };
    this.incidenciaService.crearIncidencia(nuevaIncidencia)
      .pipe(takeUntil(this.destroy$))
        .subscribe({
            next: (incidencia) => {
                this.incidencias = [...this.incidencias, incidencia]; // ← nueva referencia
                this.cdr.detectChanges(); // ← forzar detección
                this.incidenciaForm.reset();
            }
        });
  }

  

  eliminarIncidencia(id: number): void {
    this.incidenciaService.eliminarIncidencia(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.cargarIncidencias();
        },
        error: (err) => {
          console.error('Error al eliminar incidencia:', err);
          this.error = 'No se pudo eliminar la incidencia.';
        }
      });
  }
}