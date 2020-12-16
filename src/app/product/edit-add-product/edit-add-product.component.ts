import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductCategory } from 'src/app/models/productcategory';
import { ErrorService } from 'src/app/services/error.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-add-product',
  templateUrl: './edit-add-product.component.html',
  styleUrls: ['./edit-add-product.component.css']
})

export class EditAddProductComponent implements OnInit {

  proForm!: FormGroup;
  sel_cat!: string;
  isSelected = true;
  selectedValue = ""
  selectedCat: ProductCategory = {};

  constructor(private router: Router, public categoryproductService: ProductCategoryService,
    public productService: ProductService, private formBuilder: FormBuilder, private arouter: ActivatedRoute, public errorService: ErrorService) { }


  ngOnInit(): void {
    this.categoryproductService.initCategoryProduct();
    this.initProForm();
    this.initEditProduct();

  }

  addOReditProduct() {

   if (this.valdatesend()) {
      this.productService.subjectIsUpdate.value == true ?
        this.updateProduct(this.productService.subjectCurrentEditId.value) :
        this.addProduct()
    } 

  }


  //init  reactive form

  initProForm() {
    this.proForm = this.formBuilder.group({
      name: ['', Validators.required],
      sel_cat_pro: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      availableStock: ['', Validators.required],


    });
  }


  initEditProduct() {
    this.arouter.paramMap.subscribe(params => {

      if (params.get('id') !== null) {
        {
          this.productService.initEditCategoryProduct(Number(params.get('id')));
          this.productService.subjecttitleButton.next("Update Product");
          this.productService.subjectIsUpdate.next(true);
          this.productService.subjectCurrentEditId.next(Number(params.get('id')));
        }

      }
      else {
        {
          this.productService.subjectProduct.value.name = ""
          this.productService.subjectProduct.value.description = ""
          this.productService.subjectProduct.value.availableStock = undefined
          this.productService.subjectProduct.value.price = undefined

          this.productService.subjecttitleButton.next("Add  Product");
          this.productService.subjectIsUpdate.next(false);
        }

      }

    });
  }


  get formControls() {

    return this.proForm.controls;
  }

  navigatetoAllProduct() {
    this.router.navigateByUrl("/admin/all-product")

  }
  navigatetoEditplayer() {
    this.router.navigateByUrl("/managefootball/players/1")
  }


  // add product to 

  addProduct() {
    let product: Product = {};

    product.availableStock = this.proForm.value.availableStock
    product.price = this.proForm.value.price
    product.description = this.proForm.value.description
    product.name = this.proForm.value.name
    product.categoryProduct = this.selectedCat;



   this.productService.saveProduct(product).toPromise().then(

      rep => {
        this.navigatetoAllProduct()
      },
      error => {
      }

    )  
  }

  // update product 
  updateProduct(id: number) {
    let product: Product = {};

    product.availableStock = this.proForm.value.availableStock
    product.price = this.proForm.value.price
    product.description = this.proForm.value.description
    product.name = this.proForm.value.name
    product.categoryProduct = this.selectedCat;
    this.productService.updateProduct(id, product).toPromise().then(

      rep => {
        this.navigatetoAllProduct()
      },
      error => {
      }

    )
  }


  //validate selectedCat
  validateSendCategoory() {
    return this.selectedCat.name?.length! > 0
  }

  //valdate send 
  valdatesend() {
    return this.validateSendCategoory() &&
      this.productService.validateProductName() &&
      this.productService.validateProductPrice()

  }

}
