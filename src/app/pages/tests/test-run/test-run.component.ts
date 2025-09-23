import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  Input,
  Output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';

export interface TestQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  category?: string;
}

export interface Test {
  id: string;
  title: string;
  description: string;
  questions: TestQuestion[];
  timeLimit: number; // in minutes
  totalQuestions: number;
}

export interface TestAnswer {
  questionId: number;
  selectedAnswer: number | null;
  timeSpent: number;
}

export interface TestSession {
  testId: string;
  answers: TestAnswer[];
  startTime: Date;
  timeRemaining: number;
  currentQuestionIndex: number;
}

@Component({
  selector: 'app-test-run',
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    ProgressBarModule,
    ButtonModule,
    RadioButtonModule,
  ],
  templateUrl: './test-run.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestRunComponent {
  @Input() visible = false;
  @Input() selectedTest: Test | null = null;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() testFinished = new EventEmitter<{
    testId: string;
    answers: TestAnswer[];
    timeSpent: number;
    score: number;
    correctAnswers: number;
  }>();
  @Output() testCancelled = new EventEmitter<void>();

  // Signals for reactive state management
  currentQuestionIndex = signal(0);
  selectedAnswer = signal<number | null>(null);
  timeRemaining = signal(0);
  answers = signal<TestAnswer[]>([]);
  showFinishDialog = signal(false);

  private timer: any;
  private startTime: Date = new Date();

  // Computed values
  currentQuestion = computed(() => {
    const test = this.selectedTest;
    const index = this.currentQuestionIndex();
    return test?.questions[index] || null;
  });

  progressPercentage = computed(() => {
    if (!this.selectedTest) return 0;
    return ((this.currentQuestionIndex() + 1) / this.selectedTest.totalQuestions) * 100;
  });

  isLastQuestion = computed(() => {
    if (!this.selectedTest) return false;
    return this.currentQuestionIndex() === this.selectedTest.totalQuestions - 1;
  });

  answeredQuestionsCount = computed(() => {
    return this.answers().filter((answer) => answer.selectedAnswer !== null).length;
  });

  unansweredQuestionsCount = computed(() => {
    if (!this.selectedTest) return 0;
    return this.selectedTest.totalQuestions - this.answeredQuestionsCount();
  });

  ngOnInit(): void {
    if (this.selectedTest) {
      this.initializeTest();
    }
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  private initializeTest(): void {
    if (!this.selectedTest) return;

    this.startTime = new Date();
    this.currentQuestionIndex.set(0);
    this.timeRemaining.set(this.selectedTest.timeLimit * 60); // Convert minutes to seconds

    // Initialize answers array
    const initialAnswers: TestAnswer[] = this.selectedTest.questions.map((question) => ({
      questionId: question.id,
      selectedAnswer: null,
      timeSpent: 0,
    }));
    this.answers.set(initialAnswers);

    // Load current question's answer
    this.loadCurrentAnswer();

    // Start timer
    this.startTimer();
  }

  private startTimer(): void {
    this.timer = setInterval(() => {
      const remaining = this.timeRemaining();
      if (remaining > 0) {
        this.timeRemaining.set(remaining - 1);
      } else {
        this.finishTest();
      }
    }, 1000);
  }

  private clearTimer(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  private loadCurrentAnswer(): void {
    const currentAnswers = this.answers();
    const currentQuestionId = this.currentQuestion()?.id;
    const answer = currentAnswers.find((a) => a.questionId === currentQuestionId);
    this.selectedAnswer.set(answer?.selectedAnswer || null);
  }

  private saveCurrentAnswer(): void {
    const currentAnswers = this.answers();
    const currentQuestionId = this.currentQuestion()?.id;
    const answerIndex = currentAnswers.findIndex((a) => a.questionId === currentQuestionId);

    if (answerIndex !== -1) {
      const updatedAnswers = [...currentAnswers];
      updatedAnswers[answerIndex] = {
        ...updatedAnswers[answerIndex],
        selectedAnswer: this.selectedAnswer(),
        timeSpent: updatedAnswers[answerIndex].timeSpent + 1,
      };
      this.answers.set(updatedAnswers);
    }
  }

  selectAnswer(answerIndex: number): void {
    this.selectedAnswer.set(answerIndex);
    this.saveCurrentAnswer();
  }

  nextQuestion(): void {
    if (this.isLastQuestion()) {
      this.finishTest();
    } else {
      this.saveCurrentAnswer();
      this.currentQuestionIndex.set(this.currentQuestionIndex() + 1);
      this.loadCurrentAnswer();
    }
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex() > 0) {
      this.saveCurrentAnswer();
      this.currentQuestionIndex.set(this.currentQuestionIndex() - 1);
      this.loadCurrentAnswer();
    }
  }

  goToQuestion(index: number): void {
    this.saveCurrentAnswer();
    this.currentQuestionIndex.set(index);
    this.loadCurrentAnswer();
  }

  hasAnswer(questionIndex: number): boolean {
    const question = this.selectedTest?.questions[questionIndex];
    if (!question) return false;

    const answer = this.answers().find((a) => a.questionId === question.id);
    return answer?.selectedAnswer !== null;
  }

  showFinishConfirmation(): void {
    this.showFinishDialog.set(true);
  }

  finishTest(): void {
    this.clearTimer();
    this.saveCurrentAnswer();

    if (!this.selectedTest) return;

    // Calculate results
    const finalAnswers = this.answers();
    let correctAnswers = 0;

    finalAnswers.forEach((answer) => {
      const question = this.selectedTest!.questions.find((q) => q.id === answer.questionId);
      if (question && answer.selectedAnswer === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const score = Math.round((correctAnswers / this.selectedTest.totalQuestions) * 100);
    const timeSpent = Math.round((Date.now() - this.startTime.getTime()) / 1000 / 60); // in minutes

    this.testFinished.emit({
      testId: this.selectedTest.id,
      answers: finalAnswers,
      timeSpent,
      score,
      correctAnswers,
    });

    this.closeDialog();
  }

  cancelTest(): void {
    this.clearTimer();
    this.testCancelled.emit();
    this.closeDialog();
  }

  private closeDialog(): void {
    this.visible = false;
    this.visibleChange.emit(false);
    this.showFinishDialog.set(false);

    // Reset state
    this.currentQuestionIndex.set(0);
    this.selectedAnswer.set(null);
    this.timeRemaining.set(0);
    this.answers.set([]);
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
}
