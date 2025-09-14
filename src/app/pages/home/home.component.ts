import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonModule, CardModule, DividerModule],
  template: `
    <!-- Hero Section -->
    <section class="relative py-20 lg:py-32 overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-indigo-600/5 to-purple-600/10"
      ></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="text-center lg:text-left">
            <h1 class="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Matematika
              <span
                class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"
              >
                Olamiga
              </span>
              Xush Kelibsiz
            </h1>
            <p class="text-xl text-gray-600 mb-8 leading-relaxed">
              Professional matematik o'qituvchi bilan birga matematikaning sirlarini kashf eting.
              Sifatli ta'lim materiallari, interaktiv kurslar va amaliy testlar orqali bilimingizni
              oshiring.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <p-button
                label="Kurslarni ko'rish"
                icon="pi pi-book"
                routerLink="/courses"
                class="btn-primary"
              >
              </p-button>
              <p-button
                label="Testlarni boshlash"
                icon="pi pi-play"
                [outlined]="true"
                routerLink="/tests"
                class="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
              </p-button>
            </div>
          </div>
          <div class="relative">
            <div
              class="w-full h-96 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl flex items-center justify-center shadow-2xl"
            >
              <div class="text-center">
                <div
                  class="w-32 h-32 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg"
                >
                  <i class="pi pi-calculator text-white text-5xl"></i>
                </div>
                <h3 class="text-2xl font-bold text-gray-800 mb-2">Matematik Formulalar</h3>
                <p class="text-gray-600">Algebra, Geometriya, Analiz</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- O'qituvchi haqida -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">O'qituvchi haqida</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Ko'p yillik tajriba va zamonaviy o'qitish metodlari bilan matematikani oson va qiziqarli
            qilib o'rgatamiz
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="relative">
            <div
              class="w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center shadow-xl"
            >
              <div class="text-center">
                <div
                  class="w-40 h-40 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg"
                >
                  <i class="pi pi-user text-white text-6xl"></i>
                </div>
                <h3 class="text-2xl font-bold text-gray-800">Prof. Matematik</h3>
              </div>
            </div>
          </div>
          <div>
            <h3 class="text-2xl font-bold text-gray-900 mb-6">Tajriba va Malaka</h3>
            <div class="space-y-6">
              <div class="flex items-start space-x-4">
                <div
                  class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0"
                >
                  <i class="pi pi-graduation-cap text-blue-600 text-xl"></i>
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-gray-900 mb-2">15+ yillik tajriba</h4>
                  <p class="text-gray-600">
                    Oliy matematika, algebra va geometriya bo'yicha chuqur bilim
                  </p>
                </div>
              </div>
              <div class="flex items-start space-x-4">
                <div
                  class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0"
                >
                  <i class="pi pi-users text-green-600 text-xl"></i>
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-gray-900 mb-2">1000+ talaba</h4>
                  <p class="text-gray-600">
                    Muvaffaqiyatli o'qitilgan va imtihonlarga tayyorlangan talabalar
                  </p>
                </div>
              </div>
              <div class="flex items-start space-x-4">
                <div
                  class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0"
                >
                  <i class="pi pi-star text-purple-600 text-xl"></i>
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-gray-900 mb-2">Yuqori natijalar</h4>
                  <p class="text-gray-600">
                    Talabalarning 95% dan ortig'i imtihonlardan yuqori baholar oladi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Xizmatlar -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Bizning Xizmatlar</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Matematika o'rganish uchun barcha kerakli resurslar bir joyda
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group"
          >
            <div
              class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
            >
              <i class="pi pi-book text-white text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">O'quv Ishlanmalari</h3>
            <p class="text-gray-600 mb-6">
              Barcha mavzular bo'yicha to'liq darslik materiallari va qo'llanmalar
            </p>
            <p-button
              label="Ko'rish"
              [text]="true"
              routerLink="/materials"
              class="text-blue-600 hover:bg-blue-50"
            >
            </p-button>
          </div>

          <div
            class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group"
          >
            <div
              class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
            >
              <i class="pi pi-video text-white text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Video Kurslar</h3>
            <p class="text-gray-600 mb-6">Interaktiv video darslar orqali step-by-step o'rganish</p>
            <p-button
              label="Boshlash"
              [text]="true"
              routerLink="/courses"
              class="text-green-600 hover:bg-green-50"
            >
            </p-button>
          </div>

          <div
            class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group"
          >
            <div
              class="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
            >
              <i class="pi pi-question-circle text-white text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Testlar</h3>
            <p class="text-gray-600 mb-6">
              Bilimingizni sinab ko'rish uchun mavzulashtirilgan testlar
            </p>
            <p-button
              label="Sinash"
              [text]="true"
              routerLink="/tests"
              class="text-purple-600 hover:bg-purple-50"
            >
            </p-button>
          </div>

          <div
            class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group"
          >
            <div
              class="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
            >
              <i class="pi pi-phone text-white text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Shaxsiy Darslar</h3>
            <p class="text-gray-600 mb-6">Individual yondashuv bilan shaxsiy o'qitish xizmati</p>
            <p-button
              label="Bog'lanish"
              [text]="true"
              routerLink="/contact"
              class="text-orange-600 hover:bg-orange-50"
            >
            </p-button>
          </div>
        </div>
      </div>
    </section>

    <!-- Statistika -->
    <section class="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div class="text-white">
            <div class="text-4xl lg:text-5xl font-bold mb-2">15+</div>
            <div class="text-blue-100 text-lg">Yillik Tajriba</div>
          </div>
          <div class="text-white">
            <div class="text-4xl lg:text-5xl font-bold mb-2">1000+</div>
            <div class="text-blue-100 text-lg">Talabalar</div>
          </div>
          <div class="text-white">
            <div class="text-4xl lg:text-5xl font-bold mb-2">50+</div>
            <div class="text-blue-100 text-lg">Kurslar</div>
          </div>
          <div class="text-white">
            <div class="text-4xl lg:text-5xl font-bold mb-2">95%</div>
            <div class="text-blue-100 text-lg">Muvaffaqiyat</div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HomeComponent {}
