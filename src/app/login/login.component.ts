import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../services/auth.service"; // Corrected path for standalone
import { UserService, GitHubUser } from "../services/user.service"; // Corrected path for standalone
import { CommonModule } from "@angular/common"; // Required for standalone components using common directives
import { Subscription } from "rxjs";

@Component({
  selector: "app-login",
  standalone: true, // Mark as standalone
  imports: [CommonModule], // Import CommonModule
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
        this.authService.getAccessToken(code).subscribe(
          (accessToken) => {
            if (accessToken) {
              this.authService.setAccessToken(accessToken);
              this.userService.fetchUserData(accessToken).subscribe(
                (userData) => {
                  this.loading = false;
                  this.router.navigate([], {
                    queryParams: { code: null },
                    queryParamsHandling: "merge",
                  });
                },
                (err) => {
                  this.error = "An error occurred fetching user data.";
                  console.error(err);
                  this.loading = false;
                },
              );
            } else {
              this.error = "Failed to get access token.";
              this.loading = false;
            }
          },
          (err) => {
            this.error = "An error occurred during authentication.";
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
