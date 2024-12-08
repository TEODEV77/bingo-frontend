import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';
import { inject } from '@angular/core';
import { AuthStatus } from '../enums/auth-status.enum';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.authStatusComputed() === AuthStatus.authenticated){
    return true;
  }


  if(authService.authStatusComputed() === AuthStatus.checking){
    return false;
  }

  router.navigate(['/auth/login']);
  return false;

};
