import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for standalone components using common directives

@Component({
  selector: 'app-not-found',
  standalone: true, // Mark as standalone
  imports: [CommonModule], // Import CommonModule
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

}
