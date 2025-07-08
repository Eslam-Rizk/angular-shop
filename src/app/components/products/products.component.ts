import { Component } from "@angular/core";
import { CommonModule } from '@angular/common'; // Required for standalone components using common directives

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

@Component({
  selector: "app-products",
  standalone: true, // Mark as standalone
  imports: [CommonModule], // Import CommonModule
  templateUrl: "./products.component.html",
  styleUrl: "./products.component.css",
})
export class ProductsComponent {
  products: Product[] = [
    {
      id: 1,
      name: "Product 1",
      price: 100,
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      description: "This is product 1",
    },
    {
      id: 2,
      name: "Product 2",
      price: 200,
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      description: "This is product 2",
    },
    {
      id: 3,
      name: "Product 3",
      price: 300,
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      description: "This is product 3",
    },
    {
      id: 4,
      name: "Product 4",
      price: 400,
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      description: "This is product 4",
    },
    {
      id: 5,
      name: "Product 5",
      price: 500,
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      description: "This is product 5",
    },
    {
      id: 6,
      name: "Product 6",
      price: 600,
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      description: "This is product 6",
    },
  ];
}
