import { Injectable } from '@angular/core';
import { BaseService } from '../../core/base/base.service';
import { ISpMaterials } from '../models/sp-materials.model';

@Injectable({
  providedIn: 'root',
})
export class SpMaterialsService extends BaseService<ISpMaterials> {
  constructor() {
    super('client/sp-materials');
  }
}
