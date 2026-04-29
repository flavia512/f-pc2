import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-vehiculo-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './vehiculo-detalle.html'
})
export class VehiculoDetalleComponent {
  id: string | null = null;
  userId: string | null = null;
  matricula: string | null = null;
  modelo: string = 'Modelo genérico';
  plazas: number = 4;
  imagenUrl: string = 'https://cdn-icons-png.flaticon.com/512/744/744465.png';

  constructor(private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.userId = this.route.snapshot.paramMap.get('user_id');
    this.matricula = this.route.snapshot.paramMap.get('matricula');
  }
}