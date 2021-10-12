import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { About } from '../models/about';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  apiUrl='https://localhost:44307/About/';
  constructor(private httpclient: HttpClient) { }
  getAbout():Observable<About[]> {
    let newPath = this.apiUrl + "GetList"
    return this.httpclient.get<About[]>(newPath)
  }
  add(about:About):Observable<any>{
    return this.httpclient.post(this.apiUrl+"SubmitChange",about)
  }
}
