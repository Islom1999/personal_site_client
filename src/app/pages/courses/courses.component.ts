import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  lessons: number;
  level: string;
  rating: number;
  students: number;
  price: string;
  image: string;
  tags: string[];
  progress?: number;
}

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    TagModule,
    ProgressBarModule,
    RatingModule,
    FormsModule,
  ],
  styles: [
    `
      @import 'tailwindcss';
    `,
  ],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">Video Kurslar</h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Matematik fanlarni chuqur o'rganish uchun professional video kurslar. Har bir mavzu
            bo'yicha step-by-step ta'lim olish imkoniyati
          </p>
        </div>

        <!-- Featured Course -->
        <div class="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 mb-12 text-white">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span
                class="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4"
              >
                🔥 Eng mashhur kurs
              </span>
              <h2 class="text-3xl font-bold mb-4">
                Matematik Analiz: Noldan Professionallik Darajasigacha
              </h2>
              <p class="text-blue-100 mb-6 text-lg">
                Matematik analizning barcha asosiy mavzularini o'rganing. Limitlar, hosilalar,
                integrallar va ularning amaliy qo'llanilishi.
              </p>
              <div class="flex items-center space-x-6 mb-6">
                <div class="flex items-center">
                  <i class="pi pi-clock mr-2"></i>
                  <span>24 soat</span>
                </div>
                <div class="flex items-center">
                  <i class="pi pi-play-circle mr-2"></i>
                  <span>48 dars</span>
                </div>
                <div class="flex items-center">
                  <i class="pi pi-users mr-2"></i>
                  <span>2,340 talaba</span>
                </div>
              </div>
              <p-button
                label="Kursni boshlash"
                icon="pi pi-play"
                class="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
              >
              </p-button>
            </div>
            <div class="relative">
              <div
                class="w-full h-64 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm"
              >
                <div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <i class="pi pi-play text-white text-3xl ml-1"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Course Categories -->
        <div class="mb-12">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Kurs Kategoriyalari</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div
              *ngFor="let category of categories"
              class="bg-white rounded-xl p-4 text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
            >
              <div
                class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300"
              >
                <i [class]="category.icon" class="text-white text-xl"></i>
              </div>
              <h3 class="font-semibold text-gray-900 text-sm">{{ category.name }}</h3>
              <p class="text-xs text-gray-500 mt-1">{{ category.count }} kurs</p>
            </div>
          </div>
        </div>

        <!-- Courses Grid -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-900">Barcha Kurslar</h2>
            <div class="flex space-x-2">
              <p-button label="Barchasi" [text]="true" class="text-blue-600 bg-blue-50"> </p-button>
              <p-button label="Boshlang'ich" [text]="true" class="text-gray-600 hover:bg-gray-50">
              </p-button>
              <p-button label="O'rta" [text]="true" class="text-gray-600 hover:bg-gray-50">
              </p-button>
              <p-button label="Yuqori" [text]="true" class="text-gray-600 hover:bg-gray-50">
              </p-button>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              *ngFor="let course of courses"
              class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <!-- Course Image -->
              <div
                class="relative h-48 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center"
              >
                <div
                  class="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                >
                  <i class="pi pi-play text-white text-2xl ml-1"></i>
                </div>
                <div class="absolute top-4 left-4">
                  <span class="px-2 py-1 bg-white/90 text-gray-800 text-xs font-medium rounded-md">
                    {{ course.level }}
                  </span>
                </div>
                <div class="absolute top-4 right-4">
                  <span class="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-md">
                    {{ course.price }}
                  </span>
                </div>
              </div>

              <div class="p-6">
                <!-- Course Title -->
                <h3
                  class="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200"
                >
                  {{ course.title }}
                </h3>

                <!-- Course Description -->
                <p class="text-gray-600 mb-4 line-clamp-2">
                  {{ course.description }}
                </p>

                <!-- Course Tags -->
                <div class="flex flex-wrap gap-1 mb-4">
                  <p-tag *ngFor="let tag of course.tags" [value]="tag" class="text-xs"> </p-tag>
                </div>

                <!-- Course Stats -->
                <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div class="flex items-center space-x-4">
                    <span class="flex items-center">
                      <i class="pi pi-clock mr-1"></i>
                      {{ course.duration }}
                    </span>
                    <span class="flex items-center">
                      <i class="pi pi-play-circle mr-1"></i>
                      {{ course.lessons }} dars
                    </span>
                  </div>
                </div>

                <!-- Rating and Students -->
                <div class="flex items-center justify-between mb-6">
                  <div class="flex items-center space-x-2">
                    <p-rating [(ngModel)]="course.rating" [readonly]="true" class="text-sm">
                    </p-rating>
                    <span class="text-sm text-gray-600">({{ course.rating }})</span>
                  </div>
                  <span class="text-sm text-gray-500">{{ course.students }} talaba</span>
                </div>

                <!-- Progress Bar (if enrolled) -->
                <div *ngIf="course.progress !== undefined" class="mb-4">
                  <div class="flex items-center justify-between text-sm mb-2">
                    <span class="text-gray-600">Jarayon</span>
                    <span class="text-blue-600 font-medium">{{ course.progress }}%</span>
                  </div>
                  <p-progressBar [value]="course.progress" class="h-2"> </p-progressBar>
                </div>

                <!-- Action Buttons -->
                <div class="flex space-x-2">
                  <p-button
                    [label]="course.progress !== undefined ? 'Davom etish' : 'Kursni boshlash'"
                    [icon]="course.progress !== undefined ? 'pi pi-play' : 'pi pi-shopping-cart'"
                    class="flex-1 btn-primary"
                  >
                  </p-button>
                  <p-button
                    icon="pi pi-heart"
                    [text]="true"
                    [rounded]="true"
                    class="text-gray-400 hover:text-red-500 hover:bg-red-50"
                  >
                  </p-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CoursesComponent {
  categories = [
    { name: 'Algebra', icon: 'pi pi-calculator', count: 12 },
    { name: 'Geometriya', icon: 'pi pi-compass', count: 8 },
    { name: 'Analiz', icon: 'pi pi-chart-line', count: 15 },
    { name: 'Ehtimollar', icon: 'pi pi-percentage', count: 6 },
    { name: 'Diskret', icon: 'pi pi-sitemap', count: 9 },
    { name: 'Statistika', icon: 'pi pi-chart-bar', count: 7 },
  ];

  courses: Course[] = [
    {
      id: 1,
      title: 'Chiziqli Algebra Asoslari',
      description:
        "Vektorlar, matritsalar va chiziqli tenglamalar sistemasini o'rganish. Nazariy bilim va amaliy ko'nikmalar.",
      instructor: 'Prof. Matematik',
      duration: '12 soat',
      lessons: 24,
      level: "O'rta",
      rating: 4.8,
      students: 1250,
      price: 'Bepul',
      image: '',
      tags: ['Algebra', 'Matritsalar', 'Vektorlar'],
      progress: 65,
    },
    {
      id: 2,
      title: 'Planimetriya va Stereometriya',
      description:
        'Tekislik va fazoviy geometriya asoslari. Shakllar, hajmlar va yuzalar hisoblash.',
      instructor: 'Prof. Matematik',
      duration: '16 soat',
      lessons: 32,
      level: "Boshlang'ich",
      rating: 4.9,
      students: 980,
      price: "150,000 so'm",
      image: '',
      tags: ['Geometriya', 'Shakllar', 'Hajm'],
    },
    {
      id: 3,
      title: 'Matematik Analiz: Limitlar va Hosilalar',
      description: 'Matematik analizning asosiy tushunchalari: limitlar, uzluksizlik va hosilalar.',
      instructor: 'Prof. Matematik',
      duration: '20 soat',
      lessons: 40,
      level: 'Yuqori',
      rating: 4.7,
      students: 756,
      price: "200,000 so'm",
      image: '',
      tags: ['Analiz', 'Limitlar', 'Hosilalar'],
    },
    {
      id: 4,
      title: 'Ehtimollar Nazariyasi va Statistika',
      description: 'Ehtimollar hisoblash, tasodifiy miqdorlar va statistik tahlil asoslari.',
      instructor: 'Prof. Matematik',
      duration: '14 soat',
      lessons: 28,
      level: "O'rta",
      rating: 4.6,
      students: 642,
      price: "180,000 so'm",
      image: '',
      tags: ['Ehtimollar', 'Statistika', 'Tahlil'],
    },
    {
      id: 5,
      title: 'Diskret Matematika va Algoritm',
      description: 'Graflar nazariyasi, kombinatorika va algoritm asoslari dasturlash uchun.',
      instructor: 'Prof. Matematik',
      duration: '18 soat',
      lessons: 36,
      level: 'Yuqori',
      rating: 4.8,
      students: 423,
      price: "250,000 so'm",
      image: '',
      tags: ['Diskret', 'Algoritm', 'Graflar'],
    },
    {
      id: 6,
      title: 'Oliy Matematika: Integrallar',
      description:
        "Aniq va noaniq integrallar, ularning hisoblash usullari va amaliy qo'llanilishi.",
      instructor: 'Prof. Matematik',
      duration: '22 soat',
      lessons: 44,
      level: 'Yuqori',
      rating: 4.9,
      students: 567,
      price: "220,000 so'm",
      image: '',
      tags: ['Integrallar', 'Analiz', 'Hisoblash'],
      progress: 30,
    },
  ];
}
