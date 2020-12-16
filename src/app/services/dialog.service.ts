import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ClientService } from './client.service';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private _subject = new Subject<any>();  
 
  
  constructor(public d:ClientService){}
  confirmThis(message: string, yesFn: () => void, noFn: () => void): any {  
      this.setConfirmation(message, yesFn, noFn);  
  }  

  setConfirmation(message: string, yesnFn: () => void, noFn: () => void): any {  
      const that = this;  
      
      this.subject.next({  
          type: 'confirm',  
          text: message,  
          yesFn(): any {  
          
                  that.subject.next(false); // This will close the modal  
                  
                  yesnFn();  
                 // that.d.deleteClient(2)
              },  
          noFn(): any {  
              that.subject.next(false);  
              noFn();  
          }  
      });  

   

  }  
  

  getMessage(): Observable<any> {  
      return this.subject.asObservable();  
  }  

  public get subject() {
    return this._subject;
  }
  public set subject(value) {
    this._subject = value;
  }
}
