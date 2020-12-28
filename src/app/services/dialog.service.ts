import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ClientService } from './client.service';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private _subject = new Subject<any>();
  private _subjectButtonYesName = new BehaviorSubject<string>("Yes");

  private _subjectButtonNoName = new BehaviorSubject<string>("No");



  constructor(public d: ClientService) { }
  confirmThis(message: string, type: number, yesFn: () => void, noFn: () => void): any {
    this.setConfirmation(message, type, yesFn, noFn);
  }

  setConfirmation(message: string, type: number, yesnFn: () => void, noFn: () => void): any {
    const that = this;

    if (type == 1) {
      this.subjectButtonNoName.next("Vefify")
      this.subjectButtonYesName.next("Confirmed")
    }
    else if(type==0) {
      this.subjectButtonYesName.next("Yes")
      this.subjectButtonNoName.next("No")

    }
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

  //getter and setter 
  public get subject() {
    return this._subject;
  }
  public set subject(value) {
    this._subject = value;
  }

  public get subjectButtonYesName() {
    return this._subjectButtonYesName;
  }
  public set subjectButtonYesName(value) {
    this._subjectButtonYesName = value;
  }

  public get subjectButtonNoName() {
    return this._subjectButtonNoName;
  }
  public set subjectButtonNoName(value) {
    this._subjectButtonNoName = value;
  }
}
