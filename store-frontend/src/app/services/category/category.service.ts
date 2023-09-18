import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/env/environment.prod';
import { Observable, map } from 'rxjs';
import { Response } from 'src/app/models/auth';
import { Category } from 'src/app/models/category';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http:HttpClient
  ) { }
  getAllCategory():Observable<Category[]>{
    return this.http.get<Response<Category[]>>(environment.CATEGORY_ROUTE)
    .pipe(
      map(response => response.data)
    );
  }

}
