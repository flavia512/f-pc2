import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { VehiculoService } from '../../core/services/vehiculo.service';
import { Vehiculo } from '../../core/models/vehiculo.model';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-vehiculos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './vehiculos.html',
})
export class VehiculosComponent implements OnInit, OnDestroy {

  vehiculos: Vehiculo[] = [];
  vehiculoForm: FormGroup;
  cargando: boolean = false;
  error: string | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private vehiculoService: VehiculoService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef  // ← Añadido
  ) {
    this.vehiculoForm = this.fb.group({
      matricula: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarVehiculos();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cargarVehiculos(): void {
    this.cargando = true;
    this.error = null;

    this.vehiculoService.obtenerVehiculos()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (vehiculos) => {
          this.vehiculos = [...vehiculos]; // ← nueva referencia
          this.cdr.detectChanges();        // ← forzar detección
          this.cargando = false;
          console.log('ASIGNADO:', this.vehiculos);
        },
        error: (err) => {
          console.error('Error al cargar vehículos:', err);
          this.error = 'No se pudieron cargar los vehículos.';
          this.cargando = false;
        }
      });
  }

  agregarVehiculo(): void {
    if (this.vehiculoForm.valid) {
      const nuevoVehiculo = {
        matricula: this.vehiculoForm.value.matricula
      };

      this.vehiculoService.crearVehiculo(nuevoVehiculo)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.vehiculoForm.reset();
            this.cargarVehiculos();
          },
          error: (err) => {
            console.error('Error al crear vehículo:', err);
            this.error = 'No se pudo agregar el vehículo.';
          }
        });
    }
  }

  eliminarVehiculo(id: number): void {
    this.vehiculoService.eliminarVehiculo(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.cargarVehiculos();
        },
        error: (err) => {
          console.error('Error al eliminar vehículo:', err);
          this.error = 'No se pudo eliminar el vehículo.';
        }
      });
  }
}