import { Injectable } from '@angular/core';
import { BaseService } from '../../core/base/base.service';
import { ISpCourses } from '../models/sp-courses.model';

@Injectable({
  providedIn: 'root',
})
export class SpCoursesService extends BaseService<ISpCourses> {
  constructor() {
    super('client/sp-courses');
  }
}
