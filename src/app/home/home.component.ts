import { Component } from "@angular/core";
import { ProductsComponent } from "../components/products/products.component";
import { CategoriesComponent } from "../components/categories/categories.component";
import { CommonModule } from '@angular/common'; // Required for standalone components using common directives

@Component({
  selector: "app-home",
  standalone: true, // Mark as standalone
  imports: [CommonModule, ProductsComponent, CategoriesComponent], // Import standalone components
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent {}
