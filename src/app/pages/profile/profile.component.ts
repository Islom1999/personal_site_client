import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { TabsModule } from 'primeng/tabs';
import { ProgressBarModule } from 'primeng/progressbar';
import { TagModule } from 'primeng/tag';
import { ChartModule } from 'primeng/chart';
import { DatePickerModule } from 'primeng/datepicker';
import { AuthService } from '../auth/auth.service';
import { Message } from 'primeng/message';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from './profile.service';
import { forkJoin, map } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

interface UserCourse {
  id: number;
  title: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  lastAccessed: Date;
  certificate?: boolean;
}
interface UserTestResult {
  id: string;
  client_user_id: string;
  sp_tests_id: string;
  score: number;
  total_questions: number;
  correct_answers: number;
  time_spent: number;
  created_at: string;
}
interface TestFull {
  id: string;
  name: string;
  description: string;
  duration: number;
  icon: string;
  sp_level_id: string;
  created_at: string;
  sp_tests_quessions?: any[];
}

export interface TestResultUI {
  result: UserTestResult;
  test: TestFull;
  percentage: number;
}

interface IUser {
  id: string;
  fullname: string;
  file_image_id?: string;
  is_success: boolean;
  phone: string;
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
    Message,
    TranslateModule,
  ],
  templateUrl: './profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  user: IUser | null = null;
  editForm: any = {
    fullname: this.user?.fullname,
  };
  errorMessage = '';
  successMessage = '';
  loading = false;
  disabled = true;
  selectedFile: File | null = null;
  uploadingImage = false;
  imageUploadError = '';

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
  ];

  testResults: TestResultUI[] = [];

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

  profileService: ProfileService;

  constructor(
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private http: HttpClient
  ) {
    this.profileService = new ProfileService(this.http);
  }

  ngOnInit() {
    this.loadUserData();
    this.initializeCharts();
    this.getMyTestResults();
  }

  loadUserData() {
    this.authService.loadProfile().subscribe({
      next: (user) => {
        if (!user) {
          this.router.navigate(['/login']);
          return;
        }
        this.editForm = { ...user };
        this.user = user;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
        this.router.navigate(['/login']);
      },
    });
  }

  initializeCharts() {
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

    // // Category performance radar chart
    // this.categoryChartData = {
    //   labels: ['Algebra', 'Geometriya', 'Analiz', 'Ehtimollar', 'Diskret'],
    //   datasets: [
    //     {
    //       label: 'Natijalar (%)',
    //       data: [85, 92, 78, 88, 75],
    //       backgroundColor: 'rgba(59, 130, 246, 0.2)',
    //       borderColor: '#3B82F6',
    //       pointBackgroundColor: '#3B82F6',
    //     },
    //   ],
    // };

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

  // test statistics helpers
  formatTime(seconds: number): string {
    if (!seconds && seconds !== 0) return '';
    if (seconds < 60) {
      return `${seconds} soniya`;
    } else {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} daqiqa`;
    }
  }

  get totalTests(): number {
    return this.testResultsFull.length;
  }

  get averageScore(): number {
    if (this.testResultsFull.length === 0) return 0;
    const totalPercentage = this.testResultsFull.reduce((sum, item) => {
      const correct = item.result.correct_answers || 0;
      const total = item.result.total_questions || 1;
      const percentage = (correct / total) * 100;
      return sum + percentage;
    }, 0);
    return Math.round(totalPercentage / this.testResultsFull.length);
  }

  get highestScore(): number {
    if (this.testResultsFull.length === 0) return 0;
    return Math.max(
      ...this.testResultsFull.map((item) => {
        const correct = item.result.correct_answers || 0;
        const total = item.result.total_questions || 1;
        return Math.round((correct / total) * 100);
      })
    );
  }

  get successRate(): number {
    if (this.testResultsFull.length === 0) return 0;
    const passed = this.testResultsFull.filter((item) => {
      const correct = item.result.correct_answers || 0;
      const total = item.result.total_questions || 1;
      const percentage = (correct / total) * 100;
      return percentage >= 70;
    }).length;
    return Math.round((passed / this.testResultsFull.length) * 100);
  }

  formatDate(date: string | Date): string {
    if (!date) return '';
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('uz-UZ');
  }

  getScoreColor(percentage: number): string {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 60) return 'text-yellow-600';
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

  get isEditDisabled(): boolean {
    if (!this.user || !this.editForm.fullname) return true;
    return this.editForm.fullname.trim() === this.user.fullname.trim();
  }

  continueCourse(course: UserCourse) {
    this.router.navigate(['/courses']);
  }

  editProfile() {
    const trimmedName = this.editForm.fullname?.trim() || '';

    if (!trimmedName) {
      this.errorMessage = 'Ismingizni kiriting!';
      this.loading = false;
      this.cdr.markForCheck();
      return;
    }

    if (this.user?.fullname === trimmedName) {
      this.disabled = true;
      setTimeout(() => {
        this.errorMessage = '';
      }, 1500);
      this.loading = false;
      this.cdr.markForCheck();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.cdr.markForCheck();

    this.authService.updateProfile(trimmedName).subscribe({
      next: (res) => {
        this.disabled = false;
        this.user = { ...this.user, fullname: trimmedName } as IUser;
        this.successMessage = "Profile muvaffaqiyatli o'zgardi";
        setTimeout(() => {
          this.successMessage = '';
          this.cdr.markForCheck();
        }, 1500);
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error?.message || 'Xato yuz berdi';
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }

  cancelEdit() {
    this.editForm = { ...this.user };
  }

  uploadImgProfile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const formData = new FormData();
    formData.append('file', file);

    this.authService.uploadImg(formData).subscribe({
      next: (res) => {
        const file_image_id = res.id;
        if (!file_image_id) {
          this.imageUploadError = 'Fayl yuklanmadi';
          this.uploadingImage = false;
          this.cdr.markForCheck();
          return;
        }

        this.authService.uploadImg(file_image_id).subscribe({
          next: (updateRes) => {
            if (updateRes.user) {
              this.user = { ...this.user, file_image_id: updateRes.user.file_image_id } as IUser;
            }

            this.uploadingImage = false;
            this.cdr.markForCheck();
          },
          error: (err) => {
            console.error(err);
            this.imageUploadError = 'Profil rasmni yangilashda xato';
            this.uploadingImage = false;
            this.cdr.markForCheck();
          },
        });
      },
      error: (err) => {
        console.error(err);
        this.imageUploadError = 'Fayl yuklashda xato';
        this.uploadingImage = false;
        this.cdr.markForCheck();
      },
    });
  }

  testResultsFull = [] as any[];
  // get my test results
  getMyTestResults() {
    this.profileService.myTestResults().subscribe({
      next: (res) => {
        const observables = res.map((testResult) =>
          this.profileService.getTestIDetails(testResult.sp_tests_id).pipe(
            map((testFull) => ({
              result: testResult,
              test: testFull,
            }))
          )
        );

        forkJoin(observables).subscribe({
          next: (fullTests) => {
            this.testResultsFull = fullTests;
            this.cdr.markForCheck();
          },
          error: (err) => {
            console.error(err);
            this.cdr.markForCheck();
          },
        });
      },
      error: (err) => {
        console.error(err);
        this.cdr.markForCheck();
      },
    });
  }
}
