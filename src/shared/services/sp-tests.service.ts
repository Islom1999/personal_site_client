import { Injectable } from '@angular/core';
import { BaseService } from '../../core/base/base.service';
import { ISpTests } from '../models/sp-tests.model';

@Injectable({
  providedIn: 'root',
})
export class SpTestsService extends BaseService<ISpTests> {
  constructor() {
    super('client/sp-tests');
  }
}
