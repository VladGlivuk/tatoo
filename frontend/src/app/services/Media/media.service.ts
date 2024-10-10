import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
//types
import { AllMediaResponse } from 'src/app/core/types';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  constructor(private http: HttpClient) {}

  getMedia(offset: number, limit: number): Observable<AllMediaResponse> {
    const params = { offset, limit }

    return this.http.get<AllMediaResponse>(`${environment.API_BASE_URL}media`, { params });
  }
}
