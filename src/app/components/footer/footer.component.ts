import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for standalone components using common directives

@Component({
  selector: 'app-footer',
  standalone: true, // Mark as standalone
  imports: [CommonModule], // Import CommonModule
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
