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
      this.adminService.getAvisosUsuario(usuario.id).subscribe({
        next: (res: any) => this.avisos = res
      });
    }
  }

  entrarComoInvitado(): void {
    this.authService.continuarComoInvitado();
    this.router.navigate(['/viajes-compartidos']);
  }

  color(imp: number) {
    return imp === 3 ? 'danger' : imp === 2 ? 'warning' : 'success';
  }

  label(imp: number) {
    return imp === 3 ? 'Grave' : imp === 2 ? 'Moderada' : 'Leve';
  }
}