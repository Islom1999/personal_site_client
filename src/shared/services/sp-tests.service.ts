import { Injectable } from '@angular/core';
import { BaseService } from '../../core/base/base.service';
import { ISpTests } from '../models/sp-tests.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpTestsService extends BaseService<ISpTests> {
  constructor() {
    super('client/sp-tests');
  }

  submitTestResult(testResult: any): Observable<any> {
    return this.http.post(`${this.fullUrl}/result`, testResult);
  }

}
