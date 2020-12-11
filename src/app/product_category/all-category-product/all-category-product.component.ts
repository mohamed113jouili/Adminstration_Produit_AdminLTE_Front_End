import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCategoryService } from 'src/app/services/product-category.service';

@Component({
  selector: 'app-all-category-product',
  templateUrl: './all-category-product.component.html',
  styleUrls: ['./all-category-product.component.css']
})
export class AllCategoryProductComponent implements OnInit {

  users = null;/*this.sau.getcurrentUsers()*/
  page = 1;
  pageSize = 4;
  collectionSize: number = 22;
  constructor(private router: Router,
    public categoryproductService: ProductCategoryService) { }

  ngOnInit(): void {
    this.refreshCountries();
    this.categoryproductService.initCategoryProduct();
  }
  navigatetoEditClient() {
    this.router.navigateByUrl("/managefootball/players/1")
  }

  navigatetoAddClient() {
    this.router.navigateByUrl("/admin/add-product-category")
  }


  deleteCategoryProduct() {

  }

  refreshCountries() {
    /* this.users
       .map((user, i) => ({ id: i + 1, ...user }))
       .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);*/
  }
}
