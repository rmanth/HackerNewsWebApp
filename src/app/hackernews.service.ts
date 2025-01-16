import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export class BookDetails {
  id: number = 1;
  title: string = "";
  author: string = "";
  type: string = "" ;
  url: string = "";
}


@Injectable({
  providedIn: 'root'
})
export class HackerNewsService {

  private apiUrl = 'http://localhost:33445/api/HackerNews'; // Replace with your WebAPI URL

  constructor(private _HttpClient: HttpClient) { }

  getNewestStories(): Observable<BookDetails[]> {
    return this._HttpClient.get<BookDetails[]>(`${this.apiUrl}/newest`);
  }

  getNewestStoriesWithPagination(page: number, pageSize: number): Observable<BookDetails[]> {
    return this._HttpClient.get<BookDetails[]>(`${this.apiUrl}/pagination?page=${page}&pageSize=${pageSize}`);
  }

  // Search for stories
  search(query: string): Observable<BookDetails[]> {
    return this._HttpClient.get<BookDetails[]>(`${this.apiUrl}/search?query=${query}`);
  }
}