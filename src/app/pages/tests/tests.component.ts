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
import { Router } from '@angular/router';

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
  _router = inject(Router);

  _spCategoryService = inject(SpCategoryService);
  _spLevelService = inject(SpLevelService);
  _spTestsService = inject(SpTestsService);

  categories = toSignal(this._spCategoryService.getAll(), { initialValue: [] });
  levels = toSignal(this._spLevelService.getAll(), { initialValue: [] });
  tests = toSignal(this._spTestsService.getAll(), { initialValue: [] });

  selectedCategory = 'all';
  selectedLevel = 'all';
  showTestInfoDialog = false;
  selectedTest: ISpTests | null = null;

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

  ngOnInit() {
    this.filteredTests = [...this.tests()];
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

  showTestInfo(test: ISpTests) {
    this.selectedTest = test;
    this.showTestInfoDialog = true;
  }

  closeTestInfo() {
    this.showTestInfoDialog = false;
    this.selectedTest = null;
  }

  startTest() {
    if (this.selectedTest) {
      this.closeTestInfo();
      this._router.navigate(['/tests', this.selectedTest.id]);
    }
  }
}
