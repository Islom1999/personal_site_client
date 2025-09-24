import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { CheckboxModule } from 'primeng/checkbox';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SpCoursesService } from '../../../../shared/services/sp-courses.service';
import {
  ISpCourses,
  ISpCoursesModule,
  ISpCoursesModulePart,
} from '../../../../shared/models/sp-courses.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-course-read',
  standalone: true,
  imports: [RouterLink, FormsModule, ButtonModule, ProgressBarModule, CheckboxModule],
  templateUrl: './course-read.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseReadComponent implements OnInit {
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _cdr = inject(ChangeDetectorRef);
  private _sanitizer = inject(DomSanitizer);
  private _coursesService = inject(SpCoursesService);

  courseId: string = '';
  courseData: ISpCourses | null = null;

  // Current lesson tracking
  currentModuleIndex = 0;
  currentPartIndex = 0;
  currentPart!: ISpCoursesModulePart;
  currentPartCompleted = false;

  // UI State
  expandedModules: { [key: number]: boolean } = {};
  completedParts: Set<string> = new Set();

  ngOnInit() {
    this.courseId = this._route.snapshot.params['id'];
    this.loadCourse();
  }

  loadCourse() {
    this._coursesService.getById(this.courseId).subscribe({
      next: (course) => {
        this.courseData = course;
        this.initializeCourse();
        this._cdr.markForCheck();
      },
      error: (error) => {
        console.error('Kurs yuklanmadi:', error);
        this._router.navigate(['/courses']);
      },
    });
  }

  initializeCourse() {
    if (this.courseData?.sp_courses_modules?.length) {
      // Expand first module by default
      this.expandedModules[0] = true;

      // Load completion status from localStorage
      const completionKey = `course_${this.courseId}_completion`;
      const savedCompletion = localStorage.getItem(completionKey);
      if (savedCompletion) {
        this.completedParts = new Set(JSON.parse(savedCompletion));
      }
    }
  }

  get courseProgress(): number {
    if (!this.courseData?.sp_courses_modules?.length) return 0;

    const totalParts = this.courseData.sp_courses_modules.reduce(
      (total, module) => total + (module.sp_courses_module_parts?.length || 0),
      0
    );

    if (totalParts === 0) return 0;

    return Math.round((this.completedParts.size / totalParts) * 100);
  }

  toggleModule(moduleIndex: number) {
    this.expandedModules[moduleIndex] = !this.expandedModules[moduleIndex];
    this._cdr.markForCheck();
  }

  selectPart(moduleIndex: number, partIndex: number) {
    this.currentModuleIndex = moduleIndex;
    this.currentPartIndex = partIndex;

    const module = this.courseData?.sp_courses_modules?.[moduleIndex];
    this.currentPart = module?.sp_courses_module_parts?.[partIndex] as any;

    // Check if current part is completed
    this.currentPartCompleted = this.currentPart
      ? this.completedParts.has(this.currentPart.id)
      : false;

    this._cdr.markForCheck();
  }

  startFirstLesson() {
    if (this.courseData?.sp_courses_modules?.[0]?.sp_courses_module_parts?.[0]) {
      this.selectPart(0, 0);
    }
  }

  hasPreviousPart(): boolean {
    if (this.currentModuleIndex === 0 && this.currentPartIndex === 0) {
      return false;
    }
    return true;
  }

  hasNextPart(): boolean {
    if (!this.courseData?.sp_courses_modules?.length) return false;

    const currentModule = this.courseData.sp_courses_modules[this.currentModuleIndex];
    const isLastPartInModule =
      this.currentPartIndex >= (currentModule?.sp_courses_module_parts?.length || 0) - 1;
    const isLastModule = this.currentModuleIndex >= this.courseData.sp_courses_modules.length - 1;

    return !(isLastPartInModule && isLastModule);
  }

  goToPreviousPart() {
    if (!this.hasPreviousPart()) return;

    if (this.currentPartIndex > 0) {
      this.selectPart(this.currentModuleIndex, this.currentPartIndex - 1);
    } else {
      // Go to previous module's last part
      const prevModule = this.courseData?.sp_courses_modules?.[this.currentModuleIndex - 1];
      if (prevModule?.sp_courses_module_parts?.length) {
        this.selectPart(this.currentModuleIndex - 1, prevModule.sp_courses_module_parts.length - 1);
        this.expandedModules[this.currentModuleIndex - 1] = true;
      }
    }
  }

  goToNextPart() {
    if (!this.hasNextPart()) return;

    const currentModule = this.courseData?.sp_courses_modules?.[this.currentModuleIndex];
    const isLastPartInModule =
      this.currentPartIndex >= (currentModule?.sp_courses_module_parts?.length || 0) - 1;

    if (!isLastPartInModule) {
      this.selectPart(this.currentModuleIndex, this.currentPartIndex + 1);
    } else {
      // Go to next module's first part
      this.selectPart(this.currentModuleIndex + 1, 0);
      this.expandedModules[this.currentModuleIndex + 1] = true;
    }
  }

  markPartAsCompleted() {
    if (!this.currentPart) return;

    if (this.currentPartCompleted) {
      this.completedParts.add(this.currentPart.id);
    } else {
      this.completedParts.delete(this.currentPart.id);
    }

    // Save to localStorage
    const completionKey = `course_${this.courseId}_completion`;
    localStorage.setItem(completionKey, JSON.stringify([...this.completedParts]));

    this._cdr.markForCheck();
  }

  getContentTypeLabel(type?: string): string {
    switch (type) {
      case 'video_youtube':
        return 'YouTube Video';
      case 'video_server':
        return 'Video';
      case 'text':
        return 'Matn';
      case 'gibrid':
        return 'Aralash';
      default:
        return "Noma'lum";
    }
  }

  getYouTubeEmbedUrl(content?: string): SafeResourceUrl | null {
    if (!content) return null;

    // Extract YouTube video ID from various URL formats
    const youtubeRegex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = content.match(youtubeRegex);

    if (match && match[1]) {
      const embedUrl = `https://www.youtube.com/embed/${match[1]}`;
      return this._sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    }

    return null;
  }

  getServerVideoUrl(fileId: string): string {
    return `${environment.apiBaseUrl}/files/${fileId}/stream`;
  }
}
