import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
// import { AuthService } from '../../auth/common/auth.service';

// export const errorInterceptor: HttpInterceptorFn = (req, next) => {
//   const router = inject(Router);

//   return next(req).pipe(
//     catchError((error: HttpErrorResponse) => {
//       if (error.status === 401 || error.status === 405) {
//         inject(AuthService).openAuth();
//       } else {
//       }
//       return throwError(() => error);
//     })
//   );
// };
