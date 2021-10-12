import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Product } from '../models/product';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 apiUrl='https://localhost:44307/';
  constructor(private httpclient: HttpClient) { }
  getProducts():Observable<Product[]> {
    let newPath = this.apiUrl + "Product/Getlist"
    return this.httpclient.get<Product[]>(newPath)
  }
  getProductsByCategory(categoryId:string):Observable<Product[]> {
    let newPath = this.apiUrl + "Product/getbycategory?categoryId="+categoryId
    return this.httpclient.get<Product[]>(newPath);
  }

  add(product:Product):Observable<any>{
    return this.httpclient.post<any>(this.apiUrl+"Product/SubmitChange",product)
  }
}
