import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

interface TestResult {
  sp_tests_id: any;
  id: number;
  testName: string;
  score: number;
  maxScore: number;
  percentage: number;
  date: Date;
  category: string;
  attempts: number;
}

export class ProfileService {
  http = inject(HttpClient);
  baseUrl: string = environment.apiBaseUrl;

  constructor(http: HttpClient) {
    this.http = http;
  }

  myTestResults() {
    return this.http.get<TestResult[]>(`${this.baseUrl}/client/sp-tests/results/my`);
  }

  getTestIDetails(id: string) {
    return this.http.get<TestResult>(`${this.baseUrl}/client/sp-tests/${id}`);
  }
}
