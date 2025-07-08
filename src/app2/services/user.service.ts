// user login with github service

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  // This method is no longer used for GitHub OAuth directly in the frontend.
  // The GitHub OAuth logic has been moved to app/auth.service.ts and app/user.service.ts
  // This file might be a remnant from a previous design.
  // If you intend to use a backend for login, this method would be relevant for calling your backend API.
  loginWithGithub(code: string): Observable<any> {
    // This would typically call your backend endpoint, e.g.:
    // return this.http.post("/api/login/github", { code });
    console.warn('UserService.loginWithGithub is deprecated for direct GitHub OAuth flow. Use AuthService instead.');
    return new Observable(); // Return an empty observable to satisfy type
  }
}
