import { Component, OnInit } from "@angular/core";
import { Category } from "../../types/category";
import { CategoryService } from "../../services/category.service";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

@Component({
  selector: "app-categories",
  imports: [CommonModule, HttpClientModule],
  templateUrl: "./categories.component.html",
  styleUrl: "./categories.component.css",
  standalone: true,
})
export class CategoriesComponent {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        console.log("Categories loaded:", this.categories);
      },
      error: (error) => {
        console.error("Error fetching categories:", error);
      },
    });
  }
}
