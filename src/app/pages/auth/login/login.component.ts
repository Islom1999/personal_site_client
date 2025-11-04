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

  constructor(
    private router: Router,
    private authService: AuthService,
    private uzPhonePipe: UzPhonePipe,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

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
            this.authService.loginSuccess(); // login muvaffaqiyatli bo‘lganda
            this.loading = false;
          },
          error: (err) => {
            this.errorMessage = 'SMS kod noto‘g‘ri';
            this.loading = false;
          },
        });
    }
  }
}
