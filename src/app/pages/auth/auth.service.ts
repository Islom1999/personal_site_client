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

  updateProfile(profile: { fullname: string; username?: string }) {
    return this.http.post<{ data: IUser }>(this.baseUrl + '/client/auth/profile', profile);
  }

  logout() {
    // Clear all stored data
    localStorage.clear();
    
    // Call backend logout
    this.http.post(this.baseUrl + '/client/auth/logout', {}).subscribe({
      next: () => {
        window.location.href = '/';
      },
      error: () => {
        window.location.href = '/';
      }
    });
  }
}
