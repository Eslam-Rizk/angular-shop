import { Component } from "@angular/core";

interface Category {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: "app-categories",
  imports: [],
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
