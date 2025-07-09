import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { SettingsComponent } from "./settings/settings.component";
import { AboutComponent } from "./about/about.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";
import { ProductsPageComponent } from "./products-page/products-page.component";

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
