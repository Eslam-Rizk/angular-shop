// --- START_FILE: user.service.ts ---
import { Injectable, PLATFORM_ID, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of, BehaviorSubject } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { isPlatformBrowser } from "@angular/common";

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
  providedIn: "root",
})
export class UserService {
  private GITHUB_USER_API_URL = "https://api.github.com/user";
  // Optional: If you create a backend endpoint for getting your app's user profile
  // private BACKEND_USER_PROFILE_URL = 'http://localhost:3000/api/users/profile';

  private currentUserSubject: BehaviorSubject<GitHubUser | null>;
  public currentUser$: Observable<GitHubUser | null>;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    let storedUser: GitHubUser | null = null;
    if (isPlatformBrowser(this.platformId)) {
      const userString = localStorage.getItem("github_user_data");
      if (userString) {
        storedUser = JSON.parse(userString);
      }
    }
    this.currentUserSubject = new BehaviorSubject<GitHubUser | null>(
      storedUser,
    );
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  /**
   * Fetches user data from the GitHub API using the access token.
   * This method is called after your backend has successfully exchanged the code and provided the GitHub access token.
   * @param accessToken The GitHub access token.
   * @returns An Observable of the GitHubUser object or null if an error occurs.
   */
  fetchUserDataFromGitHub(accessToken: string): Observable<GitHubUser | null> {
    const headers = new HttpHeaders({
      Authorization: `token ${accessToken}`,
    });

    return this.http
      .get<GitHubUser>(this.GITHUB_USER_API_URL, { headers })
      .pipe(
        tap((userData) => {
          console.log("Fetched user data from GitHub API:", userData);
          this.saveUserData(userData); // Save and update BehaviorSubject
        }),
        catchError((error) => {
          console.error("Error fetching user data from GitHub API:", error);
          this.clearUserData(); // Clear data on error
          return of(null);
        }),
      );
  }

  /**
   * Saves user data to local storage and updates the BehaviorSubject.
   * @param userData The user data to save.
   */
  saveUserData(userData: GitHubUser): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("github_user_data", JSON.stringify(userData));
    }
    this.currentUserSubject.next(userData);
    console.log("User data saved:", userData);
  }

  /**
   * Retrieves user data from local storage.
   * @returns The GitHubUser object or null if not found.
   */
  getStoredUserData(): GitHubUser | null {
    if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem("github_user_data");
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  }

  /**
   * Clears user data from local storage and the BehaviorSubject.
   */
  clearUserData(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem("github_user_data");
    }
    this.currentUserSubject.next(null);
    console.log("User data cleared.");
  }

  // Optional: If you want to fetch user profile from your own backend
  // getUserProfileFromBackend(): Observable<GitHubUser | null> {
  //   // You would typically send your app's JWT here if you implemented it
  //   // const headers = new HttpHeaders({ 'Authorization': `Bearer ${yourAppJwtToken}` });
  //   return this.http.get<GitHubUser>(this.BACKEND_USER_PROFILE_URL).pipe(
  //     tap(userProfile => console.log('Fetched user profile from backend:', userProfile)),
  //     catchError(error => {
  //       console.error('Error fetching user profile from backend:', error);
  //       return of(null);
  //     })
  //   );
  // }
}
// --- END_FILE: user.service.ts ---
