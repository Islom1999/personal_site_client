import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { SpTestsService } from '../../../../shared/services/sp-tests.service';
import {
  ISpTests,
  ISpTestsQuession,
  ISpQuessionOption,
  IClientResult,
} from '../../../../shared/models/sp-tests.model';

interface TestAnswer {
  sp_tests_quession_id: string;
  sp_tests_quession_option_id: string;
}

interface TestSubmission {
  sp_tests_id: string;
  answers: TestAnswer[];
  time_spent: number;
}

@Component({
  selector: 'app-test-work',
  standalone: true,
  imports: [CommonModule, ButtonModule, ProgressBarModule, DialogModule, TagModule],
  templateUrl: './test-work.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestWorkComponent implements OnInit, OnDestroy {
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _testsService = inject(SpTestsService);
  private _cdr = inject(ChangeDetectorRef);

  testId: string = '';
  testData: ISpTests | null = null;
  questions: ISpTestsQuession[] = [];
  currentQuestionIndex = 0;
  selectedAnswers: { [questionId: string]: string } = {};

  // Timer
  timeRemaining = signal(0); // in seconds
  timerInterval: any;
  startTime = Date.now();

  // UI State
  showFinishDialog = false;
  showResultDialog = false;
  testResult: IClientResult | null = null;

  ngOnInit() {
    this.testId = this._route.snapshot.params['id'];
    this.loadTest();
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  loadTest() {
    // Load test data
    this._testsService.getById(this.testId).subscribe({
      next: (test) => {
        this.testData = test;
        this.timeRemaining.set((test.duration || 30) * 60); // Convert minutes to seconds
        this.startTimer();
        this.questions = test.sp_tests_quessions || [];
        this._cdr.markForCheck();
      },
      error: (error) => {
        console.error('Test yuklanmadi:', error);
        this._router.navigate(['/tests']);
      },
    });
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timeRemaining.update((v) => v - 1);
      if (this.timeRemaining() <= 0) {
        this.timeUp();
      }
      this._cdr.markForCheck();
    }, 1000);
  }

  timeUp() {
    clearInterval(this.timerInterval);
    alert('Vaqt tugadi! Test avtomatik yakunlanadi.');
    this.submitTest();
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  get currentQuestion(): ISpTestsQuession | null {
    return this.questions[this.currentQuestionIndex] || null;
  }

  get progress(): number {
    return ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
  }

  get answeredCount(): number {
    return Object.keys(this.selectedAnswers).length;
  }

  selectAnswer(questionId: string, optionId: string) {
    this.selectedAnswers[questionId] = optionId;
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      this.finishTest();
    }
  }

  goToQuestion(index: number) {
    this.currentQuestionIndex = index;
  }

  finishTest() {
    this.showFinishDialog = true;
  }

  cancelFinish() {
    this.showFinishDialog = false;
  }

  confirmFinish() {
    this.showFinishDialog = false;
    this.submitTest();
  }

  submitTest() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    const timeSpent = Math.floor((Date.now() - this.startTime) / 1000); // in seconds

    const answers: TestAnswer[] = Object.entries(this.selectedAnswers).map(
      ([questionId, optionId]) => ({
        sp_tests_quession_id: questionId,
        sp_tests_quession_option_id: optionId,
      })
    );

    const submission: TestSubmission = {
      sp_tests_id: this.testId,
      answers: answers,
      time_spent: timeSpent,
    };

    // Submit to backend
    this.submitToBackend(submission);
  }

  private submitToBackend(submission: TestSubmission) {
    // Submit test results to backend
    this._testsService.submitTestResult(submission).subscribe({
      next: (result) => {
        this.testResult = result;
        this.showResultDialog = true;
        this._cdr.markForCheck();
      },
      error: (error) => {
        console.error('Test natijasini yuborishda xatolik:', error);
        // Xatolik bo'lsa ham asosiy ma'lumotlarni ko'rsatamiz
        this.testResult = {
          id: '',
          version_id: BigInt(0),
          created_at: new Date(),
          updated_at: new Date(),
          score: Math.round((this.answeredCount / this.questions.length) * 100),
          correct_answers: 0,
          total_questions: this.questions.length,
          time_spent: Math.floor((Date.now() - this.startTime) / 1000),
          sp_tests_id: this.testId,
          client_user_id: null,
          client_result_answer: []
        };
        this.showResultDialog = true;
        this._cdr.markForCheck();
      },
    });
  }

  getScoreColorClass(score: number): string {
    if (score >= 70) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  }

  getResultMessage(score: number): string {
    if (score >= 90) return 'Ajoyib natija! Siz a\'lo darajada bilim namoyon qildingiz.';
    if (score >= 80) return 'Yaxshi natija! Bilimlaringiz yetarli darajada.';
    if (score >= 70) return 'Qoniqarli natija. Yanada yaxshiroq bo\'lishi mumkin.';
    if (score >= 50) return 'O\'rtacha natija. Ko\'proq mashq qilish kerak.';
    return 'Zaif natija. Mavzuni qayta o\'rganish tavsiya etiladi.';
  }

  getGrade(score: number): string {
    if (score >= 90) return '5 (A\'lo)';
    if (score >= 80) return '4 (Yaxshi)';
    if (score >= 70) return '3 (Qoniqarli)';
    if (score >= 50) return '2 (Qoniqarsiz)';
    return '1 (Yomon)';
  }

  getGradeSeverity(score: number): string {
    if (score >= 80) return 'success';
    if (score >= 70) return 'info';
    if (score >= 50) return 'warning';
    return 'danger';
  }

  formatTimeSpent(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  retakeTest() {
    // Testni qayta boshlash
    this.showResultDialog = false;
    this.testResult = null;
    
    // Test holatini qayta tiklash
    this.currentQuestionIndex = 0;
    this.selectedAnswers = {};
    this.startTime = Date.now();
    
    if (this.testData) {
      this.timeRemaining.set((this.testData.duration || 30) * 60);
      this.startTimer();
    }
    
    this._cdr.markForCheck();
  }

  goToTests() {
    this._router.navigate(['/tests']);
  }
}
