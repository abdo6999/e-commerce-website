import { APP_INITIALIZER } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

export function appInitializer(authService: AuthService) {
  return () => {
    const isLoggedIn$ = authService.isLoggedIn();
    return lastValueFrom(isLoggedIn$)
  };
}



export const appInitializerProviders = [
  {
    provide: APP_INITIALIZER,
    useFactory: appInitializer,
    multi: true,
    deps: [AuthService],
  },
];

