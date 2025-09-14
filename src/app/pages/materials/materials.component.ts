import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

interface Material {
  id: number;
  title: string;
  description: string;
  category: string;
  level: string;
  downloadCount: number;
  fileSize: string;
  icon: string;
}

@Component({
  selector: 'app-materials',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule, InputTextModule, DropdownModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">O'quv Ishlanmalari</h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Matematika fanining barcha bo'limlari bo'yicha to'liq darslik materiallari, 
            qo'llanmalar va amaliy mashqlar to'plami
          </p>
        </div>

        <!-- Filters -->
        <div class="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="flex flex-col">
              <label class="text-sm font-medium text-gray-700 mb-2">Qidirish</label>
              <span class="p-input-icon-left w-full">
                <i class="pi pi-search"></i>
                <input 
                  type="text" 
                  pInputText 
                  placeholder="Material nomi..." 
                  [(ngModel)]="searchTerm"
                  class="w-full" />
              </span>
            </div>
            <div class="flex flex-col">
              <label class="text-sm font-medium text-gray-700 mb-2">Kategoriya</label>
              <p-dropdown 
                [options]="categories" 
                [(ngModel)]="selectedCategory"
                placeholder="Kategoriyani tanlang"
                optionLabel="label"
                optionValue="value"
                class="w-full">
              </p-dropdown>
            </div>
            <div class="flex flex-col">
              <label class="text-sm font-medium text-gray-700 mb-2">Daraja</label>
              <p-dropdown 
                [options]="levels" 
                [(ngModel)]="selectedLevel"
                placeholder="Darajani tanlang"
                optionLabel="label"
                optionValue="value"
                class="w-full">
              </p-dropdown>
            </div>
          </div>
        </div>

        <!-- Materials Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div *ngFor="let material of filteredMaterials" 
               class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
            <div class="p-6">
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <i [class]="material.icon" class="text-white text-xl"></i>
                </div>
                <span class="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  {{ material.category }}
                </span>
              </div>
              
              <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                {{ material.title }}
              </h3>
              
              <p class="text-gray-600 mb-4 line-clamp-3">
                {{ material.description }}
              </p>
              
              <div class="flex items-center justify-between text-sm text-gray-500 mb-6">
                <span class="flex items-center">
                  <i class="pi pi-download mr-1"></i>
                  {{ material.downloadCount }} yuklab olindi
                </span>
                <span class="flex items-center">
                  <i class="pi pi-file mr-1"></i>
                  {{ material.fileSize }}
                </span>
              </div>
              
              <div class="flex items-center justify-between">
                <span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                  {{ material.level }}
                </span>
                <div class="flex space-x-2">
                  <p-button 
                    icon="pi pi-eye" 
                    [text]="true"
                    [rounded]="true"
                    class="text-blue-600 hover:bg-blue-50"
                    pTooltip="Ko'rish">
                  </p-button>
                  <p-button 
                    icon="pi pi-download" 
                    [text]="true"
                    [rounded]="true"
                    class="text-green-600 hover:bg-green-50"
                    pTooltip="Yuklab olish">
                  </p-button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div *ngIf="filteredMaterials.length === 0" class="text-center py-16">
          <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i class="pi pi-search text-gray-400 text-3xl"></i>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Hech narsa topilmadi</h3>
          <p class="text-gray-600">Qidiruv shartlaringizni o'zgartirib ko'ring</p>
        </div>
      </div>
    </div>
  `
})
export class MaterialsComponent {
  searchTerm = '';
  selectedCategory = '';
  selectedLevel = '';

  categories = [
    { label: 'Barcha kategoriyalar', value: '' },
    { label: 'Algebra', value: 'algebra' },
    { label: 'Geometriya', value: 'geometriya' },
    { label: 'Matematik analiz', value: 'analiz' },
    { label: 'Ehtimollar nazariyasi', value: 'ehtimollar' },
    { label: 'Diskret matematika', value: 'diskret' }
  ];

  levels = [
    { label: 'Barcha darajalar', value: '' },
    { label: 'Boshlang\'ich', value: 'boshlangich' },
    { label: 'O\'rta', value: 'orta' },
    { label: 'Yuqori', value: 'yuqori' },
    { label: 'Ilg\'or', value: 'ilgor' }
  ];

  materials: Material[] = [
    {
      id: 1,
      title: 'Chiziqli Algebra Asoslari',
      description: 'Vektorlar, matritsalar va chiziqli tenglamalar sistemasi bo\'yicha to\'liq qo\'llanma. Nazariy qism va amaliy misollar bilan.',
      category: 'algebra',
      level: 'orta',
      downloadCount: 1250,
      fileSize: '2.5 MB',
      icon: 'pi pi-calculator'
    },
    {
      id: 2,
      title: 'Planimetriya Formulalari',
      description: 'Tekislik geometriyasining barcha asosiy formulalari va teoremalar. Uchburchak, to\'rtburchak va aylana masalalari.',
      category: 'geometriya',
      level: 'boshlangich',
      downloadCount: 980,
      fileSize: '1.8 MB',
      icon: 'pi pi-compass'
    },
    {
      id: 3,
      title: 'Hosilalar va Integrallar',
      description: 'Matematik analizning asosiy tushunchalari: hosilalar, integrallar va ularning qo\'llanilishi.',
      category: 'analiz',
      level: 'yuqori',
      downloadCount: 756,
      fileSize: '3.2 MB',
      icon: 'pi pi-chart-line'
    },
    {
      id: 4,
      title: 'Kombinatorika va Ehtimollar',
      description: 'Kombinatorika asoslari, ehtimollar nazariyasi va statistik hisoblashlar bo\'yicha amaliy qo\'llanma.',
      category: 'ehtimollar',
      level: 'orta',
      downloadCount: 642,
      fileSize: '2.1 MB',
      icon: 'pi pi-percentage'
    },
    {
      id: 5,
      title: 'Graflar Nazariyasi',
      description: 'Diskret matematikaning muhim bo\'limi - graflar nazariyasi. Algoritm va dasturlash masalalari.',
      category: 'diskret',
      level: 'ilgor',
      downloadCount: 423,
      fileSize: '2.8 MB',
      icon: 'pi pi-sitemap'
    },
    {
      id: 6,
      title: 'Kvadrat Tenglamalar',
      description: 'Kvadrat tenglamalar va ularning yechimlari. Diskriminant, Vieta teoremalari va amaliy qo\'llanish.',
      category: 'algebra',
      level: 'boshlangich',
      downloadCount: 1456,
      fileSize: '1.5 MB',
      icon: 'pi pi-calculator'
    }
  ];

  get filteredMaterials(): Material[] {
    return this.materials.filter(material => {
      const matchesSearch = !this.searchTerm || 
        material.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        material.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesCategory = !this.selectedCategory || material.category === this.selectedCategory;
      const matchesLevel = !this.selectedLevel || material.level === this.selectedLevel;
      
      return matchesSearch && matchesCategory && matchesLevel;
    });
  }
}