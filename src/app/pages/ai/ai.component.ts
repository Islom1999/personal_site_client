import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AIService } from './ai.service';
import { Button } from 'primeng/button';
import { MarkdownModule } from 'ngx-markdown';

interface Message {
  role: 'user' | 'bot';
  content: string;
  time: string;
}

@Component({
  selector: 'app-ai',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    Button,
    MarkdownModule,
],
  templateUrl: './ai.component.html',
  styleUrl: './ai.component.css',
})
export class AiComponent {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  aiMsg = '';
  messages: Message[] = [];
  isSending = false;
  errorMessage = '';
  limit = '20';
  page = '1';
  showScrollButton = false;
  aiResponse = '';
  isTyping = false;

  constructor(private aiService: AIService, private cdr: ChangeDetectorRef) {
    this.messages.push({
      role: 'bot',
      content:
        'Salom! Men AI yordamchiman. Sizning savollaringizga javob berishga tayyorman. Qanday yordam kerak?',
      time: this.getCurrentTime(),
    });
  }

  get isDisabled(): boolean {
    return !this.aiMsg.trim() || this.isSending;
  }

  getCurrentTime(): string {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  simulateTypingEffect(fullText: string) {
    this.isTyping = true;
    this.aiResponse = '';

    let i = 0;
    const interval = setInterval(() => {
      this.aiResponse += fullText[i];
      i++;

      if (i >= fullText.length) {
        clearInterval(interval);
        this.isTyping = false;
      }
    }, 30);
  }

  // sendMsg(message: string) {
  //   if (!message.trim()) {
  //     this.errorMessage = "Ma'lumot kiriting";
  //     return;
  //   }

  //   this.isSending = true;
  //   this.errorMessage = '';

  //   // Foydalanuvchi xabari
  //   this.messages.push({
  //     role: 'user',
  //     content: message,
  //     time: this.getCurrentTime(),
  //   });
  //   this.aiMsg = '';
  //   this.scrollToBottom();

  //   this.aiService.sendMsgAI(message).subscribe({
  //     next: (res) => {
  //       const fullText = res.assistant || '';
  //       let displayedText = '';
  //       let i = 0;

  //       // avval bo‘sh bot xabarini qo‘shamiz
  //       this.messages.push({
  //         role: 'bot',
  //         content: '',
  //         time: this.getCurrentTime(),
  //       });

  //       const typingInterval = setInterval(() => {
  //         displayedText += fullText[i];
  //         i++;

  //         this.messages[this.messages.length - 1].content = displayedText; // oxirgi bot xabarni yangilaymiz

  //         this.scrollToBottom();
  //         this.cdr.detectChanges(); // UI ni yangilaydi

  //         if (i >= fullText.length) {
  //           clearInterval(typingInterval);
  //           this.isSending = false;
  //           this.scrollToBottom();
  //         }
  //       }, 25); // typing tezligi
  //     },
  //     error: (err) => {
  //       console.error(err);
  //       this.isSending = false;
  //       this.errorMessage = 'Xatolik yuz berdi';
  //       this.cdr.markForCheck();
  //     },
  //   });
  // }

  sendMsg(message: string) {
    if (!message.trim()) {
      this.errorMessage = "Ma'lumot kiriting";
      return;
    }

    this.isSending = true;
    this.errorMessage = '';

    this.messages.push({
      role: 'user',
      content: message,
      time: this.getCurrentTime(),
    });
    this.aiMsg = '';
    this.scrollToBottom();

    this.messages.push({
      role: 'bot',
      content: '...',
      time: this.getCurrentTime(),
    });
    this.scrollToBottom();

    this.aiService.sendMsgAI(message).subscribe({
      next: (res) => {
        const fullText = res.assistant || '';
        let displayedText = '';
        let i = 0;

        const typingInterval = setInterval(() => {
          displayedText += fullText[i];
          i++;

          this.messages[this.messages.length - 1].content = displayedText;

          this.scrollToBottom();
          this.cdr.detectChanges();

          if (i >= fullText.length) {
            clearInterval(typingInterval);
            this.isSending = false;
            this.scrollToBottom();
          }
        }, 25);
      },
      error: (err) => {
        console.error(err);
        this.isSending = false;
        this.messages[this.messages.length - 1].content = 'Xatolik yuz berdi';
        this.cdr.detectChanges();
      },
    });
  }

  ngOnInit() {
    this.aiHistory();
  }

  aiHistory() {
    this.aiService.getHistory(this.limit, this.page).subscribe({
      next: (res: any) => {
        if (res.items.length > 0) {
          this.messages = res.items.map((msg: any) => ({
            ...msg,
            role: msg.role === 'premium_ai' ? 'bot' : 'user',
            time: new Date(msg.createdAt).toLocaleTimeString('uz-UZ', {
              hour: '2-digit',
              minute: '2-digit',
            }),
          }));
        } else {
          // History bo'lmasa default xabarni qo'shamiz
          this.messages = [
            {
              role: 'bot',
              content:
                'Salom! Men AI yordamchiman. Sizning savollaringizga javob berishga tayyorman. Qanday yordam kerak?',
              time: this.getCurrentTime(),
            },
          ];
        }
      },
      error: (err) => {
        console.error('Historyni olishda xato:', err);
        // Xatolik bo'lsa ham default xabar
        this.messages = [
          {
            role: 'bot',
            content:
              'Salom! Men AI yordamchiman. Sizning savollaringizga javob berishga tayyorman. Qanday yordam kerak?',
            time: this.getCurrentTime(),
          },
        ];
      },
    });
  }

  scrollToBottom(force = false) {
    const el = this.scrollContainer.nativeElement;

    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 150;
    if (isNearBottom || force) {
      setTimeout(() => {
        el.scrollTo({
          top: el.scrollHeight,
          behavior: 'smooth',
        });
      }, 50);
      this.showScrollButton = false;
    } else {
      this.showScrollButton = true;
    }
  }

  onScroll(event: Event) {
    const el = event.target as HTMLElement;
    const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100;
    this.showScrollButton = !isAtBottom;
  }

  isDeleting = false;

  onDeleteChat() {
    if (this.messages.length > 0) {
      if (!confirm('Chatni butunlay o‘chirishni istaysizmi?')) return;

      this.isDeleting = true;

      this.aiService.deleteChat().subscribe({
        next: () => {
          this.messages = [];

          this.messages.push({
            role: 'bot',
            content:
              'Salom! Men AI yordamchiman. Sizning savollaringizga javob berishga tayyorman. Qanday yordam kerak?',
            time: this.getCurrentTime(),
          });

          this.isDeleting = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('O‘chirishda xato:', err);
          this.isDeleting = false;
        },
      });
    }
  }
}
