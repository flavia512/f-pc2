import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrl: './register.scss',
  imports: [CommonModule, ReactiveFormsModule]
})
export class Register {
  form: FormGroup;
  successMsg: string | null = null;
  errorMsg: string | null = null;
  loadingFlag = false;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.form = this.fb.group({
      full_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  successMessage() { return this.successMsg; }
  errorMessage() { return this.errorMsg; }
  loading() { return this.loadingFlag; }

  onRegister() {
    this.successMsg = null;
    this.errorMsg = null;
    this.loadingFlag = true;
    this.authService.register(this.form.value).subscribe({
      next: (response: any) => {
        if (response.access_token && response.user) {
          this.authService.saveToken(response.access_token);
          this.authService.saveUser(response.user);
          this.successMsg = '¡Registro exitoso!';
        }
        this.loadingFlag = false;
      },
      error: (err) => {
        this.errorMsg = err.error?.message || 'Error en el registro';
        this.loadingFlag = false;
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.onRegister();
    }
  }
}