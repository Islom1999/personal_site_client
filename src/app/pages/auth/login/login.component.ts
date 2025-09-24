import { ChangeDetectionStrategy, Component } from '@angular/core';
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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
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
export class LoginComponent {
  loginForm = {
    email: '',
    password: '',
    rememberMe: false,
  };

  loading = false;
  submitted = false;
  errorMessage = '';
  googleLoading = false;

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    this.submitted = true;
    this.errorMessage = '';

    if (!this.loginForm.email || !this.loginForm.password) {
      this.errorMessage = "Barcha maydonlarni to'ldiring";
      return;
    }

    this.loading = true;

    // Demo login - real implementation would call API
    setTimeout(() => {
      if (this.loginForm.email === 'demo@example.com' && this.loginForm.password === 'demo123') {
        const userData = {
          id: 1,
          name: 'Aziz Rahimov',
          email: 'demo@example.com',
          avatar:
            'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          joinDate: new Date('2023-01-15'),
          completedCourses: 3,
          totalTestScore: 87,
        };

        localStorage.setItem('currentUser', JSON.stringify(userData));
        this.router.navigate(['/profile']);
      } else {
        this.errorMessage = "Email yoki parol noto'g'ri";
      }
      this.loading = false;
    }, 1500);
  }

  loginWithGoogle() {
    this.googleLoading = true;
    this.errorMessage = '';

    // Google OAuth2 login
    this.initializeGoogleAuth().then(() => {
      this.signInWithGoogle();
    }).catch((error) => {
      console.error('Google Auth initialization failed:', error);
      this.errorMessage = 'Google Auth yuklanmadi. Qaytadan urinib ko\'ring.';
      this.googleLoading = false;
    });
  }

  private async initializeGoogleAuth(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof google !== 'undefined' && google.accounts) {
        resolve();
        return;
      }

      // Load Google Identity Services script
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        google.accounts.id.initialize({
          client_id: '1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com', // Replace with your actual client ID
          callback: this.handleGoogleResponse.bind(this)
        });
        resolve();
      };
      script.onerror = () => reject(new Error('Failed to load Google Identity Services'));
      document.head.appendChild(script);
    });
  }

  private signInWithGoogle(): void {
    google.accounts.id.prompt((notification: any) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        // Fallback to popup
        google.accounts.id.renderButton(
          document.getElementById('google-signin-button') || document.body,
          {
            theme: 'outline',
            size: 'large',
            width: '100%'
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
          // Save tokens
          localStorage.setItem('accessToken', result.data.access_token);
          localStorage.setItem('refreshToken', result.data.refresh_token);
          
          // Save user data
          localStorage.setItem('currentUser', JSON.stringify(result.data.user));
          
          this.googleLoading = false;
          this.router.navigate(['/profile']);
        },
        error: (error) => {
          console.error('Google login failed:', error);
          this.errorMessage = 'Google orqali kirish muvaffaqiyatsiz. Qaytadan urinib ko\'ring.';
          this.googleLoading = false;
        }
      });
    } else {
      this.errorMessage = 'Google token olinmadi';
      this.googleLoading = false;
    }
  }
}
