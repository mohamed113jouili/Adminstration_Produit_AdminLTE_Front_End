import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';



@Component({
  selector: 'app-all-client',
  templateUrl: './all-client.component.html',
  styleUrls: ['./all-client.component.css']
})
export class AllClientComponent implements OnInit {
  page = 1;
  pageSize = 4;
  collectionSize = 12
  constructor(private router: Router, public clientService: ClientService) { }

  ngOnInit(): void {
    this.clientService.initclient();

  }
  navigatetoEditClient() {
    this.router.navigateByUrl("/managefootball/players/1")
  }

  navigatetoAddClient() {
    this.router.navigateByUrl("/admin/add-client")
  }
 

  refreshCountries() {
    /*this.sau.cu.value
      .map((user, i) => ({ id: i + 1, ...user }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);*/
  }

}
