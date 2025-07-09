import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  private apiUrl = "https://fakestoreapi.com";

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<any[]>(this.apiUrl + "/products/categories").pipe(
      map((categories) => {
        console.log("categories:", categories);
        return categories;
      }),
    );
  }
}
