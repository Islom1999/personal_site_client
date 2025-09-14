import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { TabsModule } from 'primeng/tabs';
import { ProgressBarModule } from 'primeng/progressbar';
import { TagModule } from 'primeng/tag';
import { ChartModule } from 'primeng/chart';
import { DatePickerModule } from 'primeng/datepicker';

interface UserCourse {
  id: number;
  title: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  lastAccessed: Date;
  certificate?: boolean;
}

interface TestResult {
  id: number;
  testName: string;
  score: number;
  maxScore: number;
  percentage: number;
  date: Date;
  category: string;
  attempts: number;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    AvatarModule,
    TabsModule,
    ProgressBarModule,
    TagModule,
    ChartModule,
    DatePickerModule
  ],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Profile Header -->
        <div class="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 mb-8 text-white">
          <div class="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <!-- Avatar -->
            <div class="relative">
              <p-avatar
                [image]="user?.avatar"
                [label]="user?.name?.charAt(0)"
                shape="circle"
                size="xlarge"
                class="w-32 h-32 border-4 border-white shadow-lg"
              >
              </p-avatar>
              <button class="absolute bottom-2 right-2 w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors">
                <i class="pi pi-camera text-sm"></i>
              </button>
            </div>

            <!-- User Info -->
            <div class="flex-1 text-center md:text-left">
              <h1 class="text-3xl font-bold mb-2">{{ user?.name }}</h1>
              <p class="text-blue-100 text-lg mb-4">{{ user?.email }}</p>
              
              <!-- Stats -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div class="text-2xl font-bold">{{ userCourses.length }}</div>
                  <div class="text-blue-100 text-sm">Kurslar</div>
                </div>
                <div class="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div class="text-2xl font-bold">{{ completedCourses }}</div>
                  <div class="text-blue-100 text-sm">Yakunlangan</div>
                </div>
                <div class="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div class="text-2xl font-bold">{{ testResults.length }}</div>
                  <div class="text-blue-100 text-sm">Testlar</div>
                </div>
                <div class="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div class="text-2xl font-bold">{{ averageScore }}%</div>
                  <div class="text-blue-100 text-sm">O'rtacha ball</div>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex flex-col space-y-2">
              <p-button
                label="Profilni tahrirlash"
                icon="pi pi-pencil"
                [outlined]="true"
                class="bg-white/10 border-white/20 text-white hover:bg-white/20"
                (onClick)="editProfile()"
              >
              </p-button>
              <p-button
                label="Sozlamalar"
                icon="pi pi-cog"
                [text]="true"
                class="text-white hover:bg-white/10"
              >
              </p-button>
            </div>
          </div>
        </div>

        <!-- Profile Content -->
        <p-tabs value="courses">
          <p-tablist>
            <p-tab value="courses">
              <i class="pi pi-book mr-2"></i>
              Mening Kurslarim
            </p-tab>
            <p-tab value="tests">
              <i class="pi pi-chart-bar mr-2"></i>
              Test Natijalari
            </p-tab>
            <p-tab value="certificates">
              <i class="pi pi-award mr-2"></i>
              Sertifikatlar
            </p-tab>
            <p-tab value="settings">
              <i class="pi pi-user mr-2"></i>
              Shaxsiy Ma'lumotlar
            </p-tab>
          </p-tablist>
          
          <p-tabpanels>
            <!-- Courses Tab -->
            <p-tabpanel value="courses">
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Courses List -->
                <div class="lg:col-span-2">
                  <div class="space-y-6">
                    <div *ngFor="let course of userCourses" class="bg-white rounded-2xl p-6 shadow-lg">
                      <div class="flex items-start justify-between mb-4">
                        <div class="flex-1">
                          <h3 class="text-xl font-bold text-gray-900 mb-2">{{ course.title }}</h3>
                          <div class="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                            <span>{{ course.completedLessons }}/{{ course.totalLessons }} dars</span>
                            <span>Oxirgi kirish: {{ formatDate(course.lastAccessed) }}</span>
                          </div>
                        </div>
                        <div class="flex items-center space-x-2">
                          <p-tag 
                            *ngIf="course.certificate" 
                            value="Sertifikat" 
                            severity="success"
                            class="text-xs"
                          >
                          </p-tag>
                        </div>
                      </div>

                      <!-- Progress -->
                      <div class="mb-4">
                        <div class="flex items-center justify-between text-sm mb-2">
                          <span class="text-gray-600">Jarayon</span>
                          <span class="font-medium text-blue-600">{{ course.progress }}%</span>
                        </div>
                        <p-progressBar [value]="course.progress" class="h-2"></p-progressBar>
                      </div>

                      <!-- Actions -->
                      <div class="flex space-x-3">
                        <p-button
                          label="Davom etish"
                          icon="pi pi-play"
                          class="btn-primary"
                          (onClick)="continueCourse(course)"
                        >
                        </p-button>
                        <p-button
                          *ngIf="course.certificate"
                          label="Sertifikat"
                          icon="pi pi-download"
                          [outlined]="true"
                          class="text-green-600 border-green-600 hover:bg-green-50"
                        >
                        </p-button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Progress Chart -->
                <div class="space-y-6">
                  <div class="bg-white rounded-2xl p-6 shadow-lg">
                    <h4 class="text-lg font-semibold text-gray-900 mb-4">O'qish Statistikasi</h4>
                    <p-chart type="doughnut" [data]="courseChartData" [options]="chartOptions" class="w-full h-48">
                    </p-chart>
                  </div>

                  <div class="bg-white rounded-2xl p-6 shadow-lg">
                    <h4 class="text-lg font-semibold text-gray-900 mb-4">Haftalik Faollik</h4>
                    <p-chart type="bar" [data]="activityChartData" [options]="activityChartOptions" class="w-full h-48">
                    </p-chart>
                  </div>
                </div>
              </div>
            </p-tabpanel>

            <!-- Tests Tab -->
            <p-tabpanel value="tests">
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Test Results -->
                <div class="lg:col-span-2">
                  <div class="space-y-4">
                    <div *ngFor="let test of testResults" class="bg-white rounded-2xl p-6 shadow-lg">
                      <div class="flex items-center justify-between mb-4">
                        <div>
                          <h3 class="text-lg font-semibold text-gray-900">{{ test.testName }}</h3>
                          <p class="text-gray-600 text-sm">{{ test.category }} • {{ formatDate(test.date) }}</p>
                        </div>
                        <div class="text-right">
                          <div class="text-2xl font-bold" [class]="getScoreColor(test.percentage)">
                            {{ test.percentage }}%
                          </div>
                          <div class="text-sm text-gray-600">{{ test.score }}/{{ test.maxScore }}</div>
                        </div>
                      </div>

                      <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{{ test.attempts }} urinish</span>
                          <p-tag [value]="getGrade(test.percentage)" [severity]="getGradeSeverity(test.percentage)" class="text-xs">
                          </p-tag>
                        </div>
                        <p-button
                          label="Batafsil"
                          icon="pi pi-eye"
                          [text]="true"
                          class="text-blue-600 hover:bg-blue-50"
                        >
                        </p-button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Test Statistics -->
                <div class="space-y-6">
                  <div class="bg-white rounded-2xl p-6 shadow-lg">
                    <h4 class="text-lg font-semibold text-gray-900 mb-4">Test Statistikasi</h4>
                    <div class="space-y-4">
                      <div class="flex items-center justify-between">
                        <span class="text-gray-600">Jami testlar:</span>
                        <span class="font-semibold">{{ testResults.length }}</span>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-gray-600">O'rtacha ball:</span>
                        <span class="font-semibold text-blue-600">{{ averageScore }}%</span>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-gray-600">Eng yuqori ball:</span>
                        <span class="font-semibold text-green-600">{{ highestScore }}%</span>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-gray-600">Muvaffaqiyat darajasi:</span>
                        <span class="font-semibold">{{ successRate }}%</span>
                      </div>
                    </div>
                  </div>

                  <div class="bg-white rounded-2xl p-6 shadow-lg">
                    <h4 class="text-lg font-semibold text-gray-900 mb-4">Kategoriyalar bo'yicha</h4>
                    <p-chart type="radar" [data]="categoryChartData" [options]="radarChartOptions" class="w-full h-48">
                    </p-chart>
                  </div>
                </div>
              </div>
            </p-tabpanel>

            <!-- Certificates Tab -->
            <p-tabpanel value="certificates">
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div *ngFor="let cert of certificates" class="bg-white rounded-2xl p-6 shadow-lg text-center">
                  <div class="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <i class="pi pi-award text-white text-2xl"></i>
                  </div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ cert.courseName }}</h3>
                  <p class="text-gray-600 text-sm mb-4">{{ formatDate(cert.issueDate) }}</p>
                  <div class="flex space-x-2">
                    <p-button
                      label="Ko'rish"
                      icon="pi pi-eye"
                      [outlined]="true"
                      class="flex-1"
                    >
                    </p-button>
                    <p-button
                      label="Yuklab olish"
                      icon="pi pi-download"
                      class="flex-1 btn-primary"
                    >
                    </p-button>
                  </div>
                </div>
              </div>
            </p-tabpanel>

            <!-- Settings Tab -->
            <p-tabpanel value="settings">
              <div class="max-w-2xl">
                <div class="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 class="text-xl font-semibold text-gray-900 mb-6">Shaxsiy Ma'lumotlar</h3>
                  
                  <form class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div class="flex flex-col">
                        <label class="text-sm font-medium text-gray-700 mb-2">To'liq ism</label>
                        <input
                          type="text"
                          pInputText
                          [(ngModel)]="editForm.name"
                          name="name"
                          class="w-full"
                        />
                      </div>
                      <div class="flex flex-col">
                        <label class="text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          pInputText
                          [(ngModel)]="editForm.email"
                          name="email"
                          class="w-full"
                        />
                      </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div class="flex flex-col">
                        <label class="text-sm font-medium text-gray-700 mb-2">Telefon</label>
                        <input
                          type="tel"
                          pInputText
                          [(ngModel)]="editForm.phone"
                          name="phone"
                          class="w-full"
                        />
                      </div>
                      <div class="flex flex-col">
                        <label class="text-sm font-medium text-gray-700 mb-2">Tug'ilgan sana</label>
                        <p-datepicker [(ngModel)]="editForm.birthDate" name="birthDate"
                          dateFormat="dd/mm/yy"
                          class="w-full" />
                        <p-calendar
                          [(ngModel)]="editForm.birthDate"
                          name="birthDate"
                          dateFormat="dd/mm/yy"
                          class="w-full"
                        >
                        </p-calendar>
                      </div>
                    </div>

                    <div class="flex space-x-4">
                      <p-button
                        label="Saqlash"
                        icon="pi pi-check"
                        class="btn-primary"
                        (onClick)="saveProfile()"
                      >
                      </p-button>
                      <p-button
                        label="Bekor qilish"
                        icon="pi pi-times"
                        [outlined]="true"
                        (onClick)="cancelEdit()"
                      >
                      </p-button>
                    </div>
                  </form>
                </div>
              </div>
            </p-tabpanel>
          </p-tabpanels>
        </p-tabs>
      </div>
    </div>
  `
})
export class ProfileComponent implements OnInit {
  user: any = null;
  editForm: any = {};

  userCourses: UserCourse[] = [
    {
      id: 1,
      title: 'Matematik Analiz: Noldan Professionallik Darajasigacha',
      progress: 75,
      totalLessons: 48,
      completedLessons: 36,
      lastAccessed: new Date('2024-01-20'),
      certificate: false
    },
    {
      id: 2,
      title: 'Chiziqli Algebra Asoslari',
      progress: 100,
      totalLessons: 24,
      completedLessons: 24,
      lastAccessed: new Date('2024-01-18'),
      certificate: true
    },
    {
      id: 3,
      title: 'Planimetriya va Stereometriya',
      progress: 45,
      totalLessons: 32,
      completedLessons: 14,
      lastAccessed: new Date('2024-01-15'),
      certificate: false
    }
  ];

  testResults: TestResult[] = [
    {
      id: 1,
      testName: 'Chiziqli Tenglamalar',
      score: 13,
      maxScore: 15,
      percentage: 87,
      date: new Date('2024-01-19'),
      category: 'Algebra',
      attempts: 2
    },
    {
      id: 2,
      testName: 'Uchburchaklar va Burchaklar',
      score: 11,
      maxScore: 12,
      percentage: 92,
      date: new Date('2024-01-17'),
      category: 'Geometriya',
      attempts: 1
    },
    {
      id: 3,
      testName: 'Kvadrat Tenglamalar',
      score: 14,
      maxScore: 18,
      percentage: 78,
      date: new Date('2024-01-15'),
      category: 'Algebra',
      attempts: 3
    },
    {
      id: 4,
      testName: 'Limitlar va Uzluksizlik',
      score: 18,
      maxScore: 20,
      percentage: 90,
      date: new Date('2024-01-12'),
      category: 'Analiz',
      attempts: 1
    }
  ];

  certificates = [
    {
      id: 1,
      courseName: 'Chiziqli Algebra Asoslari',
      issueDate: new Date('2024-01-18'),
      certificateUrl: '#'
    }
  ];

  // Chart data
  courseChartData: any;
  chartOptions: any;
  activityChartData: any;
  activityChartOptions: any;
  categoryChartData: any;
  radarChartOptions: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadUserData();
    this.initializeCharts();
  }

  loadUserData() {
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
      this.router.navigate(['/login']);
      return;
    }
    
    this.user = JSON.parse(userData);
    this.editForm = { ...this.user };
  }

  initializeCharts() {
    // Course progress chart
    this.courseChartData = {
      labels: ['Yakunlangan', 'Jarayonda', 'Boshlanmagan'],
      datasets: [{
        data: [this.completedCourses, this.userCourses.length - this.completedCourses, 2],
        backgroundColor: ['#10B981', '#3B82F6', '#E5E7EB']
      }]
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    };

    // Activity chart
    this.activityChartData = {
      labels: ['Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan', 'Yak'],
      datasets: [{
        label: 'Daqiqalar',
        data: [45, 60, 30, 75, 90, 120, 80],
        backgroundColor: '#3B82F6'
      }]
    };

    this.activityChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    // Category performance radar chart
    this.categoryChartData = {
      labels: ['Algebra', 'Geometriya', 'Analiz', 'Ehtimollar', 'Diskret'],
      datasets: [{
        label: 'Natijalar (%)',
        data: [85, 92, 78, 88, 75],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: '#3B82F6',
        pointBackgroundColor: '#3B82F6'
      }]
    };

    this.radarChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        r: {
          beginAtZero: true,
          max: 100
        }
      }
    };
  }

  get completedCourses(): number {
    return this.userCourses.filter(course => course.progress === 100).length;
  }

  get averageScore(): number {
    if (this.testResults.length === 0) return 0;
    const total = this.testResults.reduce((sum, test) => sum + test.percentage, 0);
    return Math.round(total / this.testResults.length);
  }

  get highestScore(): number {
    if (this.testResults.length === 0) return 0;
    return Math.max(...this.testResults.map(test => test.percentage));
  }

  get successRate(): number {
    if (this.testResults.length === 0) return 0;
    const passed = this.testResults.filter(test => test.percentage >= 70).length;
    return Math.round((passed / this.testResults.length) * 100);
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('uz-UZ');
  }

  getScoreColor(percentage: number): string {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  }

  getGrade(percentage: number): string {
    if (percentage >= 90) return '5';
    if (percentage >= 80) return '4';
    if (percentage >= 70) return '3';
    if (percentage >= 60) return '2';
    return '1';
  }

  getGradeSeverity(percentage: number): string {
    if (percentage >= 80) return 'success';
    if (percentage >= 70) return 'info';
    if (percentage >= 60) return 'warning';
    return 'danger';
  }

  continueCourse(course: UserCourse) {
    this.router.navigate(['/courses']);
  }

  editProfile() {
    // Toggle edit mode or open edit dialog
  }

  saveProfile() {
    // Save profile changes
    this.user = { ...this.editForm };
    localStorage.setItem('currentUser', JSON.stringify(this.user));
    alert('Profil muvaffaqiyatli yangilandi!');
  }

  cancelEdit() {
    this.editForm = { ...this.user };
  }
}