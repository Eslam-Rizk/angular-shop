// src/main.server.ts

import { enableProdMode, inject } from "@angular/core"; // Import 'inject'
import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { config } from "./app/app.config.server";
// No need to import provideHttpClient here, as inject() will resolve it
import { lastValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http"; // Still need to import HttpClient type

// if (import.meta.env.PROD) {
//   enableProdMode(); // Uncomment this for production builds
// }

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;

// Define the getPrerenderParams function for the 'product/:id' route
export function getPrerenderParams() {
  // Use the inject function to get the HttpClient instance directly.
  // This works because getPrerenderParams runs within an Angular injection context
  // where HttpClient is already provided by app.config.server.ts.
  const httpClient = inject(HttpClient);

  // Fetch all product IDs from your API
  // Assuming fakestoreapi.com/products returns an array of product objects with an 'id'
  return lastValueFrom(
    httpClient.get<any[]>("https://fakestoreapi.com/products"),
  )
    .then((products) => {
      // Map the products to an array of objects, each containing the 'id' parameter.
      // The 'id' property name must match the parameter name in your route definition (e.g., 'product/:id').
      return products.map((product) => ({ id: product.id.toString() }));
    })
    .catch((error) => {
      console.error("Error fetching product IDs for prerendering:", error);
      return []; // Return an empty array to prevent build failure
    });
}
