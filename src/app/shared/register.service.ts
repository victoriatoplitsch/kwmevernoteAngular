import { Injectable } from '@angular/core';
import {Register, User} from "./register";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private api = 'http://kwmevernote.s2110456029.student.kwmhgb.at/api'
    constructor(private http:HttpClient) {

  }

  getAll():Observable<Array<Register>>{
    return this.http.get<Array<Register>>(`${this.api}/registers`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getSingle(id:string): Observable<Register>{
    return this.http.get<Register>(`${this.api}/registers/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  remove(id:string): Observable<any>{
    return this.http.delete(`${this.api}/registers/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  create(register:Register): Observable<any>{
    return this.http.post(`${this.api}/registers`, register)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  update(register:Register): Observable<any>{
    console.log(register)
    return this.http.put(`${this.api}/registers/${register.id}`, register)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getUserDetails(user_id: number): Observable<any> {
    return this.http.get(`${this.api}/users/${user_id}`);
  }

  private errorHandler(error:Error | any):Observable<any>{
    return throwError(error);
  }
}
