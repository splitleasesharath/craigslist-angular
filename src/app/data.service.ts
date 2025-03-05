import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  /**
   * Generic POST method that accepts a URL and payload.
   * @param url The endpoint URL.
   * @param payload The data to post.
   */
  post<T>(url: string, payload: any): Observable<T> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<T>(url, payload, { headers });
  }
}
