import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../core/services/admin.service';
import {Noticia} from '../../core/models/noticia.model';



@Component({
  selector: 'noticias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nuevapage.html',
  styleUrls: ['./nuevapage.scss']
})

export class NoticiasAdmin implements OnInit {
  private adminService = inject(AdminService);
    noticias: Noticia[] = [];
    
    ngOnInit(): void {
        this.cargarNoticias();
    }

    cargarNoticias(): void {
        this.adminService.vernoticias_activas().subscribe({
            next: (data) => {
                this.noticias = data;
            },
            error: (err) => {
                console.error('Error al cargar noticias', err);
            }
        });
    }
    vernoticias_activas(): void {
        this.adminService.vernoticias_activas().subscribe({
            next: (data) => {
                this.noticias = data;
            },
            error: (err) => {
                console.error('Error al cargar noticias', err);
            }
        });
    }
    eliminarnoticias_activas(id: number): void {
        this.adminService.eliminarnoticias_activas(id).subscribe({
            next: () => {
                this.noticias = this.noticias.filter(n => n.id !== id);
            },
            error: (err) => {
                console.error('Error al eliminar noticia', err);
            }
        });
    }

    vernoticias_publicas(): void {
        this.adminService.vernoticias_publicas().subscribe({
            next: (data) => {
                this.noticias = data;
            },
            error: (err) => {
                console.error('Error al cargar noticias', err);
            }
        });
    }

    vernoticias_privadas(): void {
        this.adminService.vernoticias_privadas().subscribe({
            next: (data) => {
                this.noticias = data;
            },
            error: (err) => {
                console.error('Error al cargar noticias', err);
            }
        });
    }

}