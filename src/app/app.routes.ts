import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { SettingsComponent } from "./pages/settings/settings.component";
import { AboutComponent } from "./pages/about/about.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { ProductDetailsComponent } from "./pages/product-details/product-details.component";
import { ProductsPageComponent } from "./pages/products-page/products-page.component";

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
    component: ProductsPageComponent,
    title: "Products",
  },
  {
    path: "product/:id",
    component: ProductDetailsComponent,
    title: "Product Details",
  },
  {
    path: "profile",
    component: ProfileComponent,
    title: "Profile",
  },
  {
    path: "settings",
    component: SettingsComponent,
    title: "Settings",
  },
  {
    path: "about",
    component: AboutComponent,
    title: "About",
  },
  {
    path: "**",
    component: NotFoundComponent,
    title: "Not Found",
  },
];
