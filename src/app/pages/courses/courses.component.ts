import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  OnInit,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { TabsModule } from 'primeng/tabs';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { toSignal } from '@angular/core/rxjs-interop';
import { SpCategoryService } from '../../../shared/services/sp-category.service';
import { SpLevelService } from '../../../shared/services/sp-level.service';
import { SpCoursesService } from '../../../shared/services/sp-courses.service';
import { ISpCourses } from '../../../shared/models/sp-courses.model';
import { SelectItemLabelPipe } from '../../../shared/pipes/select-item-label.pipe';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    TagModule,
    ProgressBarModule,
    RatingModule,
    FormsModule,
    DialogModule,
    TabsModule,
    AccordionModule,
    CheckboxModule,
    SelectItemLabelPipe,
  ],
  templateUrl: './courses.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent implements OnInit {
  _cdr = inject(ChangeDetectorRef);

  _spCategoryService = inject(SpCategoryService);
  _spLevelService = inject(SpLevelService);
  _spCoursesService = inject(SpCoursesService);

  categories = toSignal(this._spCategoryService.getAll(), { initialValue: [] });
  levels = toSignal(this._spLevelService.getAll(), { initialValue: [] });
  courses = toSignal(this._spCoursesService.getAll(), { initialValue: [] });

  showCourseOnboardDialog = false;
  showVideoDialog = false;
  selectedCourse: ISpCourses | null = null;
  selectedFilter = 'all';
  filteredCourses: ISpCourses[] = [];

  constructor() {
    effect(() => {
      this.filteredCourses = [...this.courses()];
    });
  }

  ngOnInit() {}

  filterCourses(level_id: string) {
    this.selectedFilter = level_id;
    if (level_id == 'all') {
      this.filteredCourses = [...this.courses()];
    } else {
      this.filteredCourses = this.courses().filter((course) => course.sp_level_id == level_id);
    }
    this._cdr.markForCheck();
  }

  filterByCategory(category_id: string) {
    if (category_id == 'all') {
      this.filteredCourses = [...this.courses()];
    } else {
      this.filteredCourses = this.courses().filter(
        (course) => course.sp_category_id == category_id
      );
    }
    this._cdr.markForCheck();
  }

  showCourseOnboard(course: ISpCourses) {
    // Get full course details with modules
    this._spCoursesService.getById(course.id).subscribe({
      next: (fullCourse) => {
        this.selectedCourse = fullCourse;
        this.showCourseOnboardDialog = true;
        this._cdr.markForCheck();
      },
      error: (error) => {
        console.error('Kurs ma\'lumotlarini yuklashda xatolik:', error);
      }
    });
  }

  closeCourseOnboard() {
    this.showCourseOnboardDialog = false;
    this.selectedCourse = null;
    this._cdr.markForCheck();
  }

  startCourse() {
    if (this.selectedCourse) {
      // Navigate to course read page
      this._router.navigate(['/courses', this.selectedCourse.id]);
    }
    this.closeCourseOnboard();
  }
}
