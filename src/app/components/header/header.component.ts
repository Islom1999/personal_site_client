import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ButtonModule, MenubarModule, CommonModule],
  styles: [
    `
      @import 'tailwindcss';
    `,
  ],
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
          <div class="hidden md:flex items-center space-x-8">
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
          </div>
        </div>
      </nav>
    </header>
  `,
})
export class HeaderComponent {
  mobileMenuOpen = false;

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }
}
