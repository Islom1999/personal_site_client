import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { TabsModule } from 'primeng/tabs';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';

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
  modules: CourseModule[];
  enrolled?: boolean;
}

interface CourseModule {
  id: number;
  title: string;
  lessons: Lesson[];
  duration: string;
  completed?: boolean;
}

interface Lesson {
  id: number;
  title: string;
  duration: string;
  type: 'video' | 'text' | 'quiz';
  completed?: boolean;
  videoUrl?: string;
  content?: string;
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
    DialogModule,
    TabsModule,
    AccordionModule,
    CheckboxModule,
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
                (onClick)="startCourse(courses[0])"
              >
              </p-button>
            </div>
            <div class="relative">
              <div
                class="w-full h-64 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm cursor-pointer"
                (click)="startCourse(courses[0])"
              >
                <div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
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
              (click)="filterByCategory(category.value)"
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
              <p-button 
                label="Barchasi" 
                [text]="true" 
                [class]="selectedFilter === 'all' ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'"
                (onClick)="filterCourses('all')"
              > 
              </p-button>
              <p-button 
                label="Boshlang'ich" 
                [text]="true" 
                [class]="selectedFilter === 'beginner' ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'"
                (onClick)="filterCourses('beginner')"
              >
              </p-button>
              <p-button 
                label="O'rta" 
                [text]="true" 
                [class]="selectedFilter === 'intermediate' ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'"
                (onClick)="filterCourses('intermediate')"
              >
              </p-button>
              <p-button 
                label="Yuqori" 
                [text]="true" 
                [class]="selectedFilter === 'advanced' ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'"
                (onClick)="filterCourses('advanced')"
              >
              </p-button>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              *ngFor="let course of filteredCourses"
              class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <!-- Course Image -->
              <div
                class="relative h-48 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center cursor-pointer"
                (click)="viewCourse(course)"
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
                <div *ngIf="course.enrolled" class="absolute bottom-4 right-4">
                  <span class="px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded-md">
                    <i class="pi pi-check mr-1"></i>Ro'yxatdan o'tgan
                  </span>
                </div>
              </div>

              <div class="p-6">
                <!-- Course Title -->
                <h3
                  class="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200 cursor-pointer"
                  (click)="viewCourse(course)"
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
                    [label]="course.enrolled ? 'Davom etish' : 'Kursni boshlash'"
                    [icon]="course.enrolled ? 'pi pi-play' : 'pi pi-shopping-cart'"
                    class="flex-1 btn-primary"
                    (onClick)="course.enrolled ? continueCourse(course) : enrollCourse(course)"
                  >
                  </p-button>
                  <p-button
                    icon="pi pi-eye"
                    [text]="true"
                    [rounded]="true"
                    class="text-blue-600 hover:bg-blue-50"
                    (onClick)="viewCourse(course)"
                    pTooltip="Kursni ko'rish"
                  >
                  </p-button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Course Detail Dialog -->
        <p-dialog
          [(visible)]="showCourseDialog"
          [modal]="true"
          [closable]="true"
          [style]="{ width: '90vw', maxWidth: '1200px', height: '90vh' }"
          styleClass="course-dialog"
        >
          <ng-template pTemplate="header">
            <div class="flex items-center justify-between w-full">
              <h3 class="text-2xl font-bold text-gray-900">{{ selectedCourse?.title }}</h3>
              <div class="flex items-center space-x-4">
                <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  {{ selectedCourse?.level }}
                </span>
                <span class="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  {{ selectedCourse?.price }}
                </span>
              </div>
            </div>
          </ng-template>

          <div class="h-full overflow-hidden" *ngIf="selectedCourse">
            <p-tabs value="overview" class="h-full">
              <p-tablist>
                <p-tab value="overview">
                  <i class="pi pi-info-circle mr-2"></i>
                  Kurs haqida
                </p-tab>
                <p-tab value="content">
                  <i class="pi pi-list mr-2"></i>
                  Kurs mazmuni
                </p-tab>
                <p-tab value="reviews">
                  <i class="pi pi-star mr-2"></i>
                  Sharhlar
                </p-tab>
              </p-tablist>
              <p-tabpanels>
              <!-- Course Overview -->
                <p-tabpanel value="overview">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
                  <div class="lg:col-span-2">
                    <!-- Video Preview -->
                    <div class="bg-gray-900 rounded-xl mb-6 relative overflow-hidden" style="aspect-ratio: 16/9;">
                      <div class="absolute inset-0 flex items-center justify-center">
                        <div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300">
                          <i class="pi pi-play text-white text-3xl ml-1"></i>
                        </div>
                      </div>
                      <div class="absolute bottom-4 left-4 text-white">
                        <span class="bg-black/50 px-2 py-1 rounded text-sm">Preview</span>
                      </div>
                    </div>

                    <!-- Course Description -->
                    <div class="mb-6">
                      <h4 class="text-xl font-bold text-gray-900 mb-4">Kurs haqida</h4>
                      <p class="text-gray-600 leading-relaxed mb-4">{{ selectedCourse.description }}</p>
                      
                      <!-- What you'll learn -->
                      <h5 class="text-lg font-semibold text-gray-900 mb-3">Nima o'rganasiz:</h5>
                      <ul class="space-y-2 text-gray-600">
                        <li class="flex items-start">
                          <i class="pi pi-check text-green-600 mr-2 mt-1"></i>
                          Matematik analizning asosiy tushunchalari
                        </li>
                        <li class="flex items-start">
                          <i class="pi pi-check text-green-600 mr-2 mt-1"></i>
                          Limitlar va uzluksizlik nazariyasi
                        </li>
                        <li class="flex items-start">
                          <i class="pi pi-check text-green-600 mr-2 mt-1"></i>
                          Hosilalar va ularning qo'llanilishi
                        </li>
                        <li class="flex items-start">
                          <i class="pi pi-check text-green-600 mr-2 mt-1"></i>
                          Integrallar va amaliy masalalar
                        </li>
                      </ul>
                    </div>
                  </div>

                  <!-- Course Info Sidebar -->
                  <div class="space-y-6">
                    <!-- Course Stats -->
                    <div class="bg-gray-50 rounded-xl p-6">
                      <h5 class="font-semibold text-gray-900 mb-4">Kurs ma'lumotlari</h5>
                      <div class="space-y-3 text-sm">
                        <div class="flex items-center justify-between">
                          <span class="text-gray-600">Davomiyligi:</span>
                          <span class="font-medium">{{ selectedCourse.duration }}</span>
                        </div>
                        <div class="flex items-center justify-between">
                          <span class="text-gray-600">Darslar soni:</span>
                          <span class="font-medium">{{ selectedCourse.lessons }}</span>
                        </div>
                        <div class="flex items-center justify-between">
                          <span class="text-gray-600">Daraja:</span>
                          <span class="font-medium">{{ selectedCourse.level }}</span>
                        </div>
                        <div class="flex items-center justify-between">
                          <span class="text-gray-600">Talabalar:</span>
                          <span class="font-medium">{{ selectedCourse.students }}</span>
                        </div>
                        <div class="flex items-center justify-between">
                          <span class="text-gray-600">Reyting:</span>
                          <div class="flex items-center">
                            <p-rating [(ngModel)]="selectedCourse.rating" [readonly]="true" class="text-xs mr-2">
                            </p-rating>
                            <span class="font-medium">({{ selectedCourse.rating }})</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Enroll Button -->
                    <div class="bg-blue-50 rounded-xl p-6 text-center">
                      <div class="text-2xl font-bold text-blue-600 mb-2">{{ selectedCourse.price }}</div>
                      <p-button
                        [label]="selectedCourse.enrolled ? 'Kursni davom ettirish' : 'Kursga yozilish'"
                        [icon]="selectedCourse.enrolled ? 'pi pi-play' : 'pi pi-shopping-cart'"
                        class="w-full btn-primary mb-3"
                        (onClick)="selectedCourse.enrolled ? continueCourse(selectedCourse) : enrollCourse(selectedCourse)"
                      >
                      </p-button>
                      <p class="text-xs text-gray-600">30 kunlik pul qaytarish kafolati</p>
                    </div>

                    <!-- Tags -->
                    <div>
                      <h5 class="font-semibold text-gray-900 mb-3">Teglar</h5>
                      <div class="flex flex-wrap gap-2">
                        <p-tag *ngFor="let tag of selectedCourse.tags" [value]="tag" class="text-xs">
                        </p-tag>
                      </div>
                    </div>
                  </div>
                </div>
                </p-tabpanel>

              <!-- Course Content -->
                <p-tabpanel value="content">
                <div class="max-w-4xl">
                  <p-accordion [multiple]="true">
                    <p-accordionTab 
                      *ngFor="let module of selectedCourse.modules; let i = index" 
                      [header]="module.title"
                    >
                      <ng-template pTemplate="header">
                        <div class="flex items-center justify-between w-full">
                          <div class="flex items-center">
                            <i class="pi pi-folder mr-3 text-blue-600"></i>
                            <span class="font-semibold">{{ module.title }}</span>
                          </div>
                          <div class="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{{ module.lessons.length }} dars</span>
                            <span>{{ module.duration }}</span>
                            <i *ngIf="module.completed" class="pi pi-check-circle text-green-600"></i>
                          </div>
                        </div>
                      </ng-template>
                      
                      <div class="space-y-3">
                        <div 
                          *ngFor="let lesson of module.lessons" 
                          class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                          (click)="playLesson(lesson)"
                        >
                          <div class="flex items-center">
                            <i 
                              [class]="getLessonIcon(lesson.type)" 
                              class="mr-3 text-blue-600"
                            ></i>
                            <div>
                              <h6 class="font-medium text-gray-900">{{ lesson.title }}</h6>
                              <p class="text-sm text-gray-600">{{ lesson.type | titlecase }} • {{ lesson.duration }}</p>
                            </div>
                          </div>
                          <div class="flex items-center space-x-2">
                            <i *ngIf="lesson.completed" class="pi pi-check-circle text-green-600"></i>
                            <i class="pi pi-play text-gray-400"></i>
                          </div>
                        </div>
                      </div>
                    </p-accordionTab>
                  </p-accordion>
                </div>
                </p-tabpanel>

              <!-- Reviews -->
                <p-tabpanel value="reviews">
                <div class="max-w-4xl">
                  <!-- Reviews Summary -->
                  <div class="bg-gray-50 rounded-xl p-6 mb-8">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div class="text-center">
                        <div class="text-4xl font-bold text-gray-900 mb-2">{{ selectedCourse.rating }}</div>
                        <p-rating [(ngModel)]="selectedCourse.rating" [readonly]="true" class="mb-2">
                        </p-rating>
                        <p class="text-gray-600">{{ selectedCourse.students }} talaba baholadi</p>
                      </div>
                      <div class="space-y-2">
                        <div class="flex items-center space-x-3">
                          <span class="text-sm w-8">5 ⭐</span>
                          <p-progressBar [value]="75" class="flex-1 h-2"></p-progressBar>
                          <span class="text-sm text-gray-600 w-8">75%</span>
                        </div>
                        <div class="flex items-center space-x-3">
                          <span class="text-sm w-8">4 ⭐</span>
                          <p-progressBar [value]="20" class="flex-1 h-2"></p-progressBar>
                          <span class="text-sm text-gray-600 w-8">20%</span>
                        </div>
                        <div class="flex items-center space-x-3">
                          <span class="text-sm w-8">3 ⭐</span>
                          <p-progressBar [value]="3" class="flex-1 h-2"></p-progressBar>
                          <span class="text-sm text-gray-600 w-8">3%</span>
                        </div>
                        <div class="flex items-center space-x-3">
                          <span class="text-sm w-8">2 ⭐</span>
                          <p-progressBar [value]="1" class="flex-1 h-2"></p-progressBar>
                          <span class="text-sm text-gray-600 w-8">1%</span>
                        </div>
                        <div class="flex items-center space-x-3">
                          <span class="text-sm w-8">1 ⭐</span>
                          <p-progressBar [value]="1" class="flex-1 h-2"></p-progressBar>
                          <span class="text-sm text-gray-600 w-8">1%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Individual Reviews -->
                  <div class="space-y-6">
                    <div *ngFor="let review of courseReviews" class="border-b border-gray-200 pb-6">
                      <div class="flex items-start space-x-4">
                        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <span class="text-blue-600 font-semibold">{{ review.author.charAt(0) }}</span>
                        </div>
                        <div class="flex-1">
                          <div class="flex items-center justify-between mb-2">
                            <h6 class="font-semibold text-gray-900">{{ review.author }}</h6>
                            <span class="text-sm text-gray-500">{{ review.date }}</span>
                          </div>
                          <p-rating [(ngModel)]="review.rating" [readonly]="true" class="mb-3 text-sm">
                          </p-rating>
                          <p class="text-gray-600">{{ review.comment }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </p-tabpanel>
              </p-tabpanels>
            </p-tabs>
          </div>
        </p-dialog>

        <!-- Video Player Dialog -->
        <p-dialog
          [(visible)]="showVideoDialog"
          [modal]="true"
          [closable]="true"
          [style]="{ width: '90vw', maxWidth: '1000px' }"
          styleClass="video-dialog"
        >
          <ng-template pTemplate="header">
            <div class="flex items-center justify-between w-full">
              <h3 class="text-xl font-bold text-gray-900">{{ currentLesson?.title }}</h3>
              <div class="flex items-center space-x-4 text-sm text-gray-600">
                <span>{{ currentLesson?.type | titlecase }}</span>
                <span>{{ currentLesson?.duration }}</span>
              </div>
            </div>
          </ng-template>

          <div *ngIf="currentLesson">
            <!-- Video Player -->
            <div *ngIf="currentLesson.type === 'video'" class="bg-gray-900 rounded-xl mb-6 relative overflow-hidden" style="aspect-ratio: 16/9;">
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center cursor-pointer">
                  <i class="pi pi-play text-white text-3xl ml-1"></i>
                </div>
              </div>
            </div>

            <!-- Text Content -->
            <div *ngIf="currentLesson.type === 'text'" class="prose max-w-none mb-6">
              <div class="bg-gray-50 rounded-xl p-6">
                <p>{{ currentLesson.content || 'Bu darsda matematik analizning asosiy tushunchalari batafsil ko\'rib chiqiladi...' }}</p>
              </div>
            </div>

            <!-- Lesson Navigation -->
            <div class="flex items-center justify-between">
              <p-button
                label="Oldingi dars"
                icon="pi pi-chevron-left"
                [outlined]="true"
                (onClick)="previousLesson()"
              >
              </p-button>

              <div class="flex items-center space-x-4">
                <p-checkbox 
                  [(ngModel)]="currentLesson.completed" 
                  [binary]="true"
                  inputId="completed"
                  (onChange)="markLessonComplete()"
                >
                </p-checkbox>
                <label for="completed" class="text-sm text-gray-600">Darsni yakunlangan deb belgilash</label>
              </div>

              <p-button
                label="Keyingi dars"
                icon="pi pi-chevron-right"
                iconPos="right"
                (onClick)="nextLesson()"
                class="btn-primary"
              >
              </p-button>
            </div>
          </div>
        </p-dialog>
      </div>
    </div>
  `,
})
export class CoursesComponent implements OnInit {
  showCourseDialog = false;
  showVideoDialog = false;
  selectedCourse: Course | null = null;
  currentLesson: Lesson | null = null;
  selectedFilter = 'all';

  categories = [
    { name: 'Algebra', icon: 'pi pi-calculator', count: 12, value: 'algebra' },
    { name: 'Geometriya', icon: 'pi pi-compass', count: 8, value: 'geometry' },
    { name: 'Analiz', icon: 'pi pi-chart-line', count: 15, value: 'analysis' },
    { name: 'Ehtimollar', icon: 'pi pi-percentage', count: 6, value: 'probability' },
    { name: 'Diskret', icon: 'pi pi-sitemap', count: 9, value: 'discrete' },
    { name: 'Statistika', icon: 'pi pi-chart-bar', count: 7, value: 'statistics' },
  ];

  courses: Course[] = [
    {
      id: 1,
      title: 'Matematik Analiz: Noldan Professionallik Darajasigacha',
      description: 'Matematik analizning barcha asosiy mavzularini o\'rganing. Limitlar, hosilalar, integrallar va ularning amaliy qo\'llanilishi.',
      instructor: 'Prof. Aziz Karimov',
      duration: '24 soat',
      lessons: 48,
      level: 'Yuqori',
      rating: 4.9,
      students: 2340,
      price: '250,000 so\'m',
      image: '',
      tags: ['Analiz', 'Limitlar', 'Hosilalar', 'Integrallar'],
      progress: 35,
      enrolled: true,
      modules: [
        {
          id: 1,
          title: 'Kirish va Asosiy Tushunchalar',
          duration: '2 soat',
          lessons: [
            { id: 1, title: 'Kursga kirish', duration: '10 min', type: 'video', completed: true },
            { id: 2, title: 'Matematik analiz tarixi', duration: '15 min', type: 'text', completed: true },
            { id: 3, title: 'Asosiy tushunchalar', duration: '20 min', type: 'video', completed: false },
          ]
        },
        {
          id: 2,
          title: 'Limitlar Nazariyasi',
          duration: '6 soat',
          lessons: [
            { id: 4, title: 'Limit tushunchasi', duration: '25 min', type: 'video', completed: false },
            { id: 5, title: 'Limitlarning xossalari', duration: '30 min', type: 'video', completed: false },
            { id: 6, title: 'Amaliy mashqlar', duration: '45 min', type: 'quiz', completed: false },
          ]
        }
      ]
    },
    {
      id: 2,
      title: 'Chiziqli Algebra Asoslari',
      description: 'Vektorlar, matritsalar va chiziqli tenglamalar sistemasini o\'rganish. Nazariy bilim va amaliy ko\'nikmalar.',
      instructor: 'Prof. Aziz Karimov',
      duration: '12 soat',
      lessons: 24,
      level: 'O\'rta',
      rating: 4.8,
      students: 1250,
      price: 'Bepul',
      image: '',
      tags: ['Algebra', 'Matritsalar', 'Vektorlar'],
      progress: 65,
      enrolled: true,
      modules: [
        {
          id: 1,
          title: 'Vektorlar',
          duration: '4 soat',
          lessons: [
            { id: 1, title: 'Vektor tushunchasi', duration: '20 min', type: 'video', completed: true },
            { id: 2, title: 'Vektorlar ustida amallar', duration: '25 min', type: 'video', completed: true },
          ]
        }
      ]
    },
    {
      id: 3,
      title: 'Planimetriya va Stereometriya',
      description: 'Tekislik va fazoviy geometriya asoslari. Shakllar, hajmlar va yuzalar hisoblash.',
      instructor: 'Prof. Aziz Karimov',
      duration: '16 soat',
      lessons: 32,
      level: 'Boshlang\'ich',
      rating: 4.9,
      students: 980,
      price: '150,000 so\'m',
      image: '',
      tags: ['Geometriya', 'Shakllar', 'Hajm'],
      enrolled: false,
      modules: [
        {
          id: 1,
          title: 'Planimetriya asoslari',
          duration: '8 soat',
          lessons: [
            { id: 1, title: 'Nuqta, to\'g\'ri chiziq, tekislik', duration: '15 min', type: 'video', completed: false },
            { id: 2, title: 'Burchaklar', duration: '20 min', type: 'video', completed: false },
          ]
        }
      ]
    }
  ];

  filteredCourses: Course[] = [];
  courseReviews = [
    {
      author: 'Aziz Rahimov',
      rating: 5,
      date: '2 kun oldin',
      comment: 'Juda yaxshi kurs! Professor juda aniq va tushunarli tushuntiradi. Tavsiya qilaman.'
    },
    {
      author: 'Malika Karimova',
      rating: 5,
      date: '1 hafta oldin',
      comment: 'Matematik analizni bu darajada yaxshi tushuntirgan kursni hech yerda ko\'rmaganman. Rahmat!'
    },
    {
      author: 'Bobur Toshmatov',
      rating: 4,
      date: '2 hafta oldin',
      comment: 'Yaxshi kurs, lekin ba\'zi qismlar biroz qiyin. Lekin umuman olganda mamnunman.'
    }
  ];

  ngOnInit() {
    this.filteredCourses = [...this.courses];
  }

  filterCourses(level: string) {
    this.selectedFilter = level;
    if (level === 'all') {
      this.filteredCourses = [...this.courses];
    } else {
      const levelMap: { [key: string]: string } = {
        'beginner': 'Boshlang\'ich',
        'intermediate': 'O\'rta',
        'advanced': 'Yuqori'
      };
      this.filteredCourses = this.courses.filter(course => course.level === levelMap[level]);
    }
  }

  filterByCategory(category: string) {
    // Category filtering logic
    this.filteredCourses = this.courses.filter(course => 
      course.tags.some(tag => tag.toLowerCase().includes(category.toLowerCase()))
    );
  }

  viewCourse(course: Course) {
    this.selectedCourse = course;
    this.showCourseDialog = true;
  }

  startCourse(course: Course) {
    if (course.enrolled) {
      this.continueCourse(course);
    } else {
      this.enrollCourse(course);
    }
  }

  enrollCourse(course: Course) {
    // Enrollment logic
    course.enrolled = true;
    course.progress = 0;
    alert(`Siz "${course.title}" kursiga muvaffaqiyatli yozildingiz!`);
    this.showCourseDialog = false;
  }

  continueCourse(course: Course) {
    this.selectedCourse = course;
    // Find first incomplete lesson
    for (const module of course.modules) {
      for (const lesson of module.lessons) {
        if (!lesson.completed) {
          this.playLesson(lesson);
          return;
        }
      }
    }
  }

  playLesson(lesson: Lesson) {
    this.currentLesson = lesson;
    this.showVideoDialog = true;
    this.showCourseDialog = false;
  }

  getLessonIcon(type: string): string {
    switch (type) {
      case 'video': return 'pi pi-play-circle';
      case 'text': return 'pi pi-file-text';
      case 'quiz': return 'pi pi-question-circle';
      default: return 'pi pi-file';
    }
  }

  markLessonComplete() {
    if (this.currentLesson && this.selectedCourse) {
      // Update progress
      const totalLessons = this.selectedCourse.modules.reduce((total, module) => total + module.lessons.length, 0);
      const completedLessons = this.selectedCourse.modules.reduce((total, module) => 
        total + module.lessons.filter(lesson => lesson.completed).length, 0
      );
      this.selectedCourse.progress = Math.round((completedLessons / totalLessons) * 100);
    }
  }

  nextLesson() {
    // Logic to go to next lesson
    alert('Keyingi darsga o\'tish...');
  }

  previousLesson() {
    // Logic to go to previous lesson
    alert('Oldingi darsga qaytish...');
  }
}