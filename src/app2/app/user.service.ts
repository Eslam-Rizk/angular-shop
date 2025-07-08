import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

// Define a simple interface for GitHub user data
export interface GitHubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private GITHUB_USER_API_URL = 'https://api.github.com/user';
  // BehaviorSubject to hold the current user data, null if not logged in
  private currentUserSubject: BehaviorSubject<GitHubUser | null>;
  public currentUser$: Observable<GitHubUser | null>;

  constructor(private http: HttpClient) {
    // Initialize with data from local storage if available
    const storedUser = localStorage.getItem('github_user_data');
    this.currentUserSubject = new BehaviorSubject<GitHubUser | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  /**
   * Fetches user data from the GitHub API using the access token.
   * @param accessToken The GitHub access token.
   * @returns An Observable of the GitHubUser object or null if an error occurs.
   */
  fetchUserData(accessToken: string): Observable<GitHubUser | null> {
    const headers = new HttpHeaders({
      'Authorization': `token ${accessToken}`
    });

    return this.http.get<GitHubUser>(this.GITHUB_USER_API_URL, { headers }).pipe(
      tap(userData => {
        console.log('Fetched user data:', userData);
        this.saveUserData(userData); // Save and update BehaviorSubject
      }),
      catchError(error => {
        console.error('Error fetching user data:', error);
        this.clearUserData(); // Clear data on error
        return of(null);
      })
    );
  }

  /**
   * Saves user data to local storage and updates the BehaviorSubject.
   * @param userData The user data to save.
   */
  saveUserData(userData: GitHubUser): void {
    localStorage.setItem('github_user_data', JSON.stringify(userData));
    this.currentUserSubject.next(userData); // Update the BehaviorSubject
    console.log('User data saved:', userData);
  }

  /**
   * Retrieves user data from local storage. This method is now less critical
   * as `currentUser$` should be used for reactive updates.
   * @returns The GitHubUser object or null if not found.
   */
  getStoredUserData(): GitHubUser | null {
    const userData = localStorage.getItem('github_user_data');
    return userData ? JSON.parse(userData) : null;
  }

  /**
   * Clears user data from local storage and the BehaviorSubject.
   */
  clearUserData(): void {
    localStorage.removeItem('github_user_data');
    this.currentUserSubject.next(null); // Clear the BehaviorSubject
    console.log('User data cleared.');
  }
}
