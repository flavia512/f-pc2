import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { AdminService } from '../../core/services/admin.service';


@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements OnInit {
  private authService = inject(AuthService);
  private adminService = inject(AdminService);
  private router = inject(Router);

  readonly estaAutenticado = this.authService.estaAutenticado;
  avisos: any[] = [];

  ngOnInit(): void {
    const usuario = this.authService.usuarioActual();
    if (usuario) {
      this.adminService.vernoticias_privadas().subscribe({
        next: (data) => {
          this.avisos = data;
        },
        error: (err) => {
          console.error('Error al cargar avisos', err);
        }
      });
      
    }else {
      this.adminService.vernoticias_publicas().subscribe({
        next: (data) => {
          this.avisos = data;
        },
        error: (err) => {
          console.error('Error al cargar avisos', err);
        }
      });
    }
  }


  entrarComoInvitado(): void {
    this.authService.continuarComoInvitado();
    this.router.navigate(['/viajes-compartidos']);
  }

  vernoticias_publicas(): void {
    this.adminService.vernoticias_publicas().subscribe({
        next: (data) => {
            console.log('Noticias públicas:', data);
        },
        error: (err) => {
            console.error('Error al cargar noticias públicas', err);
        }
    });

  }
  vernoticias_privadas(): void {
    this.adminService.vernoticias_privadas().subscribe({
        next: (data) => { 
            console.log('Noticias privadas:', data);
        },
        error: (err) => {
            console.error('Error al cargar noticias privadas', err);
        }
    });
  }

}
