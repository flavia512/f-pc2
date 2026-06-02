import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../core/services/admin.service';
import { Aviso } from '../../core/models/aviso.model';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-nuevapage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nuevapage.html',
  styleUrl: './nuevapage.scss'
})
export class NuevaPage implements OnInit {
  private adminService = inject(AdminService);

  texto = '';
  activo = true;
  importancia = 1;
  userIdSeleccionado: number | null = null;
  

  avisos: Aviso[] = [];
  


  mensaje = '';
  error = '';

    usuarios: User[] | undefined;

  ngOnInit(): void {
    this.cargarUsuarios();
    this.cargarAvisos();
  }
  cargarUsuarios(): void {
    this.adminService.obtenerTodos().subscribe({
      next: res => this.usuarios = res.datos
    });
  }
    cargarAvisos(): void {
    this.adminService.listarAvisos().subscribe({
        next: res => this.avisos = res.filter((a: any) => a.activo)
    });
}

CrearAviso(): void {
    if (!this.texto.trim()) {
        this.error = 'El texto del aviso no puede estar vacío.';
        return;
    }
    this.adminService.crearAviso({
        texto: this.texto,
        importancia: this.importancia,
        user_id: this.userIdSeleccionado
    }).subscribe({
        next: aviso => {
            this.avisos.push(aviso);
            this.mensaje = 'Aviso creado exitosamente.';
            this.error = '';
            this.texto = '';
            this.importancia = 1;
            this.userIdSeleccionado = null;
        }
    });

 }




}