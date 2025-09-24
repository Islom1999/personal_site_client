import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('accessToken');
  const clonedReq = req.clone({
    setHeaders: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return next(clonedReq);
};
