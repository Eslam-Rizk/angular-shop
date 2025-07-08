import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for standalone components using common directives

@Component({
  selector: 'app-settings',
  standalone: true, // Mark as standalone
  imports: [CommonModule], // Import CommonModule
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

}
