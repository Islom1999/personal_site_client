import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, TextareaModule, CardModule],
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  contactForm = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  };

  sendMessage() {
    // Xabar yuborish logikasi
    console.log('Xabar yuborildi:', this.contactForm);
    // Bu yerda backend API ga so'rov yuboriladi

    // Demo uchun muvaffaqiyat xabari
    alert("Xabaringiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog'lanamiz.");

    // Formani tozalash
    this.contactForm = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    };
  }
}
