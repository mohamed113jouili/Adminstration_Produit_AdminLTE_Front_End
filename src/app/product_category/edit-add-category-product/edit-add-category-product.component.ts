import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog.service';
import { ErrorService } from 'src/app/services/error.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';

@Component({
  selector: 'app-edit-add-category-product',
  templateUrl: './edit-add-category-product.component.html',
  styleUrls: ['./edit-add-category-product.component.css']
})
export class EditAddCategoryProductComponent implements OnInit {

  iserror: boolean = false;
  catForm!: FormGroup;


  constructor(private router: Router, private formBuilder: FormBuilder,
    public categoryproductService: ProductCategoryService, public arouter: ActivatedRoute, public es: ErrorService,
    public dialogService: DialogService) { }

  ngOnInit(): void {

    this.initCatForm();
    this.initEditCategoryProduct();
    this.es.objectError.subscribe(se => {

      if (se.type == 100) {
        this.showErrorDialog(this.dialogService.message(se.name!));
      }
    })
  }



  addOReditCategoryProduct() {

    if (this.categoryproductService.validateSendCategoory()) {
      this.categoryproductService.subjectIsUpdate.value == true ?
        this.updateCategoryProductt(this.categoryproductService.subjectCurrentEditId.value) :
        this.addCategoryProductt()
    }
    // this.isError();

  }




  get formControls() {

    return this.catForm.controls;
  }

  initCatForm() {
    this.catForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]

    });
  }

  initEditCategoryProduct() {
    this.arouter.paramMap.subscribe(params => {

      if (params.get('id') !== null) {
        {
          this.categoryproductService.initEditCategoryProduct(Number(params.get('id')));
          this.categoryproductService.subjecttitleButton.next("Update Category Product");
          this.categoryproductService.subjecttitleHeadar.next("UPDATE CATEGORY PRODUCT");
          this.categoryproductService.subjectIsUpdate.next(true);
          this.categoryproductService.subjectCurrentEditId.next(Number(params.get('id')));
        }

      }
      else {
        {
          this.categoryproductService.subjectCategoryProduct.value.name = ""
          this.categoryproductService.subjectCategoryProduct.value.description = ""
          this.categoryproductService.subjecttitleButton.next("Add Category Product");
          this.categoryproductService.subjecttitleHeadar.next("ADD CATEGORY PRODUCT");

          this.categoryproductService.subjectIsUpdate.next(false);
        }

      }

    });
  }

  navigatetoAllCategoryProduct() {
    this.router.navigateByUrl("/admin/all-product-category")
  }


  addCategoryProductt() {
    this.categoryproductService.saveCategoryProduct(this.catForm.value).toPromise().then(

      rep => {

        this.navigatetoAllCategoryProduct()
      },
      error => {
        // console.log(error)
      }

    )

  }
  showErrorDialog(message: string) {
    const that = this;

    this.dialogService.confirmThis(message, 2, function () {


    }, function () {

    })


  }
  updateCategoryProductt(id: number) {
    console.log(this.catForm.value)
    this.categoryproductService.updateCategoryProduct(id, this.catForm.value).toPromise().then(

      rep => {

        this.navigatetoAllCategoryProduct()
      },
      error => {
        // console.log(error)
      }

    )

  }






}
