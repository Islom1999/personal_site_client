import { Injectable } from '@angular/core';
import { BaseService } from '../../core/base/base.service';
import { ISpLevel } from '../models/sp-level.model';

@Injectable({
  providedIn: 'root',
})
export class SpLevelService extends BaseService<ISpLevel> {
  constructor() {
    super('client/sp-level');
  }
}
