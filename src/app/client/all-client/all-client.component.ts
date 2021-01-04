import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ClientService } from 'src/app/services/client.service';
import { DialogService } from 'src/app/services/dialog.service';



@Component({
  selector: 'app-all-client',
  templateUrl: './all-client.component.html',
  styleUrls: ['./all-client.component.css']
})
export class AllClientComponent implements OnInit {
  page = 1;
  pageSize = 4;
  collectionSize = 12
  private _subjecidclient = new BehaviorSubject<number>(0);

  
  constructor(private router: Router, public clientService: ClientService, public dialogService: DialogService) { }

  ngOnInit(): void {
    this.clientService.initclient();

  }


  navigatetoAddClient() {
    this.router.navigateByUrl("/admin/add-client")
  }


  refreshCountries() {
    /*this.sau.cu.value
      .map((user, i) => ({ id: i + 1, ...user }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);*/
  }

  showDialog(id: number) {
    const that = this;

    this.subjecidclient.next(id);
    this.dialogService.confirmThis("Are you sure to delete?",0, function () {

      that.clientService.deleteClient(that.subjecidclient.value)

    }, function () {


    })


  }

  public get subjecidclient() {
    return this._subjecidclient;
  }

}
