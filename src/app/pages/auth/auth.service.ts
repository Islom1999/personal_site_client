import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { IRootTokenRes, IUser } from './user.model';
import { map, Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  baseUrl: string = environment.apiBaseUrl;

  requestSmsCode(phone: string) {
    return this.http
      .post<{ message: string }>(`${this.baseUrl}/client/auth/login/phone`, { phone })
      .pipe(
        catchError((error) => {
          console.error('Login phone error:', error);
          return throwError(() => error);
        })
      );
  }

  verifySmsCode(phone: string, code: string) {
    return this.http
      .post<IRootTokenRes>(`${this.baseUrl}/client/auth/login/phone/verify`, {
        phone,
        code,
      })
      .pipe(
        catchError((error) => {
          console.error('Login phone error:', error);
          return throwError(() => error);
        })
      );
  }

  signInGoogle(credentials: { google_token: string }) {
    return this.http.post<IRootTokenRes>(this.baseUrl + '/client/auth/google', credentials).pipe(
      catchError((error) => {
        console.error('Google sign-in error:', error);
        return throwError(() => error);
      })
    );
  }

  loadProfile(): Observable<IUser> {
    return this.http.get<{ data: IUser }>(`${this.baseUrl}/client/auth/profile`).pipe(
      map((user) => {
        return user.data;
      })
    );
  }

  updateProfile(fullname?: string, file_image_id?: string) {
    return this.http.post<{ data: IUser }>(`${this.baseUrl}/client/auth/profile`, {
      fullname,
      file_image_id,
    });
  }

  logout() {
    localStorage.clear();

    this.http.post(`${this.baseUrl}/client/auth/logout`, {}).subscribe({
      next: () => {
        window.location.href = '/home';
      },
      error: () => {
        window.location.href = '/';
      },
    });
  }

  // auth.service.ts
  uploadImg(formData: FormData) {
    return this.http.post<{
      id: any;
      message: string;
      user?: IUser;
    }>(`${this.baseUrl}/client/auth/profile/upload/image`, formData);
  }
}
