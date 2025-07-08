import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Replace with your GitHub OAuth App Client ID
  private CLIENT_ID = 'YOUR_GITHUB_OAUTH_CLIENT_ID';
  // Replace with your registered Redirect URI (e.g., http://localhost:4200/login)
  // Ensure this matches the "Authorization callback URL" in your GitHub OAuth App settings.
  private REDIRECT_URI = 'http://localhost:4200/login';
  private GITHUB_AUTHORIZE_URL = 'https://github.com/login/oauth/authorize';
  // Using a CORS proxy for client-side demo. In production, this MUST be a backend endpoint.
  private GITHUB_TOKEN_URL = 'https://corsproxy.io/?https://github.com/login/oauth/access_token';

  constructor(private http: HttpClient) { }

  /**
   * Initiates the GitHub OAuth login process by redirecting the user to GitHub.
   */
  loginWithGithub(): void {
    const scope = 'user:email'; // Request email scope
    window.location.href = `${this.GITHUB_AUTHORIZE_URL}?client_id=${this.CLIENT_ID}&redirect_uri=${this.REDIRECT_URI}&scope=${scope}`;
  }

  /**
   * Exchanges the authorization code received from GitHub for an access token.
   * IMPORTANT: This method is for demonstration purposes. In a real application,
   * this token exchange MUST happen on a secure backend server to protect your client_secret.
   * @param code The authorization code from GitHub.
   * @returns An Observable of the access token string or null.
   */
  getAccessToken(code: string): Observable<string | null> {
    const payload = {
      client_id: this.CLIENT_ID,
      // client_secret: 'YOUR_GITHUB_OAUTH_CLIENT_SECRET', // DO NOT EXPOSE THIS ON CLIENT-SIDE!
      code: code,
      redirect_uri: this.REDIRECT_URI,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json' // Request JSON response
    });

    return this.http.post<any>(this.GITHUB_TOKEN_URL, payload, { headers }).pipe(
      tap(response => console.log('GitHub Token Response:', response)),
      map(response => response.access_token || null),
      catchError(error => {
        console.error('Error getting access token:', error);
        return of(null);
      })
    );
  }

  /**
   * Stores the GitHub access token in local storage.
   * @param token The access token to store.
   */
  setAccessToken(token: string): void {
    localStorage.setItem('github_access_token', token);
  }

  /**
   * Retrieves the GitHub access token from local storage.
   * @returns The access token string or null if not found.
   */
  getStoredAccessToken(): string | null {
    return localStorage.getItem('github_access_token');
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
    localStorage.removeItem('github_access_token');
    localStorage.removeItem('github_user_data');
    console.log('Logged out successfully.');
  }
}
