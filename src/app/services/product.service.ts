import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';
import { ProductCategory } from '../models/productcategory';
import { ProductCategoryService } from './product-category.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  selectvalue = 0;

  private _listSubjectProduct = new BehaviorSubject<Product[]>([]);
  private _subjectProduct = new BehaviorSubject<Product>({});
  private _subjecttitleButton = new BehaviorSubject<String>("");
  private _subjecttitleHedar = new BehaviorSubject<String>("");
  
  private _subjectIsUpdate = new BehaviorSubject<boolean>(false);
  private _subjectCurrentEditId = new BehaviorSubject<number>(0);

  //validate champ 
  private _subjectvalidteName = new BehaviorSubject<boolean>(false);
  private _subjectvalidteCategory = new BehaviorSubject<boolean>(false);
  private _subjectvalidtePrice = new BehaviorSubject<boolean>(false);
  public subjectSelectCat = new BehaviorSubject<ProductCategory>({});


  constructor(public http: HttpClient,public categoryproductService: ProductCategoryService) { }



  //get all Product
  getAllProduct() {

    return this.http.get<Product[]>(`${environment.apiUrl}/products`)
      .pipe(map(resp => resp));

  }

  // get Product by id 
  getProductByid(id: number) {

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

    return this.http.put(`${environment.apiUrl}/update/product/` + id, product)
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


  //init in Component EditAddproductComponent
  initEditCategoryProduct(id: number) {

    this.getProductByid(id).toPromise().then(

      rep => {
        //console.log(rep)

        this.subjectProduct.next(rep)
        this.subjectSelectCat.next(rep.categoryProduct!)
        this.categoryproductService.subjectLastSelectCategoryProduct.next(rep.categoryProduct!)


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
        this.listSubjectProduct.next(this.listSubjectProduct.value.filter(function (el) {
          return el.id != id;;
        }))
      },
      error => {
      }
    )
  }

  //validate name product

  validateProductName() {
    //console.log(this.subjectProduct.value.name);

    return this.subjectProduct.value.name?.length! > 3
  }


  //validate price product

  validateProductPrice() {
    console.log(this.subjectProduct.value.price)

    return this.subjectProduct.value.price! > 0
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

  public get subjectvalidteName() {
    return this._subjectvalidteName;
  }
  public set subjectvalidteName(value) {
    this._subjectvalidteName = value;
  }

  public get subjectvalidteCategory() {
    return this._subjectvalidteCategory;
  }
  public set subjectvalidteCategory(value) {
    this._subjectvalidteCategory = value;
  }

  public get subjectvalidtePrice() {
    return this._subjectvalidtePrice;
  }
  public set subjectvalidtePrice(value) {
    this._subjectvalidtePrice = value;
  }
  public get subjecttitleHedar() {
    return this._subjecttitleHedar;
  }
  public set subjecttitleHedar(value) {
    this._subjecttitleHedar = value;
  }


}
