import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';

interface Test {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  questions: number;
  duration: number;
  attempts: number;
  bestScore?: number;
  icon: string;
  color: string;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

@Component({
  selector: 'app-tests',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    TagModule,
    ProgressBarModule,
    DialogModule,
    RadioButtonModule,
    FormsModule,
  ],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">Matematik Testlar</h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Bilimingizni sinab ko'ring va matematik ko'nikmalaringizni rivojlantiring. Har xil
            darajadagi testlar orqali o'z darajangizni aniqlang
          </p>
        </div>

        <!-- Statistics -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div class="bg-white rounded-2xl p-6 text-center shadow-lg">
            <div
              class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4"
            >
              <i class="pi pi-check-circle text-blue-600 text-xl"></i>
            </div>
            <div class="text-2xl font-bold text-gray-900 mb-1">24</div>
            <div class="text-gray-600 text-sm">Yakunlangan testlar</div>
          </div>
          <div class="bg-white rounded-2xl p-6 text-center shadow-lg">
            <div
              class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4"
            >
              <i class="pi pi-star text-green-600 text-xl"></i>
            </div>
            <div class="text-2xl font-bold text-gray-900 mb-1">87%</div>
            <div class="text-gray-600 text-sm">O'rtacha natija</div>
          </div>
          <div class="bg-white rounded-2xl p-6 text-center shadow-lg">
            <div
              class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4"
            >
              <i class="pi pi-clock text-purple-600 text-xl"></i>
            </div>
            <div class="text-2xl font-bold text-gray-900 mb-1">156</div>
            <div class="text-gray-600 text-sm">Sarflangan daqiqalar</div>
          </div>
          <div class="bg-white rounded-2xl p-6 text-center shadow-lg">
            <div
              class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4"
            >
              <i class="pi pi-trophy text-orange-600 text-xl"></i>
            </div>
            <div class="text-2xl font-bold text-gray-900 mb-1">12</div>
            <div class="text-gray-600 text-sm">Yuqori natijalar</div>
          </div>
        </div>

        <!-- Test Categories -->
        <div class="mb-12">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Test Kategoriyalari</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              *ngFor="let category of testCategories"
              class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              <div class="flex items-center justify-between mb-4">
                <div
                  [class]="
                    'w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ' +
                    category.bgColor
                  "
                >
                  <i [class]="category.icon + ' text-xl ' + category.textColor"></i>
                </div>
                <span [class]="'px-3 py-1 text-xs font-medium rounded-full ' + category.badgeColor">
                  {{ category.count }} test
                </span>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">{{ category.name }}</h3>
              <p class="text-gray-600 text-sm mb-4">{{ category.description }}</p>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">{{ category.difficulty }}</span>
                <p-button
                  label="Boshlash"
                  [text]="true"
                  [class]="'hover:bg-gray-50 ' + category.textColor"
                >
                </p-button>
              </div>
            </div>
          </div>
        </div>

        <!-- Available Tests -->
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Mavjud Testlar</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              *ngFor="let test of tests"
              class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div class="p-6">
                <!-- Test Header -->
                <div class="flex items-center justify-between mb-4">
                  <div
                    [class]="'w-12 h-12 rounded-xl flex items-center justify-center ' + test.color"
                  >
                    <i [class]="test.icon" class="text-white text-xl"></i>
                  </div>
                  <span
                    class="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                  >
                    {{ test.difficulty }}
                  </span>
                </div>

                <!-- Test Title -->
                <h3 class="text-xl font-bold text-gray-900 mb-3">{{ test.title }}</h3>

                <!-- Test Description -->
                <p class="text-gray-600 mb-4 line-clamp-2">{{ test.description }}</p>

                <!-- Test Info -->
                <div class="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div class="flex items-center text-gray-500">
                    <i class="pi pi-question-circle mr-2"></i>
                    {{ test.questions }} savol
                  </div>
                  <div class="flex items-center text-gray-500">
                    <i class="pi pi-clock mr-2"></i>
                    {{ test.duration }} daqiqa
                  </div>
                  <div class="flex items-center text-gray-500">
                    <i class="pi pi-refresh mr-2"></i>
                    {{ test.attempts }} urinish
                  </div>
                  <div class="flex items-center text-gray-500" *ngIf="test.bestScore">
                    <i class="pi pi-star mr-2"></i>
                    {{ test.bestScore }}% eng yaxshi
                  </div>
                </div>

                <!-- Progress (if attempted) -->
                <div *ngIf="test.bestScore" class="mb-4">
                  <div class="flex items-center justify-between text-sm mb-2">
                    <span class="text-gray-600">Eng yaxshi natija</span>
                    <span class="text-green-600 font-medium">{{ test.bestScore }}%</span>
                  </div>
                  <p-progressBar [value]="test.bestScore" class="h-2"> </p-progressBar>
                </div>

                <!-- Action Button -->
                <p-button
                  [label]="test.bestScore ? 'Qayta urinish' : 'Testni boshlash'"
                  icon="pi pi-play"
                  class="w-full btn-primary"
                  (onClick)="startTest(test)"
                >
                </p-button>
              </div>
            </div>
          </div>
        </div>

        <!-- Test Dialog -->
        <p-dialog
          [(visible)]="showTestDialog"
          [modal]="true"
          [closable]="false"
          [style]="{ width: '90vw', maxWidth: '800px' }"
          styleClass="test-dialog"
        >
          <ng-template pTemplate="header">
            <div class="flex items-center justify-between w-full">
              <h3 class="text-xl font-bold text-gray-900">{{ selectedTest?.title }}</h3>
              <div class="flex items-center space-x-4 text-sm text-gray-600">
                <span>{{ currentQuestionIndex + 1 }} / {{ selectedTest?.questions }}</span>
                <span class="flex items-center">
                  <i class="pi pi-clock mr-1"></i>
                  {{ timeRemaining }}:00
                </span>
              </div>
            </div>
          </ng-template>

          <div class="py-4" *ngIf="selectedTest && currentQuestion">
            <!-- Progress Bar -->
            <p-progressBar
              [value]="((currentQuestionIndex + 1) / selectedTest.questions) * 100"
              class="mb-6 h-2"
            >
            </p-progressBar>

            <!-- Question -->
            <div class="mb-6">
              <h4 class="text-lg font-semibold text-gray-900 mb-4">
                {{ currentQuestion.question }}
              </h4>

              <!-- Options -->
              <div class="space-y-3">
                <div
                  *ngFor="let option of currentQuestion.options; let i = index"
                  class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                  [class.border-blue-500]="selectedAnswer === i"
                  [class.bg-blue-50]="selectedAnswer === i"
                  (click)="selectAnswer(i)"
                >
                  <p-radioButton [inputId]="'option' + i" [value]="i" [(ngModel)]="selectedAnswer">
                  </p-radioButton>
                  <label [for]="'option' + i" class="ml-3 cursor-pointer flex-1">
                    {{ option }}
                  </label>
                </div>
              </div>
            </div>

            <!-- Navigation -->
            <div class="flex items-center justify-between">
              <p-button
                label="Oldingi"
                icon="pi pi-chevron-left"
                [outlined]="true"
                [disabled]="currentQuestionIndex === 0"
                (onClick)="previousQuestion()"
              >
              </p-button>

              <p-button
                [label]="
                  currentQuestionIndex === selectedTest.questions - 1 ? 'Yakunlash' : 'Keyingi'
                "
                [icon]="
                  currentQuestionIndex === selectedTest.questions - 1
                    ? 'pi pi-check'
                    : 'pi pi-chevron-right'
                "
                [iconPos]="currentQuestionIndex === selectedTest.questions - 1 ? 'left' : 'right'"
                [disabled]="selectedAnswer === null"
                (onClick)="nextQuestion()"
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
export class TestsComponent {
  showTestDialog = false;
  selectedTest: Test | null = null;
  currentQuestionIndex = 0;
  selectedAnswer: number | null = null;
  timeRemaining = 0;
  answers: (number | null)[] = [];

  testCategories = [
    {
      name: 'Algebra',
      description: 'Tenglamalar, tengsizliklar va algebraik ifodalar',
      icon: 'pi pi-calculator',
      count: 8,
      difficulty: 'Barcha darajalar',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
      badgeColor: 'bg-blue-100 text-blue-800',
    },
    {
      name: 'Geometriya',
      description: 'Shakllar, burchaklar va geometrik hisoblashlar',
      icon: 'pi pi-compass',
      count: 6,
      difficulty: "Boshlang'ich - O'rta",
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
      badgeColor: 'bg-green-100 text-green-800',
    },
    {
      name: 'Matematik Analiz',
      description: 'Limitlar, hosilalar va integrallar',
      icon: 'pi pi-chart-line',
      count: 10,
      difficulty: "O'rta - Yuqori",
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600',
      badgeColor: 'bg-purple-100 text-purple-800',
    },
  ];

  tests: Test[] = [
    {
      id: 1,
      title: 'Chiziqli Tenglamalar',
      description: "Bir va ko'p noma'lumli chiziqli tenglamalar yechish bo'yicha test",
      category: 'algebra',
      difficulty: "Boshlang'ich",
      questions: 15,
      duration: 20,
      attempts: 3,
      bestScore: 85,
      icon: 'pi pi-calculator',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
    },
    {
      id: 2,
      title: 'Uchburchaklar va Burchaklar',
      description: "Uchburchaklarning xossalari, burchaklar va ularning o'lchamlari",
      category: 'geometriya',
      difficulty: "Boshlang'ich",
      questions: 12,
      duration: 15,
      attempts: 3,
      icon: 'pi pi-compass',
      color: 'bg-gradient-to-br from-green-500 to-green-600',
    },
    {
      id: 3,
      title: 'Kvadrat Tenglamalar',
      description: 'Kvadrat tenglamalar, diskriminant va ularning yechimlari',
      category: 'algebra',
      difficulty: "O'rta",
      questions: 18,
      duration: 25,
      attempts: 3,
      bestScore: 92,
      icon: 'pi pi-calculator',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
    },
    {
      id: 4,
      title: 'Aylanalar va Yoylar',
      description: 'Aylana, radius, diametr va yoy uzunliklari hisoblash',
      category: 'geometriya',
      difficulty: "O'rta",
      questions: 14,
      duration: 20,
      attempts: 3,
      icon: 'pi pi-compass',
      color: 'bg-gradient-to-br from-green-500 to-green-600',
    },
    {
      id: 5,
      title: 'Limitlar va Uzluksizlik',
      description: 'Funksiyalarning limiti va uzluksizlik tushunchalari',
      category: 'analiz',
      difficulty: 'Yuqori',
      questions: 20,
      duration: 30,
      attempts: 2,
      icon: 'pi pi-chart-line',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
    },
    {
      id: 6,
      title: "Hosilalar va Qo'llanilishi",
      description: "Hosilalar hisoblash va ularning amaliy qo'llanilishi",
      category: 'analiz',
      difficulty: 'Yuqori',
      questions: 22,
      duration: 35,
      attempts: 2,
      bestScore: 78,
      icon: 'pi pi-chart-line',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
    },
  ];

  // Sample questions for demo
  sampleQuestions: Question[] = [
    {
      id: 1,
      question: '2x + 5 = 13 tenglamaning yechimi qanday?',
      options: ['x = 4', 'x = 6', 'x = 8', 'x = 9'],
      correctAnswer: 0,
    },
    {
      id: 2,
      question: "Uchburchakning ichki burchaklari yig'indisi necha gradus?",
      options: ['90°', '180°', '270°', '360°'],
      correctAnswer: 1,
    },
  ];

  currentQuestion: Question | null = null;

  startTest(test: Test) {
    this.selectedTest = test;
    this.currentQuestionIndex = 0;
    this.selectedAnswer = null;
    this.timeRemaining = test.duration;
    this.answers = new Array(test.questions).fill(null);
    this.currentQuestion = this.sampleQuestions[0]; // Demo uchun
    this.showTestDialog = true;
  }

  selectAnswer(answerIndex: number) {
    this.selectedAnswer = answerIndex;
    this.answers[this.currentQuestionIndex] = answerIndex;
  }

  nextQuestion() {
    if (this.selectedTest) {
      if (this.currentQuestionIndex < this.selectedTest.questions - 1) {
        this.currentQuestionIndex++;
        this.selectedAnswer = this.answers[this.currentQuestionIndex];
        // Demo uchun
        this.currentQuestion =
          this.sampleQuestions[this.currentQuestionIndex % this.sampleQuestions.length];
      } else {
        this.finishTest();
      }
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.selectedAnswer = this.answers[this.currentQuestionIndex];
      // Demo uchun
      this.currentQuestion =
        this.sampleQuestions[this.currentQuestionIndex % this.sampleQuestions.length];
    }
  }

  finishTest() {
    // Test yakunlash logikasi
    this.showTestDialog = false;
    // Natijalarni ko'rsatish
  }
}
