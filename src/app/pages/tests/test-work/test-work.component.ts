import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { DialogModule } from 'primeng/dialog';
import { SpTestsService } from '../../../../shared/services/sp-tests.service';
import { ISpTests } from '../../../../shared/models/sp-tests.model';

interface TestQuestion {
  id: string;
  question_text: string;
  image_url?: string;
  options: TestOption[];
}

interface TestOption {
  id: string;
  option_text: string;
}

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
  imports: [
    CommonModule,
    ButtonModule,
    ProgressBarModule,
    DialogModule,
  ],
  templateUrl: './test-work.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestWorkComponent implements OnInit, OnDestroy {
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _testsService = inject(SpTestsService);

  testId: string = '';
  testData: ISpTests | null = null;
  questions: TestQuestion[] = [];
  currentQuestionIndex = 0;
  selectedAnswers: { [questionId: string]: string } = {};
  
  // Timer
  timeRemaining = 0; // in seconds
  timerInterval: any;
  startTime = Date.now();
  
  // UI State
  showFinishDialog = false;

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
        this.timeRemaining = (test.duration || 30) * 60; // Convert minutes to seconds
        this.startTimer();
        this.loadQuestions();
      },
      error: (error) => {
        console.error('Test yuklanmadi:', error);
        this._router.navigate(['/tests']);
      }
    });
  }

  loadQuestions() {
    // Demo questions - real implementation would load from API
    this.questions = [
      {
        id: '1',
        question_text: '2x + 5 = 13 tenglamaning yechimi qanday?',
        options: [
          { id: '1a', option_text: 'x = 4' },
          { id: '1b', option_text: 'x = 3' },
          { id: '1c', option_text: 'x = 5' },
          { id: '1d', option_text: 'x = 6' }
        ]
      },
      {
        id: '2',
        question_text: 'Kvadrat tenglamaning diskriminanti qanday hisoblanadi?',
        options: [
          { id: '2a', option_text: 'D = b² - 4ac' },
          { id: '2b', option_text: 'D = b² + 4ac' },
          { id: '2c', option_text: 'D = a² - 4bc' },
          { id: '2d', option_text: 'D = c² - 4ab' }
        ]
      },
      {
        id: '3',
        question_text: 'Sin(90°) ning qiymati nechaga teng?',
        options: [
          { id: '3a', option_text: '0' },
          { id: '3b', option_text: '1' },
          { id: '3c', option_text: '√2/2' },
          { id: '3d', option_text: '√3/2' }
        ]
      },
      {
        id: '4',
        question_text: 'Uchburchakning ichki burchaklari yig\'indisi necha gradus?',
        options: [
          { id: '4a', option_text: '90°' },
          { id: '4b', option_text: '180°' },
          { id: '4c', option_text: '270°' },
          { id: '4d', option_text: '360°' }
        ]
      },
      {
        id: '5',
        question_text: 'Pitagor teoremasining formulasi qanday?',
        options: [
          { id: '5a', option_text: 'a + b = c' },
          { id: '5b', option_text: 'a² + b² = c²' },
          { id: '5c', option_text: 'a² - b² = c²' },
          { id: '5d', option_text: 'a × b = c²' }
        ]
      }
    ];
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timeRemaining--;
      if (this.timeRemaining <= 0) {
        this.timeUp();
      }
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

  get currentQuestion(): TestQuestion | null {
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
    
    const answers: TestAnswer[] = Object.entries(this.selectedAnswers).map(([questionId, optionId]) => ({
      sp_tests_quession_id: questionId,
      sp_tests_quession_option_id: optionId
    }));

    const submission: TestSubmission = {
      sp_tests_id: this.testId,
      answers: answers,
      time_spent: timeSpent
    };

    // Submit to backend
    this.submitToBackend(submission);
  }

  private submitToBackend(submission: TestSubmission) {
    // Real implementation would call API
    console.log('Test submission:', submission);
    
    // Demo: Show results and redirect
    const score = Math.floor(Math.random() * 40) + 60; // Random score between 60-100
    alert(`Test yakunlandi!\nSizning natijangiz: ${score}%\nJavoblangan savollar: ${this.answeredCount}/${this.questions.length}`);
    
    // Redirect to tests page or results page
    this._router.navigate(['/tests']);
  }
}