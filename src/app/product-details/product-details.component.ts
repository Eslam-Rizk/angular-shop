import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for standalone components using common directives

@Component({
  selector: 'app-product-details',
  standalone: true, // Mark as standalone
  imports: [CommonModule], // Import CommonModule
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

}
