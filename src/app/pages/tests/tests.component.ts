import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { TabsModule } from 'primeng/tabs';
import { SpTestsService } from '../../../shared/services/sp-tests.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { SpCategoryService } from '../../../shared/services/sp-category.service';
import { SpLevelService } from '../../../shared/services/sp-level.service';
import { ISpTests } from '../../../shared/models/sp-tests.model';
import { SelectItemLabelPipe } from '../../../shared/pipes/select-item-label.pipe';

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
    TabsModule,
    SelectItemLabelPipe,
  ],
  templateUrl: './tests.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestsComponent implements OnInit {
  _cdr = inject(ChangeDetectorRef);

  _spCategoryService = inject(SpCategoryService);
  _spLevelService = inject(SpLevelService);
  _spTestsService = inject(SpTestsService);

  categories = toSignal(this._spCategoryService.getAll(), { initialValue: [] });
  levels = toSignal(this._spLevelService.getAll(), { initialValue: [] });
  tests = toSignal(this._spTestsService.getAll(), { initialValue: [] });

  showTestDialog = false;
  showResultsDialog = false;
  selectedTest: Test | null = null;
  selectedCategory = 'all';
  selectedLevel = 'all';
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

  testCategoriesStyle = [
    {
      difficulty: 'Barcha darajalar',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
      badgeColor: 'bg-blue-100 text-blue-800',
    },
    {
      difficulty: 'Barcha darajalar',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
      badgeColor: 'bg-green-100 text-green-800',
    },
    {
      difficulty: 'Barcha darajalar',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600',
      badgeColor: 'bg-purple-100 text-purple-800',
    },
  ];
  getTestCategoryStyle(index: number) {
    const indexNumber = index % this.testCategoriesStyle.length;
    return this.testCategoriesStyle[indexNumber];
  }

  filteredTests: ISpTests[] = [];

  // Sample questions for demo
  sampleQuestions: Question[] = [
    {
      id: 1,
      question: '2x + 5 = 13 tenglamaning yechimi qanday?',
      options: ['x = 4', 'x = 6', 'x = 8', 'x = 9'],
      correctAnswer: 0,
      explanation: '2x + 5 = 13 tenglamani yechish uchun: 2x = 13 - 5 = 8, demak x = 4',
      category: 'algebra',
    },
    {
      id: 2,
      question: "Uchburchakning ichki burchaklari yig'indisi necha gradus?",
      options: ['90°', '180°', '270°', '360°'],
      correctAnswer: 1,
      explanation: "Har qanday uchburchakning ichki burchaklari yig'indisi har doim 180° ga teng.",
      category: 'geometry',
    },
    {
      id: 3,
      question: 'f(x) = x² funksiyaning x = 2 nuqtadagi hosilasi qanday?',
      options: ['2', '4', '8', '16'],
      correctAnswer: 1,
      explanation: "f'(x) = 2x, demak f'(2) = 2 × 2 = 4",
      category: 'analysis',
    },
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
      questions: this.sampleQuestions,
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
      questions: this.sampleQuestions,
    },
  ];

  ngOnInit() {
    this.filteredTests = [...this.tests()];
    this.initializeCharts();
  }

  initializeCharts() {
    // Doughnut chart for results
    this.chartData = {
      labels: ["To'g'ri javoblar", "Noto'g'ri javoblar"],
      datasets: [
        {
          data: [85, 15],
          backgroundColor: ['#10B981', '#EF4444'],
          borderWidth: 0,
        },
      ],
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
        },
      },
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
          fill: true,
        },
      ],
    };

    this.historyChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
        },
      },
    };
  }

  filterByCategory(category_id: string) {
    this.selectedCategory = category_id;
    if (category_id === 'all') {
      this.filteredTests = [...this.tests()];
    } else {
      this.filteredTests = this.tests().filter((test) => test.sp_category_id === category_id);
    }
  }

  filterByLevel(level_id: string) {
    this.selectedLevel = level_id;
    if (level_id === 'all') {
      this.filteredTests = [...this.tests()];
    } else {
      this.filteredTests = this.tests().filter((test) => test.sp_level_id === level_id);
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
      this.currentQuestion =
        this.sampleQuestions[this.currentQuestionIndex % this.sampleQuestions.length];
    }
  }

  finishTest() {
    if (this.timer) {
      clearInterval(this.timer);
    }

    if (this.selectedTest) {
      // Calculate results
      const correctAnswers = this.answers.filter(
        (answer, index) =>
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
        questions: this.sampleQuestions.slice(0, this.selectedTest.questions),
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
      labels: ["To'g'ri javoblar", "Noto'g'ri javoblar"],
      datasets: [
        {
          data: [correctPercentage, incorrectPercentage],
          backgroundColor: ['#10B981', '#EF4444'],
          borderWidth: 0,
        },
      ],
    };
  }

  viewResults(test: Test) {
    const result = this.testHistory.find((r) => r.testId === test.id);
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
    if (score >= 90) return "A'lo";
    if (score >= 80) return 'Yaxshi';
    if (score >= 70) return 'Qoniqarli';
    if (score >= 60) return "O'rta";
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
        "Murakkab mavzularni o'rganishni davom ettiring",
        "Boshqa talabalar bilan bilimlaringizni bo'lishing",
      ];
    } else if (score >= 80) {
      return [
        "Yaxshi natija! Ba'zi mavzularni takrorlang",
        "Amaliy mashqlarni ko'proq bajaring",
        "Noto'g'ri javob bergan savollarni qayta ko'rib chiqing",
      ];
    } else if (score >= 70) {
      return [
        'Asosiy tushunchalarni mustahkamlang',
        "Qo'shimcha darslik materiallarini o'rganing",
        "O'qituvchi bilan maslahatlashing",
      ];
    } else {
      return [
        "Asosiy mavzularni qaytadan o'rganing",
        "Darslik materiallarini diqqat bilan o'qing",
        "Qo'shimcha mashqlar bajaring",
        "O'qituvchidan yordam so'rang",
      ];
    }
  }
}
