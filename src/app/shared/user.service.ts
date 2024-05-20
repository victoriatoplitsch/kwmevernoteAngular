import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Register} from "./register";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private api = 'http://kwmevernote.s2110456029.student.kwmhgb.at/api'

  constructor(private http:HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.api}/users`);
  }

  private errorHandler(error:Error | any):Observable<any>{
    return throwError(error);
  }

}
