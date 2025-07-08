import { Component } from "@angular/core";
import { NavbarComponent } from "../components/navbar/navbar.component";
import { FooterComponent } from "../components/footer/footer.component";
import { ProductsComponent } from "../components/products/products.component";
import { CategoriesComponent } from "../components/categories/categories.component";

@Component({
  selector: "app-home",
  imports: [
    NavbarComponent,
    FooterComponent,
    ProductsComponent,
    CategoriesComponent,
  ],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent {}
