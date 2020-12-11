import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivationStart, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  @ViewChild(RouterOutlet) outlet!: RouterOutlet;

  constructor(private router: Router
  ) { }

  ngOnInit(): void {
  /*   this.router.events.subscribe(e => {
      if (e instanceof ActivationStart && e.snapshot.outlet === "admin")
        this.outlet.deactivate();
    }); */
  }

}
