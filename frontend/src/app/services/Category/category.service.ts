import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
//types
import { AllCategoriesResponse } from 'src/app/core/types';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<AllCategoriesResponse> {
    return this.http.get<AllCategoriesResponse>(`${environment.API_BASE_URL}category/`);
  }
}
