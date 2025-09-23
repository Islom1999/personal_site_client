import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    CardModule,
    MessageModule,
  ],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  registerForm = {
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  };

  loading = false;
  submitted = false;
  errorMessage = '';
  successMessage = '';

  constructor(private router: Router) {}

  register() {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Validation
    if (
      !this.registerForm.fullName ||
      !this.registerForm.email ||
      !this.registerForm.password ||
      !this.registerForm.confirmPassword
    ) {
      this.errorMessage = "Barcha majburiy maydonlarni to'ldiring";
      return;
    }

    if (this.registerForm.password !== this.registerForm.confirmPassword) {
      this.errorMessage = 'Parollar mos kelmaydi';
      return;
    }

    if (!this.registerForm.agreeToTerms) {
      this.errorMessage = 'Foydalanish shartlarini qabul qiling';
      return;
    }

    this.loading = true;

    // Demo registration - real implementation would call API
    setTimeout(() => {
      // Check if email already exists (demo)
      if (this.registerForm.email === 'demo@example.com') {
        this.errorMessage = "Bu email manzil allaqachon ro'yxatdan o'tgan";
        this.loading = false;
        return;
      }

      // Success
      this.successMessage = "Ro'yxatdan o'tish muvaffaqiyatli! Endi tizimga kirishingiz mumkin.";

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);

      this.loading = false;
    }, 1500);
  }

  registerWithGoogle() {
    // Demo Google registration
    alert("Google ro'yxatdan o'tish demo - haqiqiy loyihada Google OAuth ishlatiladi");
  }
}
