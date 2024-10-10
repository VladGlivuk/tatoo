import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
//types
import { AllNewsResponse, NewsByIdResponse } from 'src/app/core/types';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}

  getNewsById(id: number): Observable<NewsByIdResponse> {
    return this.http.get<NewsByIdResponse>(`${environment.API_BASE_URL}news/${id}`);
  }

  getNews(offset: number, limit: number): Observable<AllNewsResponse> {
    const params = { offset, limit }

    return this.http.get<AllNewsResponse>(`${environment.API_BASE_URL}news`, { params });
  }
}
