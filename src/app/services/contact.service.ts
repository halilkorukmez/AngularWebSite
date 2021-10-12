import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  apiUrl='https://localhost:44307/Comment/';
  constructor(private httpclient: HttpClient) { }
  getContact():Observable<Contact[]> {
    let newPath = this.apiUrl + "GetList"
    return this.httpclient.get<Contact[]>(newPath)
  }
  add(contact:Contact):Observable<any>{
    return this.httpclient.post(this.apiUrl+"SubmitChange",contact)
  }
}
