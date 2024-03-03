import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FetchService {
  private baseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  get(url: string) {
    return this.http.get(`${this.baseUrl}${url}`, {
      responseType: 'json',
    });
  }
}
