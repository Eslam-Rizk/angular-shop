import { Component } from "@angular/core";
import { CommonModule } from '@angular/common'; // Required for standalone components using common directives

interface Category {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: "app-categories",
  standalone: true, // Mark as standalone
  imports: [CommonModule], // Import CommonModule
  templateUrl: "./categories.component.html",
  styleUrl: "./categories.component.css",
})
export class CategoriesComponent {
  categories: Category[] = [
    { id: 1, name: "Electronics", description: "All electronics products" },
    { id: 2, name: "Clothing", description: "All clothing products" },
    {
      id: 3,
      name: "Home & Kitchen",
      description: "All home and kitchen products",
    },
  ];
}
