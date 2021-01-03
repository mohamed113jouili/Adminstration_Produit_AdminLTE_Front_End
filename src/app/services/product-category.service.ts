import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductCategory } from '../models/productcategory';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { ProductService } from './product.service';
@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  index: number = -1;
  private _listSubjectCategoryProduct = new BehaviorSubject<ProductCategory[]>([]);
  private _subjectCategoryProduct = new BehaviorSubject<ProductCategory>({});
  private _subjecttitleButton = new BehaviorSubject<String>("");
  private _subjecttitleHeadar = new BehaviorSubject<String>("");
 
  private _subjectIsUpdate = new BehaviorSubject<boolean>(false);
  private _subjectCurrentEditId = new BehaviorSubject<number>(0);


  private _subjectLastSelectCategoryProduct = new BehaviorSubject<ProductCategory>({});
  private _listSubjectupdateCategoryProduct = new BehaviorSubject<ProductCategory[]>([]);





  //validate champ 
  private _subjectvalidteName = new BehaviorSubject<boolean>(false);
  private _subjectSelectCat = new BehaviorSubject<ProductCategory>({});



  constructor(public http: HttpClient) { }

  //get all CategoryProduct
  getAllCategoryProduct() {

    return this.http.get<ProductCategory[]>(`${environment.apiUrl}/all_category_product`)
      .pipe(map(resp => resp));

  }

  // get CategoryProduct by id 
  getCategoryProductByid(id: number) {

    return this.http.get(`${environment.apiUrl}/category_product/` + id)
      .pipe(map(resp => resp as ProductCategory));

  }

  // save CategoryProduct 
  saveCategoryProduct(categoryProduct: ProductCategory) {


    return this.http.post(`${environment.apiUrl}/save/category_product`, categoryProduct)
      .pipe(map(resp => resp as ProductCategory));

  }

  // update CategoryProduct
  updateCategoryProduct(id: number, categoryProduct: ProductCategory) {

    return this.http.put(`${environment.apiUrl}/update/category_product/` + id, categoryProduct)
      .pipe(map(resp => resp as ProductCategory));

  }

  // delete CategoryProduct by id 
  deleteCategoryProductByid(id: number) {
    return this.http.delete(`${environment.apiUrl}/delete/category_product/` + id)
      .pipe(map(resp => resp as boolean));

  }



  //init in Component CategoryProduct
  initCategoryProduct() {

    this.getAllCategoryProduct().toPromise().then(

      rep => {

        rep.forEach((r, i) => { r.index = i })


        // display all category
        this.listSubjectCategoryProduct.next(rep)

        //for update item selected (edit product)
        this.listSubjectupdateCategoryProduct.next(rep)


      },
      error => {
        console.log(error)
      }

    )
  }


  //init in Component EditAddCategoryproductComponent
  initEditCategoryProduct(id: number) {

    this.getCategoryProductByid(id).toPromise().then(

      rep => {
        console.log(rep)

        this.subjectCategoryProduct.next(rep)


      },
      error => {
        console.log(error)
      }

    )
  }


  // delete in Component CategoryProduct
  deleteCategoryProduct(id: number) {

    this.deleteCategoryProductByid(id).toPromise().then(

      rep => {
        // filter list CategoryProduct by id deleted
        this.listSubjectCategoryProduct.next(this.listSubjectCategoryProduct.value.filter(function (el) {
          return el.id != id;;
        }))
      },
      error => {
        //console.log(error)
      }
    )
  }

  //validate name category

  validateNameCategory() {
    return this.subjectCategoryProduct.value.name?.length! > 3
  }

  validateSendCategoory() {

    return this.subjectCategoryProduct.value.name?.length! > 3
  }



  public getAndUpdateList() {

    let ids = this.subjectLastSelectCategoryProduct.value.id

    // filter  category by id 
    this.listSubjectupdateCategoryProduct.next(this.listSubjectupdateCategoryProduct.value.filter(
      function (caty) {
        return caty.id != ids;
      }

    ))
    //add category for position 1
    this.listSubjectupdateCategoryProduct.value.push(this.subjectLastSelectCategoryProduct.value)

    let list_cat = this.listSubjectupdateCategoryProduct.asObservable()

    return list_cat


  }



  /** access method getter */
  public get listSubjectCategoryProduct() {
    return this._listSubjectCategoryProduct;
  }

  public get subjectCategoryProduct() {
    return this._subjectCategoryProduct;
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

  public get subjectSelectCat() {
    return this._subjectSelectCat;
  }
  public set subjectSelectCat(value) {
    this._subjectSelectCat = value;
  }

  public get subjectLastSelectCategoryProduct() {
    return this._subjectLastSelectCategoryProduct
  }
  public set subjectLastSelectCategoryProduct(value) {
    this._subjectLastSelectCategoryProduct = value;
  }

  public get listSubjectupdateCategoryProduct() {
    return this._listSubjectupdateCategoryProduct;
  }
  public set listSubjectupdateCategoryProduct(value) {
    this._listSubjectupdateCategoryProduct = value;
  }

  public get subjecttitleHeadar() {
    return this._subjecttitleHeadar;
  }
  public set subjecttitleHeadar(value) {
    this._subjecttitleHeadar = value;
  }
 
  /*  */
}
