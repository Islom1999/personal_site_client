import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { AuthService } from '../auth.service';
import { UzPhonePipe } from './uz-phone.pipe';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    CardModule,
    MessageModule,
  ],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  loginForm = {
    phone: '',
    smsCode: '',
  };

  showSmsCode = false;
  loading = false;
  submitted = false;
  errorMessage = '';
  googleLoading = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private uzPhonePipe: UzPhonePipe,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loginWithGoogle();
  }

  formatPhone(value: string) {
    this.loginForm.phone = this.uzPhonePipe.transform(value, true);
  }

  formatPhoneForApi(phone: string): string {
    if (!phone) return '';
    let digits = phone.replace(/\D+/g, '');
    if (digits.length === 12 && digits.startsWith('998')) {
      digits = digits.slice(3);
    } else if (digits.length === 10 && digits.startsWith('0')) {
      digits = digits.slice(1);
    }
    return digits;
  }

  login() {
    this.submitted = true;
    this.errorMessage = '';

    if (!this.showSmsCode) {
      if (!this.loginForm.phone) {
        this.errorMessage = 'Telefon raqamni kiriting';
        return;
      }
      this.loading = true;
      // send sms code
      this.authService.requestSmsCode(this.formatPhoneForApi(this.loginForm.phone)).subscribe({
        next: (res) => {
          this.showSmsCode = true;
          this.loading = false;
          this.cdr.markForCheck();
        },
        error: (err) => {
          this.loading = false;
          let msg = err.error?.message || 'Xato yuz berdi';
          if (
            msg === 'Telegram botimizga start bosmagansiz. Iltimos telegram botimizga start bosing'
          ) {
            msg =
              'Telegram botimizga start bosmagansiz. Iltimos telegram botimizga start bosing @techno_teach_bot';
          }
          this.errorMessage = msg;
          this.cdr.markForCheck();
          console.log(err.error.message, 'error');
        },
      });
    } else {
      // get sms code
      if (!this.loginForm.smsCode) {
        this.errorMessage = 'SMS kod kiriting';
        return;
      }
      this.authService
        .verifySmsCode(this.formatPhoneForApi(this.loginForm.phone), this.loginForm.smsCode)
        .subscribe({
          next: (res) => {
            localStorage.setItem('accessToken', res.data.access_token);
            localStorage.setItem('refreshToken', res.data.refresh_token);
            this.router.navigate(['/profile']);
            this.loading = false;
          },
          error: (err) => {
            this.errorMessage = 'SMS kod noto‘g‘ri';
            this.loading = false;
          },
        });
    }
  }

  loginWithGoogle() {
    this.googleLoading = true;
    this.errorMessage = '';

    // Google OAuth2 login
    this.initializeGoogleAuth()
      .then(() => {
        this.signInWithGoogle();
      })
      .catch((error) => {
        console.error('Google Auth initialization failed:', error);
        this.errorMessage = "Google Auth yuklanmadi. Qaytadan urinib ko'ring.";
        this.googleLoading = false;
      });
  }

  private async initializeGoogleAuth(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof window.google !== 'undefined' && window.google.accounts) {
        resolve();
        return;
      }

      // Load Google Identity Services script
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        window.google.accounts.id.initialize({
          client_id: '300407407088-jb0laf59g4o58faclgktp83akj6f4f72.apps.googleusercontent.com', // Replace with your actual client ID
          callback: this.handleGoogleResponse.bind(this),
        });
        resolve();
      };
      script.onerror = () => reject(new Error('Failed to load Google Identity Services'));
      document.head.appendChild(script);
    });
  }

  private signInWithGoogle(): void {
    window.google.accounts.id.prompt((notification: any) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        // Fallback to popup
        window.google.accounts.id.renderButton(
          document.getElementById('google-signin-button') || document.body,
          {
            theme: 'outline',
            size: 'large',
            width: '100%',
          }
        );
      }
    });
  }

  private handleGoogleResponse(response: any): void {
    if (response.credential) {
      // Send token to backend
      this.authService.signInGoogle({ google_token: response.credential }).subscribe({
        next: (result) => {
          // Save tokens to localStorage
          if (result.data.access_token) {
            localStorage.setItem('accessToken', result.data.access_token);
          }
          if (result.data.refresh_token) {
            localStorage.setItem('refreshToken', result.data.refresh_token);
          }

          // Save user data to localStorage
          if (result.data.user) {
            localStorage.setItem('currentUser', JSON.stringify(result.data.user));
          }

          this.googleLoading = false;
          this.router.navigate(['/profile']);
        },
        error: (error) => {
          console.error('Google login failed:', error);
          this.errorMessage = "Google orqali kirish muvaffaqiyatsiz. Qaytadan urinib ko'ring.";
          this.googleLoading = false;
        },
      });
    } else {
      this.errorMessage = 'Google token olinmadi';
      this.googleLoading = false;
    }
  }
}
