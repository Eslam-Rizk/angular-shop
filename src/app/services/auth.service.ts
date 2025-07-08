// --- START_FILE: auth.service.ts ---
import { Injectable, PLATFORM_ID, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { isPlatformBrowser } from "@angular/common";
import { environment } from "../../environments/environment"; // Assuming environment.ts is at src/environments/environment.ts

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private CLIENT_ID = environment.githubClientId;
  private REDIRECT_URI = environment.githubRedirectUri; // This should be your Angular app's /login route

  // IMPORTANT: This is now your backend endpoint for token exchange
  private BACKEND_GITHUB_CALLBACK_URL = environment.backendGithubCallbackUrl; // **UPDATE THIS TO YOUR BACKEND URL**

  private GITHUB_AUTHORIZE_URL = environment.backendGithubAuthorizeUrl;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  /**
   * Initiates the GitHub OAuth login process by redirecting the user to GitHub.
   */
  loginWithGithub(): void {
    const scope = "user:email";
    // GitHub will redirect back to REDIRECT_URI with the 'code' parameter
    window.location.href = `${this.GITHUB_AUTHORIZE_URL}?client_id=${this.CLIENT_ID}&redirect_uri=${this.REDIRECT_URI}&scope=${scope}`;
  }

  /**
   * Sends the authorization code to your backend to exchange it for an access token.
   * @param code The authorization code received from GitHub.
   * @returns An Observable of the backend's response (which contains GitHub access token and user data).
   */
  exchangeCodeWithBackend(code: string): Observable<any | null> {
    const payload = {
      code: code,
      redirect_uri: this.REDIRECT_URI, // Send redirect_uri to backend for consistency
    };

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
    });

    // Make the POST request to your backend
    return this.http
      .post<any>(this.BACKEND_GITHUB_CALLBACK_URL, payload, { headers })
      .pipe(
        tap((response) =>
          console.log("Backend GitHub Callback Response:", response),
        ),
        map((response) => response), // Return the full response from backend
        catchError((error) => {
          console.error("Error exchanging code with backend:", error);
          return of(null);
        }),
      );
  }

  /**
   * Stores the GitHub access token (received from backend) in local storage.
   * @param token The access token to store.
   */
  setAccessToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("github_access_token", token);
    }
  }

  /**
   * Retrieves the GitHub access token from local storage.
   * @returns The access token string or null if not found.
   */
  getStoredAccessToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem("github_access_token");
    }
    return null;
  }

  /**
   * Checks if the user is currently authenticated by checking for an access token.
   * @returns boolean indicating authentication status.
   */
  isAuthenticated(): boolean {
    return !!this.getStoredAccessToken();
  }

  /**
   * Logs out the user by clearing local storage.
   */
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem("github_access_token");
      localStorage.removeItem("github_user_data"); // Also clear user data
    }
    console.log("Logged out successfully.");
  }
}
// --- END_FILE: auth.service.ts ---
