import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app-routing.module"; // Import routes from app-routing.module.ts
import {
  provideClientHydration,
  withEventReplay,
} from "@angular/platform-browser";
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from "@angular/common/http"; // Import HttpClientModule and provideHttpClient

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), // Use provideRouter with routes from app-routing.module.ts
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()), // Provide HttpClient
  ],
};
