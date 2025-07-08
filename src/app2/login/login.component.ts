import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService, GitHubUser } from '../user.service';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf, ngFor, etc.
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
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
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.error = null;

    // Subscribe to user changes from UserService
    this.userSubscription = this.userService.currentUser$.subscribe(user => {
      this.user = user;
      if (user) {
        this.loading = false; // Stop loading if user data is available
      }
    });

    // Handle GitHub OAuth callback
    this.route.queryParams.subscribe(params => {
      const code = params['code'];

      if (code && !this.user) { // Only process if code exists and user is not already logged in
        console.log('Authorization code received:', code);
        this.authService.getAccessToken(code).subscribe(
          accessToken => {
            if (accessToken) {
              this.authService.setAccessToken(accessToken);
              this.userService.fetchUserData(accessToken).subscribe(
                userData => {
                  // User data is now handled by the BehaviorSubject in UserService
                  // No need to set this.user directly here as it's updated via subscription
                  this.loading = false;
                  // Clear the code from the URL to prevent re-processing on refresh
                  this.router.navigate([], {
                    queryParams: { code: null },
                    queryParamsHandling: 'merge'
                  });
                },
                err => {
                  this.error = 'An error occurred fetching user data.';
                  console.error(err);
                  this.loading = false;
                }
              );
            } else {
              this.error = 'Failed to get access token.';
              this.loading = false;
            }
          },
          err => {
            this.error = 'An error occurred during authentication.';
            console.error(err);
            this.loading = false;
          }
        );
      } else if (!this.user) { // If no code and no stored user, then we are not logged in
        this.loading = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  /**
   * Handles the login button click, initiating the GitHub OAuth flow.
   */
  handleLoginClick(): void {
    this.authService.loginWithGithub();
  }

  /**
   * Handles the logout button click, clearing user data and state.
   */
  handleLogoutClick(): void {
    this.authService.logout();
    this.userService.clearUserData(); // Clear user data from service
    this.router.navigate(['/login']); // Redirect to login page after logout
  }
}
