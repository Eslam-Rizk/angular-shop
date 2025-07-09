import { RenderMode, ServerRoute } from "@angular/ssr";
import { getPrerenderParams as fetchProductPrerenderParams } from "../main.server";

export const serverRoutes: ServerRoute[] = [
  {
    path: "product/:id", // Explicitly define the dynamic route
    renderMode: RenderMode.Prerender,
    // Wrap the imported function in an arrow function to explicitly provide a function.
    // This ensures TypeScript sees a `() => Promise<...>` matching the expected signature.
    getPrerenderParams: () => fetchProductPrerenderParams(),
  },
  {
    path: "**",
    renderMode: RenderMode.Prerender,
  },
];
