import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PricingResponse } from 'src/app/core/types';

@Injectable({
  providedIn: 'root',
})
export class PricingService {
  constructor(private http: HttpClient) {}

  getPrices(): Observable<PricingResponse> {
    return this.http.get<PricingResponse>(`${environment.API_BASE_URL}pricing/`);
  }
}
