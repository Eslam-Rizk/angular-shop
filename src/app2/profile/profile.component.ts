import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService, GitHubUser } from '../user.service';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf, ngFor, etc.
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: GitHubUser | null = null;
  private userSubscription: Subscription | undefined;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userSubscription = this.userService.currentUser$.subscribe(user => {
      this.user = user;
      // If user logs out from another tab or session expires, redirect to login
      if (!user && this.authService.isAuthenticated()) { // Check if not authenticated but user is null
        this.router.navigate(['/login']);
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
    this.router.navigate(['/login']); // Redirect to login page after logout
  }
}
