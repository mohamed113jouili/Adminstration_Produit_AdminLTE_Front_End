import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DialogService } from 'src/app/services/dialog.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit {

  private _subjectproduct = new BehaviorSubject<number>(0);

  page = 1;
  pageSize = 4;
  collectionSize =12 /*this.users.length;*/
  constructor( private router: Router,public productService:ProductService,public dialogService: DialogService) { }

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
 

  showDialog(id: number) {
    const that = this;

    this._subjectproduct.next(id);
    this.dialogService.confirmThis("Are you sure to delete?", function () {

      that.productService.deleteProduct(that._subjectproduct.value)

    }, function () {


    })


  }

  refreshCountries() {
    /*this.sau.cu.value
      .map((user, i) => ({ id: i + 1, ...user }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);*/
  }

}
