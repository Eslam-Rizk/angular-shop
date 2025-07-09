import { CommonModule } from "@angular/common";
import { Component, inject, Input } from "@angular/core";
import { RouterLink, Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  imports: [RouterLink, CommonModule],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.css",
})
//inject router service
export class NavbarComponent {
  @Input() logo: string = "";
  router = inject(Router);
}
