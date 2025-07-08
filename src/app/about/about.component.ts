import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for standalone components using common directives

@Component({
  selector: 'app-about',
  standalone: true, // Mark as standalone
  imports: [CommonModule], // Import CommonModule
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
