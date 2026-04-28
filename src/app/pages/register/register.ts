import { Component } from '@angular/core';
// aqui importamos el servicio de autenticación para usarlo en el registro ya que continene los metodos 
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  constructor(private authService: AuthService) {}
  successMsg: string | null = null;
  errorMsg: string | null = null;
  loadingFlag = false;

successMessage() { return this.successMsg; }
errorMessage() { return this.errorMsg; }
loading() { return this.loadingFlag; }

onRegister(form: any) {
  this.successMsg = null;
  this.errorMsg = null;
  this.loadingFlag = true;
  this.authService.register(form.value).subscribe({
    next: (response: any) => {
      if (response.access_token && response.user) {
        this.authService.saveToken(response.access_token);
        this.authService.saveUser(response.user);
        this.successMsg = '¡Registro exitoso!';
        // Puedes redirigir aquí si quieres
      }
      this.loadingFlag = false;
    },
    error: (err) => {
      this.errorMsg = err.error?.message || 'Error en el registro';
      this.loadingFlag = false;
    }
  });
}
}