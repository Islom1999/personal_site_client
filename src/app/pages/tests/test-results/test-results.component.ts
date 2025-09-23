import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, EventEmitter, Input, Output, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { DialogModule } from 'primeng/dialog';
import { ProgressBarModule } from 'primeng/progressbar';
import { TabsModule } from 'primeng/tabs';
import { TooltipModule } from 'primeng/tooltip';

export interface TestQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  category?: string;
}

export interface TestResult {
  id: string;
  testTitle: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number;
  date: Date;
  questions: TestQuestion[];
  answers: (number | null)[];
}

export interface Category {
  id: string;
  name: string;
  score: number;
}

@Component({
  selector: 'app-test-results',
  imports: [
    CommonModule,
    DialogModule,
    TabsModule,
    ChartModule,
    ButtonModule,
    ProgressBarModule,
    TooltipModule,
  ],
  templateUrl: './test-results.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestResultsComponent {
  @Input() visible = false;
  @Input() currentResult: TestResult | null = null;
  @Input() testHistory: TestResult[] = [];

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() viewResult = new EventEmitter<TestResult>();

  // Computed signals for reactive data
  categories = signal<Category[]>([
    { id: '1', name: 'Matematik', score: 85 },
    { id: '2', name: 'Ingliz tili', score: 92 },
    { id: '3', name: 'Tarix', score: 78 },
    { id: '4', name: 'Geografiya', score: 88 },
  ]);

  chartData = computed(() => {
    if (!this.currentResult) return {};

    const correct = this.currentResult.correctAnswers;
    const incorrect = this.currentResult.totalQuestions - correct;

    return {
      labels: ["To'g'ri javoblar", "Noto'g'ri javoblar"],
      datasets: [
        {
          data: [correct, incorrect],
          backgroundColor: ['#10B981', '#EF4444'],
          borderWidth: 0,
        },
      ],
    };
  });

  chartOptions = computed(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
        },
      },
    },
  }));

  historyChartData = computed(() => {
    const data = this.testHistory.map((result) => result.score);
    const labels = this.testHistory.map((result) => this.formatDate(result.date));

    return {
      labels,
      datasets: [
        {
          label: 'Test natijalari (%)',
          data,
          fill: false,
          borderColor: '#3B82F6',
          backgroundColor: '#3B82F6',
          tension: 0.4,
        },
      ],
    };
  });

  historyChartOptions = computed(() => ({
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
        ticks: {
          callback: (value: number) => value + '%',
        },
      },
    },
  }));

  onDialogHide(): void {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('uz-UZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  }

  getPerformanceLevel(score: number): string {
    if (score >= 90) return "A'lo";
    if (score >= 80) return 'Yaxshi';
    if (score >= 70) return 'Qoniqarli';
    if (score >= 60) return "O'rtacha";
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
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  }

  getRecommendations(score: number): string[] {
    if (score >= 90) {
      return [
        'Ajoyib natija! Bilimlaringizni saqlab qoling',
        "Boshqa mavzularga ham shu kabi e'tibor bering",
        "Qiyinroq testlarni sinab ko'ring",
      ];
    }
    if (score >= 80) {
      return [
        "Yaxshi natija! Bir oz ko'proq mashq qiling",
        "Noto'g'ri javob bergan savollarni qayta ko'rib chiqing",
        'Doimiy takrorlash bilan bilimingizni mustahkamlang',
      ];
    }
    if (score >= 60) {
      return [
        "Asosiy bilimlar mavjud, ammo ko'proq ishlash kerak",
        'Har kuni 30 daqiqa mashq qiling',
        "Qiyin mavzularni chuqurroq o'rganing",
      ];
    }
    return [
      "Bilimlarni qaytadan o'rganish tavsiya etiladi",
      'Asosiy konsepsiyalarni tushunishdan boshlang',
      'Doimiy mashq va takrorlash zarur',
      "Qo'shimcha manbalardan foydalaning",
    ];
  }

  viewDetailedResult(result: TestResult): void {
    this.viewResult.emit(result);
  }
}
