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

  constructor(private router: Router) {}

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
    // Demo Google login
    alert('Google login demo - haqiqiy loyihada Google OAuth ishlatiladi');
  }
}
