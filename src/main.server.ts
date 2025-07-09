// import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
// import { config } from './app/app.config.server';

// const bootstrap = () => bootstrapApplication(AppComponent, config);

// export default bootstrap;
// src/main.server.ts

import { enableProdMode, inject } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { config } from "./app/app.config.server";
import { provideHttpClient } from "@angular/common/http"; // Import provideHttpClient
import { lastValueFrom } from "rxjs"; // Import lastValueFrom
import { HttpClient } from "@angular/common/http"; // Import HttpClient

// if (import.meta.env.PROD) {
//   enableProdMode();
// }
const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;

// Define the getPrerenderParams function for the 'product/:id' route
export function getPrerenderParams() {
  // We need an injector to get HttpClient
  const injector = config.providers.find(
    (p) =>
      typeof p === "object" &&
      "provide" in p &&
      p.provide === provideHttpClient,
  );

  if (!injector) {
    console.error(
      "HttpClient provider not found in app.config.server.ts providers.",
    );
    return Promise.resolve([]);
  }

  // Create a temporary HttpClient instance
  // Note: This is a simplified example. In a real app, you might have a dedicated
  // data service for fetching product IDs.
  const httpClient = inject(HttpClient);

  // Fetch all product IDs from your API
  // Assuming fakestoreapi.com/products returns an array of product objects with an 'id'
  return lastValueFrom(
    httpClient.get<any[]>("https://fakestoreapi.com/products"),
  )
    .then((products) => {
      // Map the products to an array of objects, each containing the 'id' parameter
      return products.map((product) => ({ id: product.id.toString() }));
    })
    .catch((error) => {
      console.error("Error fetching product IDs for prerendering:", error);
      return []; // Return an empty array to prevent build failure
    });
}
