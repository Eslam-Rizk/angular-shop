import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private apiUrl = "https://fakestoreapi.com";

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<any[]>(this.apiUrl + "/products").pipe(
      map((products) => {
        console.log("products:", products);
        return products;
      }),
    );
  }

  getProductById(id: number) {
    return this.http.get<any>(this.apiUrl + "/products/" + id).pipe(
      map((product) => {
        console.log("product:", product);
        return product;
      }),
    );
  }

  getProductsByCategory(category: string) {
    return this.http
      .get<any[]>(this.apiUrl + "/products/category/" + category)
      .pipe(
        map((products) => {
          console.log("products:", products);
          return products;
        }),
      );
  }
}
