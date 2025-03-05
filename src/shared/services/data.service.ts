import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl = 'https://dev.masterpiecemanager.com/masterpiece_api'

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  post<Rq, Rs>(
    url: string,
    payload: Rq,
    isTextResponse?: boolean,
  ): Promise<Rs> {
    const observable = isTextResponse
      ? this.http.post(`${this.apiUrl}` + url, payload, { responseType: 'text' })
      : this.http.post(`${this.apiUrl}` + url, payload);
    return new Promise((resolve, reject) => {
      lastValueFrom(observable).then(
        (res: Rs) => {
          resolve(res);
        },
        (err: HttpErrorResponse) => {
          if (err.error.statusCode === 401) {
            // this.logout();
          }
          reject(err);
        },
      );
    });
  }

  get<Rs>(
    url: string,
    queryParams?: { [key: string]: string | number | boolean },
  ): Promise<Rs> {
    if (queryParams) {
      if (!url.includes('?')) {
        url += '?';
      }
      url += Object.entries(queryParams)
        .map(([key, value]) => {
          return `${key}=${encodeURIComponent(value)}`;
        })
        .join('&');
    }

    return new Promise((resolve, reject) => {
      lastValueFrom(this.http.get<Rs>('/rms/v1/' + url)).then(
        (res: Rs) => {
          resolve(res);
        },
        (err: HttpErrorResponse) => {
          if (err.status === 401) {
            // this.logout();
          }
          if (!err.error?.message) err.error.message = err.message;
          reject(err);
        },
      );
    });
  }

  patch<Rq, Rs>(url: string, payload: Rq): Promise<Rs> {
    return new Promise((resolve, reject) => {
      lastValueFrom(this.http.patch<Rs>('/rms/v1/' + url, payload)).then(
        (res: Rs) => {
          resolve(res);
        },
        (err: HttpErrorResponse) => {
          if (err.status === 401) {
            // this.logout();
          }
          reject(err);
        },
      );
    });
  }

  delete<Rq, Rs>(url: string): Promise<Rs> {
    return new Promise((resolve, reject) => {
      lastValueFrom(this.http.delete<Rs>('/rms/v1/' + url)).then(
        (res: Rs) => {
          resolve(res);
        },
        (err: HttpErrorResponse) => {
          if (err.status === 401) {
            // this.logout();
          }
          reject(err);
        },
      );
    });
  }
}
