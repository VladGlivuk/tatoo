import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
//types
import { FeedbackResponse } from 'src/app/core/types';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  sendFeedback(credentials: string): Observable<FeedbackResponse> {
    return this.http.post<FeedbackResponse>(`${environment.API_BASE_URL}feedback/`, { credentials });
  }
}
