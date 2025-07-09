import { Component, OnInit } from "@angular/core";
import { ProductsComponent } from "../../components/products/products.component";
import { CategoriesComponent } from "../../components/categories/categories.component";
import { ProductService } from "../../services/product.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-products-page",
  imports: [ProductsComponent, CategoriesComponent, CommonModule],
  templateUrl: "./products-page.component.html",
  styleUrl: "./products-page.component.css",
  standalone: true,
})
export class ProductsPageComponent implements OnInit {
  allProducts: any[] = [];
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (productsData) => {
        this.allProducts = productsData;
        console.log(
          "ProductsPageComponent fetched all products:",
          this.allProducts,
        );
      },
      error: (err) => {
        console.error("Error fetching products in ProductsPageComponent:", err);
      },
    });
  }
}
