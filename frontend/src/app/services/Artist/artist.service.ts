import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
//types
import { AllArtistsResponse } from 'src/app/core/types';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  constructor(private http: HttpClient) {}

  getAllArtists(offset: number, limit: number): Observable<AllArtistsResponse> {
    const params = { offset, limit };

    return this.http.get<AllArtistsResponse>(`${environment.API_BASE_URL}artist`, { params });
  }
}
