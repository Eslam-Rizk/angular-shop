import { Component, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../../services/auth.service"; // Corrected path for standalone
import { UserService, GitHubUser } from "../../services/user.service"; // Corrected path for standalone
import { CommonModule } from "@angular/common"; // Required for standalone components using common directives

@Component({
  selector: "app-navbar",
  standalone: true, // Mark as standalone
  imports: [RouterLink, CommonModule], // Import standalone components and CommonModule
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.css",
})
export class NavbarComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;
  user$: Observable<GitHubUser | null>;

  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {
    // Convert boolean from isAuthenticated() to an Observable for async pipe
    this.isAuthenticated$ = new Observable((observer) => {
      observer.next(this.authService.isAuthenticated());
      // You might want to add a way to react to auth state changes if AuthService were reactive
      // For now, it's a simple check.
      observer.complete();
    });
    this.user$ = this.userService.currentUser$;
  }

  ngOnInit(): void {
    // No specific initialization needed here as observables are set in constructor
    // and will react to changes.
  }

  handleLogoutClick(): void {
    this.authService.logout();
    this.userService.clearUserData(); // Clear user data from service
  }
}
