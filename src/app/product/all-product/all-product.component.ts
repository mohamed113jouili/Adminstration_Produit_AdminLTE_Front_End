import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit {


  page = 1;
  pageSize = 4;
  collectionSize =12 /*this.users.length;*/
  constructor( private router: Router,public productService:ProductService) { }

  ngOnInit(): void {
    this.refreshCountries();
    this.productService.initProduct();

  }
  navigatetoEditClient() {
    this.router.navigateByUrl("/managefootball/players/1")
  }

  navigatetoAddProduct() {
    this.router.navigateByUrl("/admin/add-product")
  }
 



  refreshCountries() {
    /*this.sau.cu.value
      .map((user, i) => ({ id: i + 1, ...user }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);*/
  }

}
