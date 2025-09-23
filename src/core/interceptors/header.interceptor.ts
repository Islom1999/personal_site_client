import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const clonedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  return next(clonedReq);
};
