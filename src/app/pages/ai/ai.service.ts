import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AIService {
  http = inject(HttpClient);
  baseUrl: string = environment.apiBaseUrl;

  sendMsgAI(message: string) {
    return this.http.post<{
      assistant: string; message: string
}>(`${this.baseUrl}/client/chat/send`, {
      content: message,
    });
  }

  getHistory(limit: string, page: string) {
    return this.http.get(`${this.baseUrl}/client/chat/history?limit=${limit}&page=${page}`);
  }

  deleteChat() {
    return this.http.delete(`${this.baseUrl}/client/chat/messeges`);
  }
}
