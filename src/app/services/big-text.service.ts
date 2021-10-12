import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BigText } from '../models/bigText';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BigTextService {
  apiUrl='https://localhost:44307/BigText/';
  constructor(private httpclient: HttpClient) { }
  getBigText():Observable<BigText[]> {
    let newPath = this.apiUrl + "GetList"
    return this.httpclient.get<BigText[]>(newPath)
  }
  add(bigText:BigText):Observable<any>{
    return this.httpclient.post(this.apiUrl+"SubmitChange",bigText)
  }
}
