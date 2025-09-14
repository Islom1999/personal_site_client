import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { TabViewModule } from 'primeng/tabview';

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
  completed?: boolean;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  category: string;
}

interface TestResult {
  testId: number;
  testTitle: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number;
  date: Date;
  answers: (number | null)[];
  questions: Question[];
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
    ChartModule,
    TabViewModule,
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
            <div class="text-2xl font-bold text-gray-900 mb-1">{{ completedTests }}</div>
            <div class="text-gray-600 text-sm">Yakunlangan testlar</div>
          </div>
          <div class="bg-white rounded-2xl p-6 text-center shadow-lg">
            <div
              class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4"
            >
              <i class="pi pi-star text-green-600 text-xl"></i>
            </div>
            <div class="text-2xl font-bold text-gray-900 mb-1">{{ averageScore }}%</div>
            <div class="text-gray-600 text-sm">O'rtacha natija</div>
          </div>
          <div class="bg-white rounded-2xl p-6 text-center shadow-lg">
            <div
              class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4"
            >
              <i class="pi pi-clock text-purple-600 text-xl"></i>
            </div>
            <div class="text-2xl font-bold text-gray-900 mb-1">{{ totalTimeSpent }}</div>
            <div class="text-gray-600 text-sm">Sarflangan daqiqalar</div>
          </div>
          <div class="bg-white rounded-2xl p-6 text-center shadow-lg">
            <div
              class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4"
            >
              <i class="pi pi-trophy text-orange-600 text-xl"></i>
            </div>
            <div class="text-2xl font-bold text-gray-900 mb-1">{{ highScores }}</div>
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
              (click)="filterByCategory(category.value)"
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
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-900">Mavjud Testlar</h2>
            <div class="flex space-x-2">
              <p-button 
                label="Barchasi" 
                [text]="true" 
                [class]="selectedCategory === 'all' ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'"
                (onClick)="filterByCategory('all')"
              > 
              </p-button>
              <p-button 
                label="Algebra" 
                [text]="true" 
                [class]="selectedCategory === 'algebra' ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'"
                (onClick)="filterByCategory('algebra')"
              >
              </p-button>
              <p-button 
                label="Geometriya" 
                [text]="true" 
                [class]="selectedCategory === 'geometry' ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'"
                (onClick)="filterByCategory('geometry')"
              >
              </p-button>
              <p-button 
                label="Analiz" 
                [text]="true" 
                [class]="selectedCategory === 'analysis' ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'"
                (onClick)="filterByCategory('analysis')"
              >
              </p-button>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              *ngFor="let test of filteredTests"
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

                <!-- Action Buttons -->
                <div class="flex space-x-2">
                  <p-button
                    [label]="test.bestScore ? 'Qayta urinish' : 'Testni boshlash'"
                    icon="pi pi-play"
                    class="flex-1 btn-primary"
                    (onClick)="startTest(test)"
                  >
                  </p-button>
                  <p-button
                    *ngIf="test.bestScore"
                    icon="pi pi-chart-bar"
                    [text]="true"
                    [rounded]="true"
                    class="text-blue-600 hover:bg-blue-50"
                    (onClick)="viewResults(test)"
                    pTooltip="Natijalarni ko'rish"
                  >
                  </p-button>
                </div>
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
                  {{ formatTime(timeRemaining) }}
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

              <div class="flex space-x-2">
                <p-button
                  label="Testni yakunlash"
                  icon="pi pi-check"
                  [outlined]="true"
                  severity="danger"
                  (onClick)="finishTest()"
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
                  (onClick)="nextQuestion()"
                  class="btn-primary"
                >
                </p-button>
              </div>
            </div>
          </div>
        </p-dialog>

        <!-- Test Results Dialog -->
        <p-dialog
          [(visible)]="showResultsDialog"
          [modal]="true"
          [closable]="true"
          [style]="{ width: '90vw', maxWidth: '1000px', height: '90vh' }"
          styleClass="results-dialog"
        >
          <ng-template pTemplate="header">
            <div class="flex items-center justify-between w-full">
              <h3 class="text-2xl font-bold text-gray-900">Test Natijalari</h3>
              <div class="flex items-center space-x-4">
                <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  {{ currentResult?.testTitle }}
                </span>
              </div>
            </div>
          </ng-template>

          <div class="h-full overflow-auto" *ngIf="currentResult">
            <p-tabView class="h-full">
              <!-- Results Overview -->
              <p-tabPanel header="Umumiy natija" leftIcon="pi pi-chart-pie">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <!-- Score Summary -->
                  <div class="space-y-6">
                    <!-- Main Score -->
                    <div class="text-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                      <div class="text-6xl font-bold text-blue-600 mb-2">{{ currentResult.score }}%</div>
                      <div class="text-xl text-gray-700 mb-4">Umumiy natija</div>
                      <div class="text-gray-600">
                        {{ currentResult.correctAnswers }} / {{ currentResult.totalQuestions }} to'g'ri javob
                      </div>
                    </div>

                    <!-- Performance Metrics -->
                    <div class="grid grid-cols-2 gap-4">
                      <div class="bg-white rounded-xl p-6 shadow-lg text-center">
                        <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <i class="pi pi-check text-green-600 text-xl"></i>
                        </div>
                        <div class="text-2xl font-bold text-gray-900 mb-1">{{ currentResult.correctAnswers }}</div>
                        <div class="text-gray-600 text-sm">To'g'ri javoblar</div>
                      </div>
                      <div class="bg-white rounded-xl p-6 shadow-lg text-center">
                        <div class="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <i class="pi pi-times text-red-600 text-xl"></i>
                        </div>
                        <div class="text-2xl font-bold text-gray-900 mb-1">{{ currentResult.totalQuestions - currentResult.correctAnswers }}</div>
                        <div class="text-gray-600 text-sm">Noto'g'ri javoblar</div>
                      </div>
                      <div class="bg-white rounded-xl p-6 shadow-lg text-center">
                        <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <i class="pi pi-clock text-blue-600 text-xl"></i>
                        </div>
                        <div class="text-2xl font-bold text-gray-900 mb-1">{{ currentResult.timeSpent }}</div>
                        <div class="text-gray-600 text-sm">Daqiqa</div>
                      </div>
                      <div class="bg-white rounded-xl p-6 shadow-lg text-center">
                        <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <i class="pi pi-calendar text-purple-600 text-xl"></i>
                        </div>
                        <div class="text-2xl font-bold text-gray-900 mb-1">{{ formatDate(currentResult.date) }}</div>
                        <div class="text-gray-600 text-sm">Test sanasi</div>
                      </div>
                    </div>

                    <!-- Performance Level -->
                    <div class="bg-white rounded-xl p-6 shadow-lg">
                      <h4 class="text-lg font-semibold text-gray-900 mb-4">Baholash</h4>
                      <div class="space-y-3">
                        <div class="flex items-center justify-between">
                          <span class="text-gray-600">Daraja:</span>
                          <span [class]="getPerformanceClass(currentResult.score)" class="font-semibold">
                            {{ getPerformanceLevel(currentResult.score) }}
                          </span>
                        </div>
                        <div class="flex items-center justify-between">
                          <span class="text-gray-600">Baho:</span>
                          <span [class]="getGradeClass(currentResult.score)" class="font-semibold text-lg">
                            {{ getGrade(currentResult.score) }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Chart -->
                  <div class="space-y-6">
                    <!-- Score Chart -->
                    <div class="bg-white rounded-xl p-6 shadow-lg">
                      <h4 class="text-lg font-semibold text-gray-900 mb-4">Natijalar taqsimoti</h4>
                      <p-chart type="doughnut" [data]="chartData" [options]="chartOptions" class="w-full h-64">
                      </p-chart>
                    </div>

                    <!-- Category Performance -->
                    <div class="bg-white rounded-xl p-6 shadow-lg">
                      <h4 class="text-lg font-semibold text-gray-900 mb-4">Mavzular bo'yicha natija</h4>
                      <div class="space-y-3">
                        <div *ngFor="let category of categoryPerformance" class="flex items-center justify-between">
                          <span class="text-gray-600">{{ category.name }}:</span>
                          <div class="flex items-center space-x-2">
                            <p-progressBar [value]="category.score" class="w-20 h-2"></p-progressBar>
                            <span class="font-semibold text-sm w-12">{{ category.score }}%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Recommendations -->
                    <div class="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6">
                      <h4 class="text-lg font-semibold text-gray-900 mb-4">
                        <i class="pi pi-lightbulb text-yellow-600 mr-2"></i>
                        Tavsiyalar
                      </h4>
                      <ul class="space-y-2 text-gray-700">
                        <li *ngFor="let recommendation of getRecommendations(currentResult.score)" class="flex items-start">
                          <i class="pi pi-arrow-right text-yellow-600 mr-2 mt-1"></i>
                          {{ recommendation }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </p-tabPanel>

              <!-- Detailed Review -->
              <p-tabPanel header="Batafsil ko'rib chiqish" leftIcon="pi pi-list">
                <div class="max-w-4xl mx-auto">
                  <div class="space-y-6">
                    <div 
                      *ngFor="let question of currentResult.questions; let i = index" 
                      class="bg-white rounded-xl p-6 shadow-lg border-l-4"
                      [class.border-green-500]="currentResult.answers[i] === question.correctAnswer"
                      [class.border-red-500]="currentResult.answers[i] !== question.correctAnswer && currentResult.answers[i] !== null"
                      [class.border-gray-300]="currentResult.answers[i] === null"
                    >
                      <!-- Question Header -->
                      <div class="flex items-center justify-between mb-4">
                        <h4 class="text-lg font-semibold text-gray-900">Savol {{ i + 1 }}</h4>
                        <div class="flex items-center space-x-2">
                          <span 
                            *ngIf="currentResult.answers[i] === question.correctAnswer"
                            class="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full"
                          >
                            <i class="pi pi-check mr-1"></i>To'g'ri
                          </span>
                          <span 
                            *ngIf="currentResult.answers[i] !== question.correctAnswer && currentResult.answers[i] !== null"
                            class="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full"
                          >
                            <i class="pi pi-times mr-1"></i>Noto'g'ri
                          </span>
                          <span 
                            *ngIf="currentResult.answers[i] === null"
                            class="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full"
                          >
                            <i class="pi pi-minus mr-1"></i>Javobsiz
                          </span>
                        </div>
                      </div>

                      <!-- Question Text -->
                      <p class="text-gray-800 mb-4 font-medium">{{ question.question }}</p>

                      <!-- Options -->
                      <div class="space-y-2 mb-4">
                        <div 
                          *ngFor="let option of question.options; let j = index"
                          class="flex items-center p-3 rounded-lg border"
                          [class.bg-green-50]="j === question.correctAnswer"
                          [class.border-green-300]="j === question.correctAnswer"
                          [class.bg-red-50]="j === currentResult.answers[i] && j !== question.correctAnswer"
                          [class.border-red-300]="j === currentResult.answers[i] && j !== question.correctAnswer"
                          [class.bg-gray-50]="j !== question.correctAnswer && j !== currentResult.answers[i]"
                          [class.border-gray-200]="j !== question.correctAnswer && j !== currentResult.answers[i]"
                        >
                          <div class="flex items-center space-x-3">
                            <div 
                              class="w-6 h-6 rounded-full border-2 flex items-center justify-center"
                              [class.bg-green-500]="j === question.correctAnswer"
                              [class.border-green-500]="j === question.correctAnswer"
                              [class.bg-red-500]="j === currentResult.answers[i] && j !== question.correctAnswer"
                              [class.border-red-500]="j === currentResult.answers[i] && j !== question.correctAnswer"
                              [class.border-gray-300]="j !== question.correctAnswer && j !== currentResult.answers[i]"
                            >
                              <i 
                                *ngIf="j === question.correctAnswer" 
                                class="pi pi-check text-white text-xs"
                              ></i>
                              <i 
                                *ngIf="j === currentResult.answers[i] && j !== question.correctAnswer" 
                                class="pi pi-times text-white text-xs"
                              ></i>
                            </div>
                            <span 
                              class="flex-1"
                              [class.text-green-800]="j === question.correctAnswer"
                              [class.font-semibold]="j === question.correctAnswer"
                              [class.text-red-800]="j === currentResult.answers[i] && j !== question.correctAnswer"
                            >
                              {{ option }}
                            </span>
                          </div>
                        </div>
                      </div>

                      <!-- Explanation -->
                      <div *ngIf="question.explanation" class="bg-blue-50 rounded-lg p-4">
                        <h5 class="font-semibold text-blue-900 mb-2">
                          <i class="pi pi-info-circle mr-2"></i>Tushuntirish:
                        </h5>
                        <p class="text-blue-800">{{ question.explanation }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </p-tabPanel>

              <!-- Performance History -->
              <p-tabPanel header="Natijalar tarixi" leftIcon="pi pi-history">
                <div class="max-w-4xl mx-auto">
                  <div class="bg-white rounded-xl p-6 shadow-lg mb-6">
                    <h4 class="text-lg font-semibold text-gray-900 mb-4">Test natijalari dinamikasi</h4>
                    <p-chart type="line" [data]="historyChartData" [options]="historyChartOptions" class="w-full h-64">
                    </p-chart>
                  </div>

                  <div class="space-y-4">
                    <h4 class="text-lg font-semibold text-gray-900">Barcha urinishlar</h4>
                    <div 
                      *ngFor="let result of testHistory" 
                      class="bg-white rounded-xl p-6 shadow-lg flex items-center justify-between"
                    >
                      <div class="flex items-center space-x-4">
                        <div 
                          class="w-12 h-12 rounded-xl flex items-center justify-center"
                          [class.bg-green-100]="result.score >= 80"
                          [class.bg-yellow-100]="result.score >= 60 && result.score < 80"
                          [class.bg-red-100]="result.score < 60"
                        >
                          <span 
                            class="font-bold"
                            [class.text-green-600]="result.score >= 80"
                            [class.text-yellow-600]="result.score >= 60 && result.score < 80"
                            [class.text-red-600]="result.score < 60"
                          >
                            {{ result.score }}%
                          </span>
                        </div>
                        <div>
                          <h5 class="font-semibold text-gray-900">{{ result.testTitle }}</h5>
                          <p class="text-gray-600 text-sm">
                            {{ result.correctAnswers }}/{{ result.totalQuestions }} to'g'ri • 
                            {{ result.timeSpent }} daqiqa • 
                            {{ formatDate(result.date) }}
                          </p>
                        </div>
                      </div>
                      <div class="flex items-center space-x-2">
                        <p-button
                          icon="pi pi-eye"
                          [text]="true"
                          [rounded]="true"
                          class="text-blue-600 hover:bg-blue-50"
                          (onClick)="viewDetailedResult(result)"
                          pTooltip="Batafsil ko'rish"
                        >
                        </p-button>
                      </div>
                    </div>
                  </div>
                </div>
              </p-tabPanel>
            </p-tabView>
          </div>
        </p-dialog>
      </div>
    </div>
  `,
})
export class TestsComponent implements OnInit {
  showTestDialog = false;
  showResultsDialog = false;
  selectedTest: Test | null = null;
  selectedCategory = 'all';
  currentQuestionIndex = 0;
  selectedAnswer: number | null = null;
  timeRemaining = 0;
  answers: (number | null)[] = [];
  currentQuestion: Question | null = null;
  currentResult: TestResult | null = null;
  timer: any;

  // Statistics
  completedTests = 24;
  averageScore = 87;
  totalTimeSpent = 156;
  highScores = 12;

  // Chart data
  chartData: any;
  chartOptions: any;
  historyChartData: any;
  historyChartOptions: any;
  categoryPerformance = [
    { name: 'Algebra', score: 85 },
    { name: 'Geometriya', score: 92 },
    { name: 'Analiz', score: 78 },
    { name: 'Ehtimollar', score: 88 }
  ];

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
      value: 'algebra'
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
      value: 'geometry'
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
      value: 'analysis'
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
      completed: true
    },
    {
      id: 2,
      title: 'Uchburchaklar va Burchaklar',
      description: "Uchburchaklarning xossalari, burchaklar va ularning o'lchamlari",
      category: 'geometry',
      difficulty: "Boshlang'ich",
      questions: 12,
      duration: 15,
      attempts: 3,
      bestScore: 92,
      icon: 'pi pi-compass',
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      completed: true
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
      bestScore: 78,
      icon: 'pi pi-calculator',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      completed: true
    },
    {
      id: 4,
      title: 'Aylanalar va Yoylar',
      description: 'Aylana, radius, diametr va yoy uzunliklari hisoblash',
      category: 'geometry',
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
      category: 'analysis',
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
      category: 'analysis',
      difficulty: 'Yuqori',
      questions: 22,
      duration: 35,
      attempts: 2,
      bestScore: 88,
      icon: 'pi pi-chart-line',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      completed: true
    },
  ];

  filteredTests: Test[] = [];

  // Sample questions for demo
  sampleQuestions: Question[] = [
    {
      id: 1,
      question: '2x + 5 = 13 tenglamaning yechimi qanday?',
      options: ['x = 4', 'x = 6', 'x = 8', 'x = 9'],
      correctAnswer: 0,
      explanation: '2x + 5 = 13 tenglamani yechish uchun: 2x = 13 - 5 = 8, demak x = 4',
      category: 'algebra'
    },
    {
      id: 2,
      question: "Uchburchakning ichki burchaklari yig'indisi necha gradus?",
      options: ['90°', '180°', '270°', '360°'],
      correctAnswer: 1,
      explanation: 'Har qanday uchburchakning ichki burchaklari yig\'indisi har doim 180° ga teng.',
      category: 'geometry'
    },
    {
      id: 3,
      question: 'f(x) = x² funksiyaning x = 2 nuqtadagi hosilasi qanday?',
      options: ['2', '4', '8', '16'],
      correctAnswer: 1,
      explanation: 'f\'(x) = 2x, demak f\'(2) = 2 × 2 = 4',
      category: 'analysis'
    }
  ];

  testHistory: TestResult[] = [
    {
      testId: 1,
      testTitle: 'Chiziqli Tenglamalar',
      score: 85,
      correctAnswers: 13,
      totalQuestions: 15,
      timeSpent: 18,
      date: new Date('2024-01-15'),
      answers: [0, 1, 0, 2, 1, 0, 3, 1, 2, 0, 1, 2, 0, null, 1],
      questions: this.sampleQuestions
    },
    {
      testId: 2,
      testTitle: 'Uchburchaklar va Burchaklar',
      score: 92,
      correctAnswers: 11,
      totalQuestions: 12,
      timeSpent: 14,
      date: new Date('2024-01-10'),
      answers: [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      questions: this.sampleQuestions
    }
  ];

  ngOnInit() {
    this.filteredTests = [...this.tests];
    this.initializeCharts();
  }

  initializeCharts() {
    // Doughnut chart for results
    this.chartData = {
      labels: ['To\'g\'ri javoblar', 'Noto\'g\'ri javoblar'],
      datasets: [
        {
          data: [85, 15],
          backgroundColor: ['#10B981', '#EF4444'],
          borderWidth: 0
        }
      ]
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

    // Line chart for history
    this.historyChartData = {
      labels: ['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5'],
      datasets: [
        {
          label: 'Natijalar (%)',
          data: [75, 82, 85, 88, 92],
          borderColor: '#3B82F6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true
        }
      ]
    };

    this.historyChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      }
    };
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    if (category === 'all') {
      this.filteredTests = [...this.tests];
    } else {
      this.filteredTests = this.tests.filter(test => test.category === category);
    }
  }

  startTest(test: Test) {
    this.selectedTest = test;
    this.currentQuestionIndex = 0;
    this.selectedAnswer = null;
    this.timeRemaining = test.duration * 60; // Convert to seconds
    this.answers = new Array(test.questions).fill(null);
    this.currentQuestion = this.sampleQuestions[0]; // Demo
    this.showTestDialog = true;
    this.startTimer();
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.timeRemaining--;
      if (this.timeRemaining <= 0) {
        this.finishTest();
      }
    }, 1000);
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
        this.currentQuestion = this.sampleQuestions[this.currentQuestionIndex % this.sampleQuestions.length];
      } else {
        this.finishTest();
      }
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.selectedAnswer = this.answers[this.currentQuestionIndex];
      this.currentQuestion = this.sampleQuestions[this.currentQuestionIndex % this.sampleQuestions.length];
    }
  }

  finishTest() {
    if (this.timer) {
      clearInterval(this.timer);
    }

    if (this.selectedTest) {
      // Calculate results
      const correctAnswers = this.answers.filter((answer, index) => 
        answer === this.sampleQuestions[index % this.sampleQuestions.length].correctAnswer
      ).length;
      
      const score = Math.round((correctAnswers / this.selectedTest.questions) * 100);
      const timeSpent = this.selectedTest.duration - Math.floor(this.timeRemaining / 60);

      // Create result object
      const result: TestResult = {
        testId: this.selectedTest.id,
        testTitle: this.selectedTest.title,
        score: score,
        correctAnswers: correctAnswers,
        totalQuestions: this.selectedTest.questions,
        timeSpent: timeSpent,
        date: new Date(),
        answers: [...this.answers],
        questions: this.sampleQuestions.slice(0, this.selectedTest.questions)
      };

      // Update test best score
      if (!this.selectedTest.bestScore || score > this.selectedTest.bestScore) {
        this.selectedTest.bestScore = score;
      }
      this.selectedTest.completed = true;

      // Add to history
      this.testHistory.unshift(result);

      this.showTestDialog = false;
      this.currentResult = result;
      this.updateResultCharts(result);
      this.showResultsDialog = true;
    }
  }

  updateResultCharts(result: TestResult) {
    const correctPercentage = (result.correctAnswers / result.totalQuestions) * 100;
    const incorrectPercentage = 100 - correctPercentage;

    this.chartData = {
      labels: ['To\'g\'ri javoblar', 'Noto\'g\'ri javoblar'],
      datasets: [
        {
          data: [correctPercentage, incorrectPercentage],
          backgroundColor: ['#10B981', '#EF4444'],
          borderWidth: 0
        }
      ]
    };
  }

  viewResults(test: Test) {
    const result = this.testHistory.find(r => r.testId === test.id);
    if (result) {
      this.currentResult = result;
      this.updateResultCharts(result);
      this.showResultsDialog = true;
    }
  }

  viewDetailedResult(result: TestResult) {
    this.currentResult = result;
    this.updateResultCharts(result);
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('uz-UZ');
  }

  getPerformanceLevel(score: number): string {
    if (score >= 90) return 'A\'lo';
    if (score >= 80) return 'Yaxshi';
    if (score >= 70) return 'Qoniqarli';
    if (score >= 60) return 'O\'rta';
    return 'Qoniqarsiz';
  }

  getPerformanceClass(score: number): string {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  }

  getGrade(score: number): string {
    if (score >= 90) return '5';
    if (score >= 80) return '4';
    if (score >= 70) return '3';
    if (score >= 60) return '2';
    return '1';
  }

  getGradeClass(score: number): string {
    if (score >= 80) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  }

  getRecommendations(score: number): string[] {
    if (score >= 90) {
      return [
        'Ajoyib natija! Bilimlaringizni yanada chuqurlashtiring',
        'Murakkab mavzularni o\'rganishni davom ettiring',
        'Boshqa talabalar bilan bilimlaringizni bo\'lishing'
      ];
    } else if (score >= 80) {
      return [
        'Yaxshi natija! Ba\'zi mavzularni takrorlang',
        'Amaliy mashqlarni ko\'proq bajaring',
        'Noto\'g\'ri javob bergan savollarni qayta ko\'rib chiqing'
      ];
    } else if (score >= 70) {
      return [
        'Asosiy tushunchalarni mustahkamlang',
        'Qo\'shimcha darslik materiallarini o\'rganing',
        'O\'qituvchi bilan maslahatlashing'
      ];
    } else {
      return [
        'Asosiy mavzularni qaytadan o\'rganing',
        'Darslik materiallarini diqqat bilan o\'qing',
        'Qo\'shimcha mashqlar bajaring',
        'O\'qituvchidan yordam so\'rang'
      ];
    }
  }
}