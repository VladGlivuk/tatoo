import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
//types
import { AllProductsResponse, ProductByIdResponse } from 'src/app/core/types';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProductById(id: number): Observable<ProductByIdResponse> {
    return this.http.get<ProductByIdResponse>(`${environment.API_BASE_URL}product/${id}`);
  }

  getProductsByCategoryId(categoryId: number, offset: number, limit: number): Observable<AllProductsResponse> {
    return this.http.get<AllProductsResponse>(`${environment.API_BASE_URL}products/category/${categoryId}`, { params: { offset, limit } });
  }
}
