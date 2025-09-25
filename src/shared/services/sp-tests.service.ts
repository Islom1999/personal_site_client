import { Injectable } from '@angular/core';
import { BaseService } from '../../core/base/base.service';
import { IClientResult, ISpTests } from '../models/sp-tests.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpTestsService extends BaseService<ISpTests> {
  constructor() {
    super('client/sp-tests');
  }

  submitTestResult(testResult: any): Observable<IClientResult> {
    return this.http.post<IClientResult>(`${this.fullUrl}/check`, testResult);
  }
}
