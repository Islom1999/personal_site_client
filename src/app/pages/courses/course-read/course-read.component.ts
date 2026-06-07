import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { BadgeModule } from 'primeng/badge';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SpCoursesService } from '../../../../shared/services/sp-courses.service';
import {
  ISpCourses,
  ISpCoursesModulePart,
} from '../../../../shared/models/sp-courses.model';
import { environment } from '../../../../environments/environment';
import { FileUrlPipe } from '../../../../shared/pipes/file-url.pipe';

interface FlatLesson {
  moduleIndex: number;
  partIndex: number;
  globalIndex: number;
  part: ISpCoursesModulePart;
  moduleLabel: string;
}

interface LessonGroup {
  id: string;
  label: string;
  from: number;
  to: number;
  lessons: FlatLesson[];
}

@Component({
  selector: 'app-course-read',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    CommonModule,
    ScrollingModule,
    ButtonModule,
    ProgressBarModule,
    CheckboxModule,
    TooltipModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    BadgeModule,
    FileUrlPipe,
  ],
  templateUrl: './course-read.component.html',
  styleUrl: './course-read.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseReadComponent implements OnInit {
  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _cdr = inject(ChangeDetectorRef);
  private readonly _sanitizer = inject(DomSanitizer);
  private readonly _coursesService = inject(SpCoursesService);

  @ViewChild(CdkVirtualScrollViewport) lessonViewport?: CdkVirtualScrollViewport;

  courseId = '';
  courseData: ISpCourses | null = null;
  loading = true;

  allLessons: FlatLesson[] = [];
  visibleLessons: FlatLesson[] = [];
  lessonGroups: LessonGroup[] = [];
  expandedGroupIds = new Set<string>();

  lessonSearch = '';
  sidebarOpen = false;
  useGroupedView = false;

  currentModuleIndex = 0;
  currentPartIndex = 0;
  currentPart: ISpCoursesModulePart | null = null;
  currentPartCompleted = false;

  completedParts = new Set<string>();

  readonly lessonItemSize = 52;
  readonly groupChunkSize = 50;

  ngOnInit() {
    this.courseId = this._route.snapshot.params['id'];
    this.loadCourse();
  }

  loadCourse() {
    this.loading = true;
    this._coursesService.getById(this.courseId).subscribe({
      next: (course) => {
        this.courseData = course;
        this.initializeCourse();
        this.loading = false;
        this._cdr.markForCheck();
      },
      error: (error) => {
        console.error('Kurs yuklanmadi:', error);
        this._router.navigate(['/courses']);
      },
    });
  }

  initializeCourse() {
    this.buildFlatLessons();
    this.loadCompletionState();
    this.applyLessonFilter();
    this.useGroupedView = this.allLessons.length > this.groupChunkSize;

    if (this.allLessons.length) {
      this.expandGroupForCurrentLesson();
    }

    this._cdr.markForCheck();
  }

  buildFlatLessons() {
    this.allLessons = [];
    let globalIndex = 0;

    this.courseData?.sp_courses_modules?.forEach((module, moduleIndex) => {
      const moduleLabel =
        module.name || module.name_uz || module.name_ru || module.name_kr || `Modul ${moduleIndex + 1}`;

      module.sp_courses_module_parts?.forEach((part, partIndex) => {
        this.allLessons.push({
          moduleIndex,
          partIndex,
          globalIndex,
          part,
          moduleLabel,
        });
        globalIndex++;
      });
    });
  }

  buildLessonGroups(source: FlatLesson[]): LessonGroup[] {
    const groups: LessonGroup[] = [];

    for (let i = 0; i < source.length; i += this.groupChunkSize) {
      const chunk = source.slice(i, i + this.groupChunkSize);
      const from = chunk[0]?.globalIndex ?? i;
      const to = chunk[chunk.length - 1]?.globalIndex ?? i;

      groups.push({
        id: `group-${from}`,
        label: `Darslar ${from + 1}–${to + 1}`,
        from,
        to,
        lessons: chunk,
      });
    }

    return groups;
  }

  loadCompletionState() {
    const completionKey = `course_${this.courseId}_completion`;
    const savedCompletion = localStorage.getItem(completionKey);
    if (savedCompletion) {
      this.completedParts = new Set(JSON.parse(savedCompletion));
    }
  }

  applyLessonFilter() {
    const query = this.lessonSearch.trim().toLowerCase();

    if (!query) {
      this.visibleLessons = [...this.allLessons];
    } else {
      this.visibleLessons = this.allLessons.filter((lesson) =>
        this.getLessonTitle(lesson.part).toLowerCase().includes(query),
      );
    }

    this.lessonGroups = this.buildLessonGroups(this.visibleLessons);
    this.useGroupedView = !query && this.visibleLessons.length > this.groupChunkSize;

    if (this.useGroupedView) {
      this.expandGroupForCurrentLesson();
    }

    this._cdr.markForCheck();
  }

  clearLessonSearch() {
    this.lessonSearch = '';
    this.applyLessonFilter();
  }

  get totalLessons(): number {
    return this.allLessons.length;
  }

  get currentLessonNumber(): number {
    if (!this.currentPart) {
      return 0;
    }

    const match = this.allLessons.find(
      (lesson) =>
        lesson.moduleIndex === this.currentModuleIndex &&
        lesson.partIndex === this.currentPartIndex,
    );

    return (match?.globalIndex ?? 0) + 1;
  }

  get courseProgress(): number {
    if (!this.totalLessons) {
      return 0;
    }

    return Math.round((this.completedParts.size / this.totalLessons) * 100);
  }

  get courseName(): string {
    return (
      this.courseData?.name ||
      this.courseData?.name_uz ||
      this.courseData?.name_ru ||
      this.courseData?.name_kr ||
      ''
    );
  }

  get courseDescription(): string {
    return (
      this.courseData?.description ||
      this.courseData?.description_uz ||
      this.courseData?.description_ru ||
      this.courseData?.description_kr ||
      ''
    );
  }

  isGroupExpanded(groupId: string): boolean {
    return this.expandedGroupIds.has(groupId);
  }

  toggleGroup(groupId: string) {
    if (this.expandedGroupIds.has(groupId)) {
      this.expandedGroupIds.delete(groupId);
    } else {
      this.expandedGroupIds.add(groupId);
    }
    this._cdr.markForCheck();
  }

  expandGroupForCurrentLesson() {
    const active =
      this.allLessons.find(
        (lesson) =>
          this.currentPart &&
          lesson.moduleIndex === this.currentModuleIndex &&
          lesson.partIndex === this.currentPartIndex,
      ) ?? this.allLessons[0];

    if (!active) {
      return;
    }

    const groupStart =
      Math.floor(active.globalIndex / this.groupChunkSize) * this.groupChunkSize;
    this.expandedGroupIds.add(`group-${groupStart}`);
  }

  selectPart(moduleIndex: number, partIndex: number, closeSidebar = true) {
    this.currentModuleIndex = moduleIndex;
    this.currentPartIndex = partIndex;

    const module = this.courseData?.sp_courses_modules?.[moduleIndex];
    this.currentPart = module?.sp_courses_module_parts?.[partIndex] ?? null;

    this.currentPartCompleted = this.currentPart
      ? this.completedParts.has(this.currentPart.id)
      : false;

    this.expandGroupForCurrentLesson();

    if (closeSidebar) {
      this.sidebarOpen = false;
    }

    this._cdr.markForCheck();
    this.queueScrollToCurrentLesson();
  }

  selectFlatLesson(lesson: FlatLesson) {
    this.selectPart(lesson.moduleIndex, lesson.partIndex);
  }

  startFirstLesson() {
    const first = this.allLessons[0];
    if (first) {
      this.selectPart(first.moduleIndex, first.partIndex, false);
    }
  }

  isLessonActive(lesson: FlatLesson): boolean {
    return (
      this.currentModuleIndex === lesson.moduleIndex &&
      this.currentPartIndex === lesson.partIndex
    );
  }

  isLessonCompleted(lesson: FlatLesson): boolean {
    return this.completedParts.has(lesson.part.id);
  }

  hasPreviousPart(): boolean {
    return this.currentLessonNumber > 1;
  }

  hasNextPart(): boolean {
    return this.currentLessonNumber > 0 && this.currentLessonNumber < this.totalLessons;
  }

  goToPreviousPart() {
    const currentIndex = this.currentLessonNumber - 1;
    if (currentIndex <= 0) {
      return;
    }

    const prev = this.allLessons[currentIndex - 1];
    if (prev) {
      this.selectPart(prev.moduleIndex, prev.partIndex);
    }
  }

  goToNextPart() {
    const currentIndex = this.currentLessonNumber - 1;
    const next = this.allLessons[currentIndex + 1];
    if (next) {
      this.selectPart(next.moduleIndex, next.partIndex);
    }
  }

  markPartAsCompleted() {
    if (!this.currentPart) {
      return;
    }

    if (this.currentPartCompleted) {
      this.completedParts.add(this.currentPart.id);
    } else {
      this.completedParts.delete(this.currentPart.id);
    }

    localStorage.setItem(
      `course_${this.courseId}_completion`,
      JSON.stringify([...this.completedParts]),
    );

    this._cdr.markForCheck();
  }

  scrollToCurrentLesson() {
    if (!this.lessonViewport || this.useGroupedView) {
      return;
    }

    const index = this.visibleLessons.findIndex((lesson) => this.isLessonActive(lesson));
    if (index >= 0) {
      this.lessonViewport.scrollToIndex(index, 'smooth');
    }
  }

  getContentTypeLabel(type?: string): string {
    switch (type) {
      case 'youtube':
        return 'YouTube';
      case 'video':
        return 'Video';
      case 'text':
        return 'Matn';
      case 'gibrid':
        return 'Aralash';
      default:
        return "Noma'lum";
    }
  }

  getYouTubeEmbedUrl(link?: string): SafeResourceUrl | null {
    if (!link) {
      return null;
    }

    const youtubeRegex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = link.match(youtubeRegex);

    if (!match?.[1]) {
      return null;
    }

    const embedUrl = `https://www.youtube.com/embed/${match[1]}?rel=0&modestbranding=1`;
    return this._sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  getCurrentPartYoutubeEmbedUrl(): SafeResourceUrl | null {
    return this.getYouTubeEmbedUrl(
      this.currentPart?.youtube_link || this.currentPart?.content,
    );
  }

  getPartIconClass(type?: string): string {
    switch (type) {
      case 'youtube':
        return 'pi pi-youtube';
      case 'text':
        return 'pi pi-file-edit';
      case 'gibrid':
        return 'pi pi-clone';
      default:
        return 'pi pi-play-circle';
    }
  }

  getServerVideoUrl(fileId: string): string {
    return `${environment.apiBaseUrl}/files/${fileId}/stream`;
  }

  isYoutubeType(type?: string): boolean {
    return type === 'youtube' || type === 'gibrid';
  }

  isServerVideoType(type?: string): boolean {
    return type === 'video' || type === 'gibrid';
  }

  isTextType(type?: string): boolean {
    return type === 'text' || type === 'gibrid';
  }

  getLessonTitle(part: ISpCoursesModulePart): string {
    return part.name || part.name_uz || part.name_ru || part.name_kr || 'Dars';
  }

  trackLesson(_index: number, lesson: FlatLesson): string {
    return lesson.part.id;
  }

  trackGroup(_index: number, group: LessonGroup): string {
    return group.id;
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    this._cdr.markForCheck();
  }

  private queueScrollToCurrentLesson() {
    setTimeout(() => this.scrollToCurrentLesson(), 0);
  }
}
