import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  apiUrl: string = environment.apiUrl + 'category/';
  constructor(private http: HttpClient) {}

  get(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl + 'get');
  }
  add(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl + 'add', category);
  }

  update(category: Category, id: string): Observable<Category> {
    return this.http.put<Category>(this.apiUrl + 'update/' + id, category);
  }

  delete(id: string): Observable<Category> {
    return this.http.delete<Category>(this.apiUrl + 'delete/' + id);
  }
}
