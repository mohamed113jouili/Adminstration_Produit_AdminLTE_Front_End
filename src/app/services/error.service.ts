import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SubErrorResponse } from '../models/sub-errorr-response';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private _listSubjectValidationError = new BehaviorSubject<string[]>([]);

  private _subjectDuplicateError = new BehaviorSubject<string>("");

  private _objectError = new BehaviorSubject<SubErrorResponse>({});

  private _subjectIsError = new BehaviorSubject<boolean>(false);

 
  constructor() { 
  //  this.subjectIsError.next(false)
  }


  


saveError(error:string){


let obje:SubErrorResponse=JSON.parse(error.toString())

this.objectError.next(obje);
this.subjectDuplicateError.next(error)

}









  //getter and setter 

  public get listSubjectValidationError() {
    return this._listSubjectValidationError;
  }
  public set listSubjectValidationError(value) {
    this._listSubjectValidationError = value;
  }

  public get subjectDuplicateError() {
    return this._subjectDuplicateError;
  }
  public set subjectDuplicateError(value) {
    this._subjectDuplicateError = value;
  }
  public get objectError() {
    return this._objectError;
  }
  public set objectError(value) {
    this._objectError = value;
  }
  public get subjectIsError() {
    return this._subjectIsError;
  }
  public set subjectIsError(value) {
    this._subjectIsError = value;
  }

public readonly isError=this.subjectIsError.asObservable()

 
}
