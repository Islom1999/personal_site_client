import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'materials',
    loadComponent: () =>
      import('./pages/materials/materials.component').then((m) => m.MaterialsComponent),
  },
  {
    path: 'courses',
    loadComponent: () =>
      import('./pages/courses/courses.component').then((m) => m.CoursesComponent),
  },
  {
    path: 'courses/:id',
    loadComponent: () =>
      import('./pages/courses/course-read/course-read.component').then(
        (m) => m.CourseReadComponent
      ),
  },
  {
    path: 'tests',
    loadComponent: () => import('./pages/tests/tests.component').then((m) => m.TestsComponent),
  },
  {
    path: 'tests/:id',
    loadComponent: () =>
      import('./pages/tests/test-work/test-work.component').then((m) => m.TestWorkComponent),
  },
  {
    path: 'ai',
    loadComponent: () => import('./pages/ai/ai.component').then((m) => m.AiComponent),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact.component').then((m) => m.ContactComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.component').then((m) => m.ProfileComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
