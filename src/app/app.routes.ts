import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    component: HomeComponent,
    title: "Home",
  },
  {
    path: "products",
    loadComponent: () =>
      import("./pages/products-page/products-page.component").then(
        (m) => m.ProductsPageComponent,
      ),
    title: "Products",
  },
  {
    path: "product/:id",
    loadComponent: () =>
      import("./pages/product-details/product-details.component").then(
        (m) => m.ProductDetailsComponent,
      ),
    title: "Product Details",
  },
  {
    path: "profile",
    loadComponent: () =>
      import("./pages/profile/profile.component").then(
        (m) => m.ProfileComponent,
      ),
    title: "Profile",
  },
  {
    path: "settings",
    loadComponent: () =>
      import("./pages/settings/settings.component").then(
        (m) => m.SettingsComponent,
      ),
    title: "Settings",
  },
  {
    path: "about",
    loadComponent: () =>
      import("./pages/about/about.component").then((m) => m.AboutComponent),
    title: "About",
  },
  {
    path: "**",
    loadComponent: () =>
      import("./pages/not-found/not-found.component").then(
        (m) => m.NotFoundComponent,
      ),
    title: "Not Found",
  },
];
