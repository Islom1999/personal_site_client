import { TooltipModule } from 'primeng/tooltip';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { SpCategoryService } from '../../../shared/services/sp-category.service';
import { SpLevelService } from '../../../shared/services/sp-level.service';
import { SpMaterialsService } from '../../../shared/services/sp-materials.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ISpMaterials } from '../../../shared/models/sp-materials.model';
import { SelectItemLabelPipe } from '../../../shared/pipes/select-item-label.pipe';
import { environment } from '../../../environments/environment';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-materials',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    InputTextModule,
    SelectModule,
    FormsModule,
    TooltipModule,
    SelectItemLabelPipe,
    TranslateModule,
  ],
  templateUrl: './materials.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsComponent {
  _spCategoryService = inject(SpCategoryService);
  _spLevelService = inject(SpLevelService);
  _spMaterialsService = inject(SpMaterialsService);

  categories = toSignal(this._spCategoryService.getAll(), { initialValue: [] });
  levels = toSignal(this._spLevelService.getAll(), { initialValue: [] });
  materials = toSignal(this._spMaterialsService.getAll(), { initialValue: [] });

  searchTerm = '';
  selectedCategory = '';
  selectedLevel = '';

  formatFileSize(sizeInBytes: number): string {
    if (!sizeInBytes) return '0 KB';

    const kb = 1024;
    const mb = kb * 1024;
    const gb = mb * 1024;

    if (sizeInBytes < kb) {
      return `${sizeInBytes} B`;
    } else if (sizeInBytes < mb) {
      return `${(sizeInBytes / kb).toFixed(2)} KB`;
    } else if (sizeInBytes < gb) {
      return `${(sizeInBytes / mb).toFixed(2)} MB`;
    } else {
      return `${(sizeInBytes / gb).toFixed(2)} GB`;
    }
  }

  get filteredMaterials(): ISpMaterials[] {
    return this.materials().filter((material) => {
      const matchesSearch =
        !this.searchTerm ||
        material.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        material.description.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesCategory =
        !this.selectedCategory || material.sp_category_id === this.selectedCategory;
      const matchesLevel = !this.selectedLevel || material.sp_level_id === this.selectedLevel;

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }

  openPdf(material: ISpMaterials) {
    const link = `${environment.apiBaseUrl}/files/${material.file_id}/stream`;
    // window.open(link, '_blank');
    window.open(link, 'pdfWindow', 'width=1000,height=800');
  }
}
