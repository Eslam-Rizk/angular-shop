import { Component, Input, OnInit } from "@angular/core";
import { ProductCardComponent } from "../product-card/product-card.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-products",
  imports: [ProductCardComponent, CommonModule],
  templateUrl: "./products.component.html",
  styleUrl: "./products.component.css",
  standalone: true,
})
export class ProductsComponent implements OnInit {
  @Input() products: any[] = [];
  constructor() {}
  ngOnInit(): void {
    console.log("ProductsComponent received products:", this.products);
  }
}
