import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
// import { Product } from "../types/product"; // Assuming your Product type is here
import { CommonModule } from "@angular/common"; // For ngIf
import { ProductService } from "../services/product.service";
// import { products } from "../../db";
import { HttpClientModule } from "@angular/common/http";

@Component({
  selector: "app-product-details",
  standalone: true, // Assuming it's a standalone component
  imports: [CommonModule, RouterModule, CommonModule, HttpClientModule], // Include CommonModule for *ngIf
  templateUrl: "./product-details.component.html",
  styleUrl: "./product-details.component.css",
})
export class ProductDetailsComponent implements OnInit {
  product: any = {}; // To hold the fetched product details

  // Mock product data (you'll likely replace this with a service call)
  private allProducts: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    // Get the 'id' from the route parameters
    const productId = Number(this.route.snapshot.paramMap.get("id"));

    // Fetch product details using the service
    this.productService.getProductById(productId).subscribe({
      next: (product) => {
        this.product = product;
      },
      error: (error) => {
        console.error("Error fetching product details:", error);
      },
    });
  }
}
