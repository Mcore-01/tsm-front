import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {TokenInterceptor} from "./interceptors/token.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
 // providers: [provideRouter(routes)]
  providers: [provideRouter(routes), { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }, provideAnimations(), provideAnimationsAsync(), provideAnimationsAsync()]
};
