import { ResolveFn } from '@angular/router';

export const cartResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
