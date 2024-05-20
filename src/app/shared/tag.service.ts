import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Todo} from "./todo";
import {Tag} from "./tag";
import {Register} from "./register";

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private api = 'http://kwmevernote.s2110456029.student.kwmhgb.at/api'
  constructor(private http:HttpClient) {

  }

  getAll():Observable<Array<Tag>>{
    return this.http.get<Array<Tag>>(`${this.api}/tags`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getSingle(id:string): Observable<Tag>{
    return this.http.get<Tag>(`${this.api}/tags/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  remove(id:string): Observable<any>{
    return this.http.delete(`${this.api}/tags/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  create(tag:Tag): Observable<any>{
    return this.http.post(`${this.api}/tags`, tag)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  update(tag:Tag): Observable<any>{
    return this.http.put(`${this.api}/tags/${tag.id}`, tag)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getAllSearch(searchTerm:string): Observable<Array<Tag>>{
    return this.http.get<Array<Tag>>(`${this.api}/tags/search/${searchTerm}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  private errorHandler(error:Error | any):Observable<any>{
    return throwError(error);
  }
}
