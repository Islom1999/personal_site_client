import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
    DatePickerModule,
  ],
  templateUrl: './profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
      certificate: false,
    },
    {
      id: 2,
      title: 'Chiziqli Algebra Asoslari',
      progress: 100,
      totalLessons: 24,
      completedLessons: 24,
      lastAccessed: new Date('2024-01-18'),
      certificate: true,
    },
    {
      id: 3,
      title: 'Planimetriya va Stereometriya',
      progress: 45,
      totalLessons: 32,
      completedLessons: 14,
      lastAccessed: new Date('2024-01-15'),
      certificate: false,
    },
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
      attempts: 2,
    },
    {
      id: 2,
      testName: 'Uchburchaklar va Burchaklar',
      score: 11,
      maxScore: 12,
      percentage: 92,
      date: new Date('2024-01-17'),
      category: 'Geometriya',
      attempts: 1,
    },
    {
      id: 3,
      testName: 'Kvadrat Tenglamalar',
      score: 14,
      maxScore: 18,
      percentage: 78,
      date: new Date('2024-01-15'),
      category: 'Algebra',
      attempts: 3,
    },
    {
      id: 4,
      testName: 'Limitlar va Uzluksizlik',
      score: 18,
      maxScore: 20,
      percentage: 90,
      date: new Date('2024-01-12'),
      category: 'Analiz',
      attempts: 1,
    },
  ];

  certificates = [
    {
      id: 1,
      courseName: 'Chiziqli Algebra Asoslari',
      issueDate: new Date('2024-01-18'),
      certificateUrl: '#',
    },
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
      datasets: [
        {
          data: [this.completedCourses, this.userCourses.length - this.completedCourses, 2],
          backgroundColor: ['#10B981', '#3B82F6', '#E5E7EB'],
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

    // Activity chart
    this.activityChartData = {
      labels: ['Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan', 'Yak'],
      datasets: [
        {
          label: 'Daqiqalar',
          data: [45, 60, 30, 75, 90, 120, 80],
          backgroundColor: '#3B82F6',
        },
      ],
    };

    this.activityChartOptions = {
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
        },
      },
    };

    // Category performance radar chart
    this.categoryChartData = {
      labels: ['Algebra', 'Geometriya', 'Analiz', 'Ehtimollar', 'Diskret'],
      datasets: [
        {
          label: 'Natijalar (%)',
          data: [85, 92, 78, 88, 75],
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          borderColor: '#3B82F6',
          pointBackgroundColor: '#3B82F6',
        },
      ],
    };

    this.radarChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
        },
      },
    };
  }

  get completedCourses(): number {
    return this.userCourses.filter((course) => course.progress === 100).length;
  }

  get averageScore(): number {
    if (this.testResults.length === 0) return 0;
    const total = this.testResults.reduce((sum, test) => sum + test.percentage, 0);
    return Math.round(total / this.testResults.length);
  }

  get highestScore(): number {
    if (this.testResults.length === 0) return 0;
    return Math.max(...this.testResults.map((test) => test.percentage));
  }

  get successRate(): number {
    if (this.testResults.length === 0) return 0;
    const passed = this.testResults.filter((test) => test.percentage >= 70).length;
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
