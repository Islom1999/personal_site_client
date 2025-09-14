import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { TimelineModule } from 'primeng/timeline';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonModule, CardModule, DividerModule, TagModule, TimelineModule],
  template: `
    <!-- Hero Section -->
    <section class="relative py-16 lg:py-24 overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-indigo-600/5 to-purple-600/10"
      ></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- O'qituvchi ma'lumotlari -->
          <div class="text-center lg:text-left order-2 lg:order-1">
            <div class="mb-6">
              <span class="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                🏆 Professional Matematik O'qituvchi
              </span>
            </div>
            <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Prof. Aziz Karimov
            </h1>
            <h2 class="text-xl lg:text-2xl text-blue-600 font-semibold mb-6">
              Matematik Analiz va Oliy Matematika Mutaxassisi
            </h2>
            <p class="text-lg text-gray-600 mb-8 leading-relaxed">
              15 yillik tajriba bilan matematika fanini o'qitish, 1000+ talabani muvaffaqiyatli 
              tayyorlash va zamonaviy o'qitish metodlarini qo'llash bo'yicha ekspert. 
              Toshkent Davlat Universiteti professori va ilmiy tadqiqotchi.
            </p>
            
            <!-- Asosiy yutuqlar -->
            <div class="grid grid-cols-2 gap-4 mb-8">
              <div class="text-center p-4 bg-white/80 rounded-xl shadow-sm">
                <div class="text-2xl font-bold text-blue-600 mb-1">15+</div>
                <div class="text-sm text-gray-600">Yillik Tajriba</div>
              </div>
              <div class="text-center p-4 bg-white/80 rounded-xl shadow-sm">
                <div class="text-2xl font-bold text-green-600 mb-1">1000+</div>
                <div class="text-sm text-gray-600">Talabalar</div>
              </div>
              <div class="text-center p-4 bg-white/80 rounded-xl shadow-sm">
                <div class="text-2xl font-bold text-purple-600 mb-1">25+</div>
                <div class="text-sm text-gray-600">Ilmiy Maqolalar</div>
              </div>
              <div class="text-center p-4 bg-white/80 rounded-xl shadow-sm">
                <div class="text-2xl font-bold text-orange-600 mb-1">95%</div>
                <div class="text-sm text-gray-600">Muvaffaqiyat</div>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <p-button
                label="Kurslarni ko'rish"
                icon="pi pi-book"
                routerLink="/courses"
                class="btn-primary"
              >
              </p-button>
              <p-button
                label="Bog'lanish"
                icon="pi pi-phone"
                [outlined]="true"
                routerLink="/contact"
                class="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
              </p-button>
            </div>
          </div>
          
          <!-- O'qituvchi rasmi -->
          <div class="relative order-1 lg:order-2">
            <div
              class="relative w-full max-w-md mx-auto"
            >
              <!-- Asosiy rasm -->
              <div class="relative">
                <div class="w-80 h-80 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full mx-auto shadow-2xl overflow-hidden border-8 border-white">
                  <img 
                    src="https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop" 
                    alt="Prof. Aziz Karimov" 
                    class="w-full h-full object-cover"
                  />
                </div>
                
                <!-- Floating badges -->
                <div class="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-3 py-2 rounded-full text-sm font-bold shadow-lg">
                  🏆 Professor
                </div>
                <div class="absolute -bottom-4 -left-4 bg-blue-500 text-white px-3 py-2 rounded-full text-sm font-bold shadow-lg">
                  📚 PhD
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Ta'lim ma'lumotlari va Tajriba -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Ta'lim va Tajriba</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Yuqori malakali ta'lim va boy amaliy tajriba asosida sifatli o'qitish xizmati
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <!-- Ta'lim ma'lumotlari -->
          <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg">
            <div class="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <i class="pi pi-graduation-cap text-white text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Ta'lim Ma'lumotlari</h3>
            <div class="space-y-4">
              <div>
                <h4 class="font-semibold text-gray-900">PhD - Matematik Analiz</h4>
                <p class="text-gray-600 text-sm">Toshkent Davlat Universiteti (2015)</p>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900">Magistr - Amaliy Matematika</h4>
                <p class="text-gray-600 text-sm">ToshDU (2010)</p>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900">Bakalavr - Matematika</h4>
                <p class="text-gray-600 text-sm">ToshDU (2008)</p>
              </div>
            </div>
          </div>

          <!-- Sertifikatlar -->
          <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-lg">
            <div class="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-6">
              <i class="pi pi-verified text-white text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Sertifikatlar</h3>
            <div class="space-y-3">
              <div class="flex items-center space-x-2">
                <i class="pi pi-check-circle text-green-600"></i>
                <span class="text-gray-700 text-sm">Cambridge Mathematics Certificate</span>
              </div>
              <div class="flex items-center space-x-2">
                <i class="pi pi-check-circle text-green-600"></i>
                <span class="text-gray-700 text-sm">Online Teaching Methodology</span>
              </div>
              <div class="flex items-center space-x-2">
                <i class="pi pi-check-circle text-green-600"></i>
                <span class="text-gray-700 text-sm">Advanced Calculus Specialist</span>
              </div>
              <div class="flex items-center space-x-2">
                <i class="pi pi-check-circle text-green-600"></i>
                <span class="text-gray-700 text-sm">Educational Technology Expert</span>
              </div>
            </div>
          </div>

          <!-- Yutuqlar -->
          <div class="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-8 shadow-lg">
            <div class="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <i class="pi pi-trophy text-white text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Yutuqlar</h3>
            <div class="space-y-3">
              <div class="flex items-center space-x-2">
                <i class="pi pi-star text-yellow-500"></i>
                <span class="text-gray-700 text-sm">"Yil o'qituvchisi" mukofoti (2023)</span>
              </div>
              <div class="flex items-center space-x-2">
                <i class="pi pi-star text-yellow-500"></i>
                <span class="text-gray-700 text-sm">Eng yaxshi onlayn kurs (2022)</span>
              </div>
              <div class="flex items-center space-x-2">
                <i class="pi pi-star text-yellow-500"></i>
                <span class="text-gray-700 text-sm">Innovatsion ta'lim mukofoti</span>
              </div>
              <div class="flex items-center space-x-2">
                <i class="pi pi-star text-yellow-500"></i>
                <span class="text-gray-700 text-sm">25+ ilmiy nashr muallifi</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Ish tajribasi timeline -->
        <div class="bg-gray-50 rounded-3xl p-8">
          <h3 class="text-2xl font-bold text-gray-900 mb-8 text-center">Ish Tajribasi</h3>
          <div class="max-w-4xl mx-auto">
            <div class="space-y-8">
              <div class="flex items-start space-x-6">
                <div class="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <span class="text-white font-bold text-sm">2020</span>
                </div>
                <div class="flex-1">
                  <h4 class="text-lg font-semibold text-gray-900">Professor</h4>
                  <p class="text-blue-600 font-medium">Toshkent Davlat Universiteti</p>
                  <p class="text-gray-600 mt-2">Matematik Analiz kafedrasi mudiri, PhD talabalarini rahbarligi</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-6">
                <div class="flex-shrink-0 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <span class="text-white font-bold text-sm">2015</span>
                </div>
                <div class="flex-1">
                  <h4 class="text-lg font-semibold text-gray-900">Dotsent</h4>
                  <p class="text-green-600 font-medium">Toshkent Davlat Universiteti</p>
                  <p class="text-gray-600 mt-2">Oliy matematika va matematik analiz fanlarini o'qitish</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-6">
                <div class="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                  <span class="text-white font-bold text-sm">2010</span>
                </div>
                <div class="flex-1">
                  <h4 class="text-lg font-semibold text-gray-900">Katta o'qituvchi</h4>
                  <p class="text-purple-600 font-medium">Toshkent Davlat Universiteti</p>
                  <p class="text-gray-600 mt-2">Bakalavr va magistr talabalarini o'qitish</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-6">
                <div class="flex-shrink-0 w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                  <span class="text-white font-bold text-sm">2008</span>
                </div>
                <div class="flex-1">
                  <h4 class="text-lg font-semibold text-gray-900">Assistent</h4>
                  <p class="text-orange-600 font-medium">Toshkent Davlat Universiteti</p>
                  <p class="text-gray-600 mt-2">Amaliy mashg'ulotlar va seminarlar o'tkazish</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mutaxassislik sohalari -->
    <section class="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Mutaxassislik Sohalari</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Chuqur bilim va tajriba asosida quyidagi sohalarda professional xizmat ko'rsataman
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <i class="pi pi-chart-line text-white text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Matematik Analiz</h3>
            <p class="text-gray-600 mb-4">Limitlar, hosilalar, integrallar va qatorlar nazariyasi</p>
            <div class="flex flex-wrap gap-2">
              <p-tag value="Limitlar" class="text-xs"></p-tag>
              <p-tag value="Hosilalar" class="text-xs"></p-tag>
              <p-tag value="Integrallar" class="text-xs"></p-tag>
            </div>
          </div>

          <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
              <i class="pi pi-calculator text-white text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Chiziqli Algebra</h3>
            <p class="text-gray-600 mb-4">Vektorlar, matritsalar va chiziqli tenglamalar sistemasi</p>
            <div class="flex flex-wrap gap-2">
              <p-tag value="Matritsalar" class="text-xs"></p-tag>
              <p-tag value="Vektorlar" class="text-xs"></p-tag>
              <p-tag value="Determinantlar" class="text-xs"></p-tag>
            </div>
          </div>

          <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <i class="pi pi-compass text-white text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Geometriya</h3>
            <p class="text-gray-600 mb-4">Analitik geometriya va differensial geometriya</p>
            <div class="flex flex-wrap gap-2">
              <p-tag value="Analitik" class="text-xs"></p-tag>
              <p-tag value="Differensial" class="text-xs"></p-tag>
              <p-tag value="Topologiya" class="text-xs"></p-tag>
            </div>
          </div>

          <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6">
              <i class="pi pi-percentage text-white text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Ehtimollar Nazariyasi</h3>
            <p class="text-gray-600 mb-4">Statistika va tasodifiy jarayonlar tahlili</p>
            <div class="flex flex-wrap gap-2">
              <p-tag value="Statistika" class="text-xs"></p-tag>
              <p-tag value="Ehtimollar" class="text-xs"></p-tag>
              <p-tag value="Tahlil" class="text-xs"></p-tag>
            </div>
          </div>

          <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6">
              <i class="pi pi-sitemap text-white text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Diskret Matematika</h3>
            <p class="text-gray-600 mb-4">Graflar nazariyasi va kombinatorika</p>
            <div class="flex flex-wrap gap-2">
              <p-tag value="Graflar" class="text-xs"></p-tag>
              <p-tag value="Kombinatorika" class="text-xs"></p-tag>
              <p-tag value="Algoritm" class="text-xs"></p-tag>
            </div>
          </div>

          <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6">
              <i class="pi pi-cog text-white text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Amaliy Matematika</h3>
            <p class="text-gray-600 mb-4">Matematik modellashtirish va optimallashtirish</p>
            <div class="flex flex-wrap gap-2">
              <p-tag value="Modellashtirish" class="text-xs"></p-tag>
              <p-tag value="Optimallashtirish" class="text-xs"></p-tag>
              <p-tag value="Tahlil" class="text-xs"></p-tag>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Xizmatlar -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Ta'lim Xizmatlari</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Har xil ehtiyojlar uchun moslashtirilgan professional ta'lim xizmatlari
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            class="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group"
          >
            <div
              class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
            >
              <i class="pi pi-book text-white text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">O'quv Ishlanmalari</h3>
            <p class="text-gray-600 mb-6">
              Shaxsiy ishlab chiqilgan darslik materiallari va qo'llanmalar
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
            class="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group"
          >
            <div
              class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
            >
              <i class="pi pi-video text-white text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Video Kurslar</h3>
            <p class="text-gray-600 mb-6">Professional video darslar va interaktiv mashqlar</p>
            <p-button
              label="Boshlash"
              [text]="true"
              routerLink="/courses"
              class="text-green-600 hover:bg-green-50"
            >
            </p-button>
          </div>

          <div
            class="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group"
          >
            <div
              class="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
            >
              <i class="pi pi-question-circle text-white text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Testlar</h3>
            <p class="text-gray-600 mb-6">
              Darajani aniqlash va bilimni mustahkamlash uchun testlar
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
            class="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group"
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

    <!-- Batafsil Statistika -->
    <section class="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-white mb-4">Natijalar va Statistika</h2>
          <p class="text-blue-100 text-xl max-w-3xl mx-auto">
            15 yillik faoliyat davomida erishilgan yutuqlar va natijalar
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div class="text-white">
            <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <i class="pi pi-calendar text-white text-2xl"></i>
            </div>
            <div class="text-4xl lg:text-5xl font-bold mb-2">15</div>
            <div class="text-blue-100 text-lg">Yil Tajriba</div>
            <div class="text-blue-200 text-sm mt-1">2008 yildan buyon</div>
          </div>
          <div class="text-white">
            <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <i class="pi pi-users text-white text-2xl"></i>
            </div>
            <div class="text-4xl lg:text-5xl font-bold mb-2">1,247</div>
            <div class="text-blue-100 text-lg">Muvaffaqiyatli Talaba</div>
            <div class="text-blue-200 text-sm mt-1">Barcha darajalar</div>
          </div>
          <div class="text-white">
            <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <i class="pi pi-book text-white text-2xl"></i>
            </div>
            <div class="text-4xl lg:text-5xl font-bold mb-2">25</div>
            <div class="text-blue-100 text-lg">Ilmiy Maqola</div>
            <div class="text-blue-200 text-sm mt-1">Xalqaro jurnallarda</div>
          </div>
          <div class="text-white">
            <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <i class="pi pi-chart-bar text-white text-2xl"></i>
            </div>
            <div class="text-4xl lg:text-5xl font-bold mb-2">95%</div>
            <div class="text-blue-100 text-lg">Muvaffaqiyat Darajasi</div>
            <div class="text-blue-200 text-sm mt-1">Imtihon natijalari</div>
          </div>
        </div>
        
        <!-- Qo'shimcha statistika -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-center">
          <div class="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <div class="text-2xl font-bold text-white mb-2">50+</div>
            <div class="text-blue-100">Video Kurs</div>
          </div>
          <div class="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <div class="text-2xl font-bold text-white mb-2">12</div>
            <div class="text-blue-100">Mukofot va Sertifikat</div>
          </div>
          <div class="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <div class="text-2xl font-bold text-white mb-2">8</div>
            <div class="text-blue-100">PhD Talaba Rahbarligi</div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HomeComponent {
  // Component logic can be added here if needed
}