import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _listSubjectProduct = new BehaviorSubject<Product[]>([]);
  private _subjectProduct = new BehaviorSubject<Product>({});
  private _subjecttitleButton = new BehaviorSubject<String>("");
  private _subjectIsUpdate = new BehaviorSubject<boolean>(false);
  private _subjectCurrentEditId = new BehaviorSubject<number>(0);
 
 
  constructor(public http: HttpClient) { }



  //get all Product
  getAllProduct() {

    return this.http.get<Product[]>(`${environment.apiUrl}/products`)
      .pipe(map(resp => resp));

  }

  // get Product by id 
  getProductByid( id: number) {

    return this.http.get(`${environment.apiUrl}/product/` + id)
      .pipe(map(resp => resp as Product));

  }

  // save Product 
  saveProduct(product: Product) {
   

    return this.http.post(`${environment.apiUrl}/save/product`, product)
      .pipe(map(resp => resp as Product));

  }

  // update Product
  updateProduct(id: number, product: Product) {

    return this.http.put(`${environment.apiUrl}/update/product/` + id,product)
      .pipe(map(resp => resp as Product));

  }

  // delete Product by id 
  deleteProductByid(id: number) {
    return this.http.delete(`${environment.apiUrl}/delete/product/` + id)
      .pipe(map(resp => resp as boolean));

  }



  //init in Component Product
  initProduct() {

    this.getAllProduct().toPromise().then(

      rep => {
        this._listSubjectProduct.next(rep)
      },
      error => {
        console.log(error)
      }

    )
  }


//init in Component EditAddCategoryproductComponent
initEditCategoryProduct(id: number) {

  this.getProductByid(id).toPromise().then(

    rep => {
      console.log(rep)

      this.subjectProduct.next(rep)


    },
    error => {
      console.log(error)
    }

  )
}


  // delete in Component Product
  deleteProduct(id: number) {

    this.deleteProductByid(id).toPromise().then(

      rep => {
       // filter list CategoryProduct by id deleted
        this.listSubjectProduct.next(  this.listSubjectProduct.value.filter(function (el) {
          return  el.id!=id;;
        }))
       },
      error => {
       }
    )
  }

  /** access method getter */
  public get listSubjectProduct() {
    return this._listSubjectProduct;
  }

  public get subjectProduct() {
    return this._subjectProduct;
  }
  public get subjecttitleButton() {
    return this._subjecttitleButton;
  }

  public get subjectIsUpdate() {
    return this._subjectIsUpdate;
  }

  public get subjectCurrentEditId() {
    return this._subjectCurrentEditId;
  }



}
