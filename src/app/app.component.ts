import { Component } from "@angular/core";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true, // Mark as standalone
  imports: [RouterOutlet, NavbarComponent, FooterComponent], // Import standalone components
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "shop";
}
