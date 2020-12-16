import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  message: any;  
  constructor(  
      private confirmDialogService: DialogService  
  ) { }  

  ngOnInit(): any {  
     /** 
      *   This function waits for a message from alert service, it gets 
      *   triggered when we call this from any other component 
      */  
      this.confirmDialogService.getMessage().subscribe(message => {  
          this.message = message;  

          //console.log( message.noFn())
         ;
          
      });  
  } 
}
