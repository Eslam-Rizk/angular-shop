import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ProductService } from "../../services/product.service";
import { HttpClientModule } from "@angular/common/http";

@Component({
  selector: "app-product-details",
  standalone: true,
  imports: [CommonModule, RouterModule, CommonModule, HttpClientModule],
  templateUrl: "./product-details.component.html",
  styleUrl: "./product-details.component.css",
})
export class ProductDetailsComponent implements OnInit {
  product: any = {};

  private allProducts: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get("id"));

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
