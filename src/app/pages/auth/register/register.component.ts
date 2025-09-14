import { Component } from '@angular/core';
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
    MessageModule
  ],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <!-- Header -->
        <div class="text-center">
          <div class="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span class="text-white font-bold text-2xl">M</span>
          </div>
          <h2 class="text-3xl font-bold text-gray-900 mb-2">Ro'yxatdan o'tish</h2>
          <p class="text-gray-600">Yangi hisob yarating va o'qishni boshlang</p>
        </div>

        <!-- Register Form -->
        <div class="bg-white rounded-2xl shadow-lg p-8">
          <form class="space-y-6" (ngSubmit)="register()">
            <!-- Error/Success Message -->
            <p-message 
              *ngIf="errorMessage" 
              severity="error" 
              [text]="errorMessage"
              class="w-full"
            >
            </p-message>
            
            <p-message 
              *ngIf="successMessage" 
              severity="success" 
              [text]="successMessage"
              class="w-full"
            >
            </p-message>

            <!-- Full Name -->
            <div class="flex flex-col">
              <label class="text-sm font-medium text-gray-700 mb-2">To'liq ism</label>
              <input
                type="text"
                pInputText
                placeholder="Ismingiz va familiyangiz"
                [(ngModel)]="registerForm.fullName"
                name="fullName"
                required
                class="w-full"
                [class.p-invalid]="submitted && !registerForm.fullName"
              />
            </div>

            <!-- Email -->
            <div class="flex flex-col">
              <label class="text-sm font-medium text-gray-700 mb-2">Email manzil</label>
              <input
                type="email"
                pInputText
                placeholder="email@example.com"
                [(ngModel)]="registerForm.email"
                name="email"
                required
                class="w-full"
                [class.p-invalid]="submitted && !registerForm.email"
              />
            </div>

            <!-- Phone -->
            <div class="flex flex-col">
              <label class="text-sm font-medium text-gray-700 mb-2">Telefon raqami</label>
              <input
                type="tel"
                pInputText
                placeholder="+998 90 123 45 67"
                [(ngModel)]="registerForm.phone"
                name="phone"
                class="w-full"
              />
            </div>

            <!-- Password -->
            <div class="flex flex-col">
              <label class="text-sm font-medium text-gray-700 mb-2">Parol</label>
              <p-password
                [(ngModel)]="registerForm.password"
                name="password"
                placeholder="Kuchli parol yarating"
                [feedback]="true"
                [toggleMask]="true"
                required
                class="w-full"
                [class.p-invalid]="submitted && !registerForm.password"
              >
              </p-password>
            </div>

            <!-- Confirm Password -->
            <div class="flex flex-col">
              <label class="text-sm font-medium text-gray-700 mb-2">Parolni tasdiqlash</label>
              <p-password
                [(ngModel)]="registerForm.confirmPassword"
                name="confirmPassword"
                placeholder="Parolni qayta kiriting"
                [feedback]="false"
                [toggleMask]="true"
                required
                class="w-full"
                [class.p-invalid]="submitted && (!registerForm.confirmPassword || registerForm.password !== registerForm.confirmPassword)"
              >
              </p-password>
              <small *ngIf="submitted && registerForm.password !== registerForm.confirmPassword" class="text-red-500 mt-1">
                Parollar mos kelmaydi
              </small>
            </div>

            <!-- Terms Agreement -->
            <div class="flex items-start">
              <p-checkbox
                [(ngModel)]="registerForm.agreeToTerms"
                name="agreeToTerms"
                inputId="agreeToTerms"
                [binary]="true"
                required
                [class.p-invalid]="submitted && !registerForm.agreeToTerms"
              >
              </p-checkbox>
              <label for="agreeToTerms" class="ml-2 text-sm text-gray-600">
                Men <a href="#" class="text-blue-600 hover:text-blue-500">foydalanish shartlari</a> va 
                <a href="#" class="text-blue-600 hover:text-blue-500 ml-1">maxfiylik siyosati</a> bilan roziman
              </label>
            </div>

            <!-- Register Button -->
            <p-button
              type="submit"
              label="Ro'yxatdan o'tish"
              icon="pi pi-user-plus"
              [loading]="loading"
              class="w-full btn-primary"
            >
            </p-button>

            <!-- Divider -->
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">yoki</span>
              </div>
            </div>

            <!-- Social Register -->
            <div class="space-y-3">
              <p-button
                label="Google bilan ro'yxatdan o'tish"
                icon="pi pi-google"
                [outlined]="true"
                class="w-full"
                (onClick)="registerWithGoogle()"
              >
              </p-button>
            </div>

            <!-- Login Link -->
            <div class="text-center">
              <p class="text-sm text-gray-600">
                Hisobingiz bormi?
                <a routerLink="/login" class="font-medium text-blue-600 hover:text-blue-500 ml-1">
                  Kirish
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {
  registerForm = {
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
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
    if (!this.registerForm.fullName || !this.registerForm.email || !this.registerForm.password || !this.registerForm.confirmPassword) {
      this.errorMessage = 'Barcha majburiy maydonlarni to\'ldiring';
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
        this.errorMessage = 'Bu email manzil allaqachon ro\'yxatdan o\'tgan';
        this.loading = false;
        return;
      }

      // Success
      this.successMessage = 'Ro\'yxatdan o\'tish muvaffaqiyatli! Endi tizimga kirishingiz mumkin.';
      
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
      
      this.loading = false;
    }, 1500);
  }

  registerWithGoogle() {
    // Demo Google registration
    alert('Google ro\'yxatdan o\'tish demo - haqiqiy loyihada Google OAuth ishlatiladi');
  }
}