// --- START_FILE: login/login.component.ts ---
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { UserService, GitHubUser } from "../services/user.service";
import { CommonModule } from "@angular/common";
import { Subscription } from "rxjs";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent implements OnInit, OnDestroy {
  user: GitHubUser | null = null;
  loading: boolean = false;
  error: string | null = null;
  private userSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.error = null;

    this.userSubscription = this.userService.currentUser$.subscribe((user) => {
      this.user = user;
      if (user) {
        this.loading = false;
      }
    });

    this.route.queryParams.subscribe((params) => {
      const code = params["code"];

      if (code && !this.user) {
        console.log("Authorization code received:", code);
        // Call your backend to exchange the code
        this.authService.exchangeCodeWithBackend(code).subscribe(
          (backendResponse) => {
            if (backendResponse && backendResponse.github_access_token) {
              const githubAccessToken = backendResponse.github_access_token;
              const userDataFromBackend = backendResponse.user; // User data from your DB via backend

              // Save the GitHub access token for direct GitHub API calls (if needed)
              this.authService.setAccessToken(githubAccessToken);

              // Update user service with data from backend (which should match GitHubUser interface)
              this.userService.saveUserData(userDataFromBackend); // This will update currentUser$

              this.loading = false;
              // Clear the code from the URL to prevent re-processing on refresh
              this.router.navigate([], {
                queryParams: { code: null },
                queryParamsHandling: "merge",
              });
              // Optionally redirect to profile or home after successful login
              this.router.navigate(["/profile"]);
            } else {
              this.error =
                "Failed to get access token from backend or invalid response.";
              this.loading = false;
            }
          },
          (err) => {
            this.error =
              "An error occurred during backend authentication process.";
            console.error(err);
            this.loading = false;
          },
        );
      } else if (!this.user) {
        this.loading = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  handleLoginClick(): void {
    this.authService.loginWithGithub();
  }

  handleLogoutClick(): void {
    this.authService.logout();
    this.userService.clearUserData();
    this.router.navigate(["/login"]);
  }
}
// --- END_FILE: login/login.component.ts ---
