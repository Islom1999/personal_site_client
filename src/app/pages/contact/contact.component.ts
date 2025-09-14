import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, InputTextareaModule, CardModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">Biz bilan bog'laning</h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Savollaringiz bormi? Shaxsiy darslar yoki kurslar haqida ma'lumot olishni xohlaysizmi? 
            Biz bilan bog'laning va professional yordam oling
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- Contact Form -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-2xl shadow-lg p-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Xabar yuborish</h2>
              
              <form class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="flex flex-col">
                    <label class="text-sm font-medium text-gray-700 mb-2">Ism *</label>
                    <input 
                      type="text" 
                      pInputText 
                      placeholder="Ismingizni kiriting"
                      [(ngModel)]="contactForm.firstName"
                      name="firstName"
                      class="w-full" />
                  </div>
                  <div class="flex flex-col">
                    <label class="text-sm font-medium text-gray-700 mb-2">Familiya *</label>
                    <input 
                      type="text" 
                      pInputText 
                      placeholder="Familiyangizni kiriting"
                      [(ngModel)]="contactForm.lastName"
                      name="lastName"
                      class="w-full" />
                  </div>
                </div>

                <div class="flex flex-col">
                  <label class="text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input 
                    type="email" 
                    pInputText 
                    placeholder="email@example.com"
                    [(ngModel)]="contactForm.email"
                    name="email"
                    class="w-full" />
                </div>

                <div class="flex flex-col">
                  <label class="text-sm font-medium text-gray-700 mb-2">Telefon raqami</label>
                  <input 
                    type="tel" 
                    pInputText 
                    placeholder="+998 90 123 45 67"
                    [(ngModel)]="contactForm.phone"
                    name="phone"
                    class="w-full" />
                </div>

                <div class="flex flex-col">
                  <label class="text-sm font-medium text-gray-700 mb-2">Mavzu *</label>
                  <input 
                    type="text" 
                    pInputText 
                    placeholder="Xabar mavzusi"
                    [(ngModel)]="contactForm.subject"
                    name="subject"
                    class="w-full" />
                </div>

                <div class="flex flex-col">
                  <label class="text-sm font-medium text-gray-700 mb-2">Xabar *</label>
                  <textarea 
                    pInputTextarea 
                    rows="6"
                    placeholder="Xabaringizni yozing..."
                    [(ngModel)]="contactForm.message"
                    name="message"
                    class="w-full resize-none">
                  </textarea>
                </div>

                <p-button 
                  label="Xabar yuborish" 
                  icon="pi pi-send"
                  class="w-full btn-primary"
                  (onClick)="sendMessage()">
                </p-button>
              </form>
            </div>
          </div>

          <!-- Contact Info -->
          <div class="space-y-8">
            <!-- Contact Details -->
            <div class="bg-white rounded-2xl shadow-lg p-8">
              <h3 class="text-xl font-bold text-gray-900 mb-6">Aloqa ma'lumotlari</h3>
              
              <div class="space-y-6">
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i class="pi pi-phone text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-1">Telefon</h4>
                    <p class="text-gray-600">+998 90 123 45 67</p>
                    <p class="text-gray-600">+998 71 234 56 78</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i class="pi pi-envelope text-green-600 text-xl"></i>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-1">Email</h4>
                    <p class="text-gray-600">info@matematik.uz</p>
                    <p class="text-gray-600">prof.matematik@gmail.com</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i class="pi pi-map-marker text-purple-600 text-xl"></i>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-1">Manzil</h4>
                    <p class="text-gray-600">Toshkent shahri</p>
                    <p class="text-gray-600">Chilonzor tumani</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i class="pi pi-clock text-orange-600 text-xl"></i>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-1">Ish vaqti</h4>
                    <p class="text-gray-600">Dushanba - Juma: 9:00 - 18:00</p>
                    <p class="text-gray-600">Shanba: 10:00 - 16:00</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Social Media -->
            <div class="bg-white rounded-2xl shadow-lg p-8">
              <h3 class="text-xl font-bold text-gray-900 mb-6">Ijtimoiy tarmoqlar</h3>
              
              <div class="space-y-4">
                <a href="#" class="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group">
                  <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                    <i class="pi pi-telegram text-blue-600 text-lg"></i>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900">Telegram</h4>
                    <p class="text-gray-600 text-sm">@matematik_prof</p>
                  </div>
                </a>

                <a href="#" class="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group">
                  <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors duration-200">
                    <i class="pi pi-youtube text-red-600 text-lg"></i>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900">YouTube</h4>
                    <p class="text-gray-600 text-sm">Matematik Darslar</p>
                  </div>
                </a>

                <a href="#" class="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group">
                  <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                    <i class="pi pi-facebook text-blue-600 text-lg"></i>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900">Facebook</h4>
                    <p class="text-gray-600 text-sm">Prof Matematik</p>
                  </div>
                </a>

                <a href="#" class="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group">
                  <div class="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center group-hover:bg-pink-200 transition-colors duration-200">
                    <i class="pi pi-instagram text-pink-600 text-lg"></i>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900">Instagram</h4>
                    <p class="text-gray-600 text-sm">@matematik_prof</p>
                  </div>
                </a>
              </div>
            </div>

            <!-- Quick Contact -->
            <div class="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
              <h3 class="text-xl font-bold mb-4">Tezkor aloqa</h3>
              <p class="text-blue-100 mb-6">
                Shaxsiy darslar yoki kurslar haqida tezkor ma'lumot olish uchun to'g'ridan-to'g'ri qo'ng'iroq qiling
              </p>
              <p-button 
                label="Qo'ng'iroq qilish" 
                icon="pi pi-phone"
                class="bg-white text-blue-600 hover:bg-gray-100 font-semibold">
              </p-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ContactComponent {
  contactForm = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  sendMessage() {
    // Xabar yuborish logikasi
    console.log('Xabar yuborildi:', this.contactForm);
    // Bu yerda backend API ga so'rov yuboriladi
    
    // Demo uchun muvaffaqiyat xabari
    alert('Xabaringiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog\'lanamiz.');
    
    // Formani tozalash
    this.contactForm = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    };
  }
}