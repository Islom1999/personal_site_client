import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideHttpClient } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';
import { importProvidersFrom } from '@angular/core';
import { appConfig } from './app/app.config';

bootstrapApplication(App, {
  ...appConfig, // avvalgi config
  providers: [
    ...(appConfig.providers || []),
    provideHttpClient(),
    importProvidersFrom(
      MarkdownModule.forRoot()
    ),
  ],
}).catch((err) => console.error(err));
