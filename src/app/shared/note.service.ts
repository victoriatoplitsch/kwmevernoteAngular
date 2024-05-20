import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Register} from "./register";
import {Note} from "./note";

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private api = 'http://kwmevernote.s2110456029.student.kwmhgb.at/api'
  constructor(private http:HttpClient) {

  }

  getAll():Observable<Array<Note>>{
    return this.http.get<Array<Note>>(`${this.api}/notes`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getSingle(id:string): Observable<Note>{
    return this.http.get<Note>(`${this.api}/notes/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  remove(id:string): Observable<any>{
    return this.http.delete(`${this.api}/notes/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  create(note:Note): Observable<any>{
    return this.http.post(`${this.api}/notes`, note)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  update(note:Note): Observable<any>{
    return this.http.put(`${this.api}/notes/${note.id}`, note)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getRegisterDetails(register_id: number): Observable<any> {
    return this.http.get(`${this.api}/registers/${register_id}`);
  }

  private errorHandler(error:Error | any):Observable<any>{
    return throwError(error);
  }
}
