import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Client } from '../models/client';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private _listSubjectClient = new BehaviorSubject<Client[]>([]);
  private _subjectClient = new BehaviorSubject<Client>({});
  private _subjecttitleButton = new BehaviorSubject<String>("Add  Client");
  private _subjectIsUpdate = new BehaviorSubject<boolean>(false);
  private _subjectCurrentEditId = new BehaviorSubject<number>(0);

  //validate 
  private _subjectvalidteFirstName = new BehaviorSubject<boolean>(false);
  private _subjectvalidteEmail = new BehaviorSubject<boolean>(false);




  constructor(public http: HttpClient) { }

  //get all client 
  getAllClient() {

    return this.http.get<Client[]>(`${environment.apiUrl}/clients`)
      .pipe(map(resp => resp));

  }

  // get client by id 
  getClientByid(id: number) {

    return this.http.get(`${environment.apiUrl}/client/` + id)
      .pipe(map(resp => resp as Client));

  }

  // save client 
  saveClient(client: Client) {

    return this.http.post(`${environment.apiUrl}/save/client`, client)
      .pipe(map(resp => resp as Client));

  }

  // update client 
  updateClient(id: number, client: Client) {

    return this.http.put(`${environment.apiUrl}/update/client/` + id, client)
      .pipe(map(resp => resp as Client));

  }

  // delete client by id 
  deleteClientByid(id: number) {
    return this.http.delete(`${environment.apiUrl}/delete/client/` + id)
      .pipe(map(resp => resp as boolean));

  }

  initclient() {

    this.getAllClient().toPromise().then(

      rep => {
        this._listSubjectClient.next(rep)

      },
      error => {
        console.log(error)
      }

    )
  }


  //init in Component EditAddClientComponent
  initEditClient(id: number) {

    this.getClientByid(id).toPromise().then(

      rep => {
        console.log(rep)

        this.subjectClient.next(rep)


      },
      error => {
        console.log(error)
      }

    )
  }


  // delete in Component Client
  deleteClient(id: number) {

    this.deleteClientByid(id).toPromise().then(

      rep => {
        // filter list client by id deleted
        this.listSubjectClient.next(this.listSubjectClient.value.filter(function (el) {
          return el.id != id;;
        }))
      },
      error => {
        console.log(error)
      }
    )
  }

  /**validate email format */
  validateEmail(email: string) {
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(String(email).toLowerCase());
  }
  ///^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im    
  ///
  validatePhoneNumber(phoneNumber: string) {

    const regularExpression = /^[(]?[0-9]{3}[)]?[-\s\.]?[(]?[0-9]{3}?[)][-\s\.]?[0-9]{3,6}$/

    return regularExpression.test(String(phoneNumber));
  }


  //validate after send email format ,firstname, phonenumber
  validateSend() {


    if (this.subjectClient.value.firstname!.length > 3 && this.validateEmail(this.subjectClient.value.email!) &&
      this.validatePhoneNumber(this.subjectClient.value.phoneNumber!) && this.subjectClient.value.address!.length > 5) {

      return true;
    }
    return false;

  }






  /** access method getter */
  public get listSubjectClient() {
    return this._listSubjectClient;
  }
  public get subjectClient() {
    return this._subjectClient;
  }
  public get subjecttitleButton() {
    return this._subjecttitleButton;
  }

  public get subjectIsUpdate() {
    return this._subjectIsUpdate;
  }

  public get subjectCurrentEditId() {
    return this._subjectCurrentEditId;
  }

  public get subjectvalidteFirstName() {
    return this._subjectvalidteFirstName;
  }
  public set subjectvalidteFirstName(value) {
    this._subjectvalidteFirstName = value;
  }


  public get subjectvalidteEmail() {
    return this._subjectvalidteEmail;
  }
  public set subjectvalidteEmail(value) {
    this._subjectvalidteEmail = value;
  }

}
