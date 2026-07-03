import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  provideHttpClient,
  withInterceptorsFromDi,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';

import { routes } from './app.routes';
import { JwtInterceptor, LoadingInterceptor } from '@core/interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),

    provideHttpClient(
      withInterceptorsFromDi()
    ),

    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },

    importProvidersFrom(MatNativeDateModule)
  ]
};