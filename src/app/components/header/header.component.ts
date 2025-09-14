import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { CommonModule, OnInit } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ButtonModule, MenubarModule, CommonModule, AvatarModule],
  template: `
    <header
      class="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
    >
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          <!-- Logo -->
          <div class="flex items-center space-x-3">
            <div
              class="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg"
            >
              <span class="text-white font-bold text-xl">M</span>
            </div>
            <div>
              <h1 class="text-xl font-bold text-gray-900">Prof. Matematik</h1>
              <p class="text-sm text-gray-600">O'qituvchi</p>
            </div>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-6">
            <a
              routerLink="/"
              routerLinkActive="text-blue-600 font-semibold"
              [routerLinkActiveOptions]="{ exact: true }"
              class="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Bosh sahifa
            </a>
            <a
              routerLink="/materials"
              routerLinkActive="text-blue-600 font-semibold"
              class="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              O'quv ishlanmalari
            </a>
            <a
              routerLink="/courses"
              routerLinkActive="text-blue-600 font-semibold"
              class="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Kurslar
            </a>
            <a
              routerLink="/tests"
              routerLinkActive="text-blue-600 font-semibold"
              class="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Testlar
            </a>
            <a
              routerLink="/contact"
              routerLinkActive="text-blue-600 font-semibold"
              class="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Aloqa
            </a>

            <!-- Auth Section -->
            <div *ngIf="!isLoggedIn" class="flex items-center space-x-3">
              <p-button
                label="Kirish"
                [text]="true"
                routerLink="/login"
                class="text-gray-700 hover:text-blue-600"
              >
              </p-button>
              <p-button
                label="Ro'yxatdan o'tish"
                routerLink="/register"
                class="btn-primary"
              >
              </p-button>
            </div>

            <!-- User Profile -->
            <div *ngIf="isLoggedIn" class="flex items-center space-x-3">
              <p-avatar
                [image]="currentUser?.avatar"
                [label]="currentUser?.name?.charAt(0)"
                shape="circle"
                size="normal"
                class="cursor-pointer"
                routerLink="/profile"
              >
              </p-avatar>
              <div class="text-sm">
                <div class="font-medium text-gray-900">{{ currentUser?.name }}</div>
                <div class="text-gray-500">{{ currentUser?.email }}</div>
              </div>
              <p-button
                icon="pi pi-sign-out"
                [text]="true"
                [rounded]="true"
                class="text-red-600 hover:bg-red-50"
                (onClick)="logout()"
                pTooltip="Chiqish"
              >
              </p-button>
            </div>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden">
            <p-button
              icon="pi pi-bars"
              [text]="true"
              [rounded]="true"
              (onClick)="toggleMobileMenu()"
              class="text-gray-700"
            >
            </p-button>
          </div>
        </div>

        <!-- Mobile Navigation -->
        <div class="md:hidden" [class.hidden]="!mobileMenuOpen">
          <div class="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
            <a
              routerLink="/"
              routerLinkActive="bg-blue-50 text-blue-600"
              [routerLinkActiveOptions]="{ exact: true }"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
              (click)="closeMobileMenu()"
            >
              Bosh sahifa
            </a>
            <a
              routerLink="/materials"
              routerLinkActive="bg-blue-50 text-blue-600"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
              (click)="closeMobileMenu()"
            >
              O'quv ishlanmalari
            </a>
            <a
              routerLink="/courses"
              routerLinkActive="bg-blue-50 text-blue-600"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
              (click)="closeMobileMenu()"
            >
              Kurslar
            </a>
            <a
              routerLink="/tests"
              routerLinkActive="bg-blue-50 text-blue-600"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
              (click)="closeMobileMenu()"
            >
              Testlar
            </a>
            <a
              routerLink="/contact"
              routerLinkActive="bg-blue-50 text-blue-600"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
              (click)="closeMobileMenu()"
            >
              Aloqa
            </a>
            
            <div *ngIf="!isLoggedIn" class="px-3 py-2 space-y-2">
              <a
                routerLink="/login"
                class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                (click)="closeMobileMenu()"
              >
                Kirish
              </a>
              <a
                routerLink="/register"
                class="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
                (click)="closeMobileMenu()"
              >
                Ro'yxatdan o'tish
              </a>
            </div>

            <div *ngIf="isLoggedIn" class="px-3 py-2 border-t border-gray-200">
              <a
                routerLink="/profile"
                class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                (click)="closeMobileMenu()"
              >
                Profil
              </a>
              <button
                (click)="logout(); closeMobileMenu()"
                class="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 transition-colors duration-200"
              >
                Chiqish
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  `,
})
export class HeaderComponent implements OnInit {
  mobileMenuOpen = false;
  isLoggedIn = false;
  currentUser: any = null;

  ngOnInit() {
    // Check if user is logged in (demo data)
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
      this.isLoggedIn = true;
    }
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.isLoggedIn = false;
    this.currentUser = null;
    // Redirect to home page
    window.location.href = '/';
  }
}