import { Injectable } from '@angular/core';
import { BaseService } from '../../core/base/base.service';
import { ISpCategory } from '../models/sp-category.model';

@Injectable({
  providedIn: 'root',
})
export class SpCategoryService extends BaseService<ISpCategory> {
  constructor() {
    super('client/sp-category');
  }
}
