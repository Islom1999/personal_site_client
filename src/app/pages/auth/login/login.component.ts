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
  selector: 'app-login',
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
          <h2 class="text-3xl font-bold text-gray-900 mb-2">Tizimga kirish</h2>
          <p class="text-gray-600">Hisobingizga kirib, o'qishni davom ettiring</p>
        </div>

        <!-- Login Form -->
        <div class="bg-white rounded-2xl shadow-lg p-8">
          <form class="space-y-6" (ngSubmit)="login()">
            <!-- Error Message -->
            <p-message 
              *ngIf="errorMessage" 
              severity="error" 
              [text]="errorMessage"
              class="w-full"
            >
            </p-message>

            <!-- Email -->
            <div class="flex flex-col">
              <label class="text-sm font-medium text-gray-700 mb-2">Email manzil</label>
              <input
                type="email"
                pInputText
                placeholder="email@example.com"
                [(ngModel)]="loginForm.email"
                name="email"
                required
                class="w-full"
                [class.p-invalid]="submitted && !loginForm.email"
              />
            </div>

            <!-- Password -->
            <div class="flex flex-col">
              <label class="text-sm font-medium text-gray-700 mb-2">Parol</label>
              <p-password
                [(ngModel)]="loginForm.password"
                name="password"
                placeholder="Parolingizni kiriting"
                [feedback]="false"
                [toggleMask]="true"
                required
                class="w-full"
                [class.p-invalid]="submitted && !loginForm.password"
              >
              </p-password>
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <p-checkbox
                  [(ngModel)]="loginForm.rememberMe"
                  name="rememberMe"
                  inputId="rememberMe"
                  [binary]="true"
                >
                </p-checkbox>
                <label for="rememberMe" class="ml-2 text-sm text-gray-600">Eslab qolish</label>
              </div>
              <a href="#" class="text-sm text-blue-600 hover:text-blue-500">Parolni unutdingizmi?</a>
            </div>

            <!-- Login Button -->
            <p-button
              type="submit"
              label="Kirish"
              icon="pi pi-sign-in"
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

            <!-- Social Login -->
            <div class="space-y-3">
              <p-button
                label="Google bilan kirish"
                icon="pi pi-google"
                [outlined]="true"
                class="w-full"
                (onClick)="loginWithGoogle()"
              >
              </p-button>
            </div>

            <!-- Register Link -->
            <div class="text-center">
              <p class="text-sm text-gray-600">
                Hisobingiz yo'qmi?
                <a routerLink="/register" class="font-medium text-blue-600 hover:text-blue-500 ml-1">
                  Ro'yxatdan o'ting
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  loginForm = {
    email: '',
    password: '',
    rememberMe: false
  };

  loading = false;
  submitted = false;
  errorMessage = '';

  constructor(private router: Router) {}

  login() {
    this.submitted = true;
    this.errorMessage = '';

    if (!this.loginForm.email || !this.loginForm.password) {
      this.errorMessage = 'Barcha maydonlarni to\'ldiring';
      return;
    }

    this.loading = true;

    // Demo login - real implementation would call API
    setTimeout(() => {
      if (this.loginForm.email === 'demo@example.com' && this.loginForm.password === 'demo123') {
        const userData = {
          id: 1,
          name: 'Aziz Rahimov',
          email: 'demo@example.com',
          avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          joinDate: new Date('2023-01-15'),
          completedCourses: 3,
          totalTestScore: 87
        };
        
        localStorage.setItem('currentUser', JSON.stringify(userData));
        this.router.navigate(['/profile']);
      } else {
        this.errorMessage = 'Email yoki parol noto\'g\'ri';
      }
      this.loading = false;
    }, 1500);
  }

  loginWithGoogle() {
    // Demo Google login
    alert('Google login demo - haqiqiy loyihada Google OAuth ishlatiladi');
  }
}