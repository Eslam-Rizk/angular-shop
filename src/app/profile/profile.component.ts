import { Component, OnInit, OnDestroy } from "@angular/core";
import { UserService, GitHubUser } from "../services/user.service"; // Corrected path for standalone
import { AuthService } from "../services/auth.service"; // Corrected path for standalone
import { Subscription } from "rxjs";
import { CommonModule } from "@angular/common"; // Required for standalone components using common directives
import { Router } from "@angular/router";

@Component({
  selector: "app-profile",
  standalone: true, // Mark as standalone
  imports: [CommonModule], // Import CommonModule
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.css",
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: GitHubUser | null = null;
  private userSubscription: Subscription | undefined;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.userService.currentUser$.subscribe((user) => {
      this.user = user;
      if (!user && this.authService.isAuthenticated()) {
        this.router.navigate(["/login"]);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  handleLogoutClick(): void {
    this.authService.logout();
    this.userService.clearUserData();
    this.router.navigate(["/login"]);
  }
}
