import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PaginatedResult, QueryDTO } from './base.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService<T> {
  http = inject(HttpClient);
  baseUrl: string = environment.apiBaseUrl;
  protected fullUrl: string;

  constructor(protected url: string) {
    this.fullUrl = `${this.baseUrl}/${url}`;
  }

  getAll() {
    return this.http.get<T[]>(`${this.fullUrl}`);
  }

  getAllPagination(queryDTO: QueryDTO & Partial<T>) {
    let params = new HttpParams()
      .set('page', queryDTO?.page || 1)
      .set('limit', queryDTO?.limit || 10);

    Object.keys(queryDTO).forEach((key) => {
      const value = queryDTO[key as keyof typeof queryDTO];
      if (value !== undefined && value !== null && value !== '' && value !== 0) {
        params = params.set(key, String(value));
      }
    });

    return this.http.get<PaginatedResult<T>>(`${this.fullUrl}/pagination`, {
      params,
    });
  }

  getById(id: string) {
    return this.http.get<T>(`${this.fullUrl}/${id}`);
  }
}
