import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { SubImages } from '../models/subImages';

@Injectable({
  providedIn: 'root'
})
export class SubImagesService {
  apiUrl='https://localhost:44307/SubImage/';
  constructor(private httpclient: HttpClient) { }
  getSubImages():Observable<SubImages[]> {
    let newPath = this.apiUrl + "GetList"
    return this.httpclient.get<SubImages[]>(newPath)
  }
  add(subImages:SubImages):Observable<any>{
    return this.httpclient.post(this.apiUrl+"SubmitChange",subImages)
  }
}
