import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductsComponent } from "../../components/products/products.component";
import { ProductService } from "../../services/product.service";

@Component({
  selector: "app-home",
  imports: [ProductsComponent, CommonModule],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
  standalone: true,
})
export class HomeComponent implements OnInit {
  allProducts: any[] = [];
  topProducts: any[] = [];
  previewProducts: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (productsData) => {
        this.allProducts = productsData;
        console.log("HomeComponent fetched all products:", this.allProducts);

        this.previewProducts = productsData.slice(0, 3);
        console.log(
          "HomeComponent calculated preview products:",
          this.previewProducts,
        );

        this.topProducts = productsData
          .sort((a, b) => b.rating.rate - a.rating.rate)
          .slice(0, 3);
        console.log("HomeComponent calculated top products:", this.topProducts);
      },
      error: (err) => {
        console.error("Error fetching products in HomeComponent:", err);
      },
    });
  }
}
