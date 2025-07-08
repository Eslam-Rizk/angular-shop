import { Component, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../../../app/auth.service"; // Corrected path
import { UserService, GitHubUser } from "../../../app/user.service"; // Corrected path
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf, ngFor, etc.

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.css",
})
export class NavbarComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;
  user$: Observable<GitHubUser | null>;

  constructor(private authService: AuthService, private userService: UserService) {
    this.isAuthenticated$ = this.authService.isAuthenticated(); // This will return a boolean, not an Observable
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
