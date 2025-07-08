// user login with github service

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  loginWithGithub(code: string): Observable<any> {
    return this.http.post("/api/login/github", { code });
  }
}
