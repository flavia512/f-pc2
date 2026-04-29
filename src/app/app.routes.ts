import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Profile } from './pages/profile/profile';
import { AdminUsers } from './pages/admin-users/admin-users';
import { Rutas } from './pages/rutas/rutas';
import { Reservas } from './pages/reservas/reservas';
import { ViajesCompartidos } from './pages/viajes-compartidos/viajes-compartidos';
// Protege rutas con authGuard para asegurar que solo usuarios autenticados puedan acceder a ciertas páginas
import { authGuard } from './core/guards/auth.guard';

import { CrearViaje } from './pages/crear-viaje/crear-viaje';
import { Home } from './pages/home/home';
import { Alertas } from './pages/alertas/alertas';

import { Incidencias } from './pages/incidencia/incidencia';
//AÑADIR  canActivate: [authGuard]  CUANDO EL BACKEND ESTE CONECTADO
export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'profile', component: Profile, canActivate: [authGuard] },
  { path: 'admin-users', component: AdminUsers, canActivate: [authGuard] },
  { path: 'crear-viaje', component: CrearViaje, canActivate: [authGuard] },
  { path: 'rutas', component: Rutas, canActivate: [authGuard] },
  { path: 'reservas', component: Reservas, canActivate: [authGuard] },
  { path: 'viajes-compartidos', component: ViajesCompartidos, canActivate: [authGuard] },
  { path: 'alertas', component: Alertas, canActivate: [authGuard] },
  // este es del examen
  { path: 'examen', component: Incidencias, canActivate: [authGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];