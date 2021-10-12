import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl='https://localhost:44307/User/';
  constructor(private httpclient: HttpClient) { }
  getUser():Observable<User[]> {
    let newPath = this.apiUrl + "GetList"
    return this.httpclient.get<User[]>(newPath)
  }
  add(user:User):Observable<any>{
    return this.httpclient.post(this.apiUrl+"SubmitChange",user)
  }
}
