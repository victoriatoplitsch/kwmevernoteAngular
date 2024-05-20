import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Register} from "./register";
import {Todo} from "./todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private api = 'http://kwmevernote.s2110456029.student.kwmhgb.at/api'
  constructor(private http:HttpClient) {

  }

  getAll():Observable<Array<Todo>>{
    return this.http.get<Array<Todo>>(`${this.api}/todos`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getSingle(id:string): Observable<Todo>{
    return this.http.get<Todo>(`${this.api}/todos/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  remove(id:string): Observable<any>{
    return this.http.delete(`${this.api}/todos/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  create(todo:Todo): Observable<any>{
    return this.http.post(`${this.api}/todos`, todo)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  update(todo:Todo): Observable<any>{
    return this.http.put(`${this.api}/todos/${todo.id}`, todo)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getUserDetails(user_id: number): Observable<any> {
    return this.http.get(`${this.api}/users/${user_id}`);
  }

  getNoteDetails(note_id: number): Observable<any> {
    return this.http.get(`${this.api}/notes/${note_id}`);
  }

  private errorHandler(error:Error | any):Observable<any>{
    return throwError(error);
  }
}
