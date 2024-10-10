import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
//types
import { AllFaqResponse } from 'src/app/core/types';

@Injectable({
  providedIn: 'root',
})
export class FaqService {
  constructor(private http: HttpClient) {}

  getFAQs(offset: number, limit: number): Observable<AllFaqResponse> {
    const params = { offset, limit }

    return this.http.get<AllFaqResponse>(`${environment.API_BASE_URL}faq`, { params });
  }
}
