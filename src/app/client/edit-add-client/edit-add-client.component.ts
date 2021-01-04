import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryISO, PhoneNumberFormat, SearchCountryField, TooltipLabel } from 'ngx-intl-tel-input';
import { Client } from 'src/app/models/client';
import { PhoneNumber } from 'src/app/models/phonenumber';
import { ClientService } from 'src/app/services/client.service';
import { DialogService } from 'src/app/services/dialog.service';
import { ErrorService } from 'src/app/services/error.service';


@Component({
  selector: 'app-edit-add-client',
  templateUrl: './edit-add-client.component.html',
  styleUrls: ['./edit-add-client.component.scss'],
  providers: []

})
export class EditAddClientComponent implements OnInit {
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];

  clientForm!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder,
    public clientService: ClientService, private arouter: ActivatedRoute, public es: ErrorService,
    public dialogService: DialogService) { }

  ngOnInit(): void {
    this.initClientForm();
    this.initEditClient();

    this.es.objectError.subscribe(se => {

      if (se.type == 100) {

        this.showErrorDialog(this.dialogService.message(se.name!));
      }
    })



  }




  addOReditClient() {

    if (this.clientService.validateSend()) {

      this.clientService.subjectIsUpdate.value == true ?
        this.updateClient(this.clientService.subjectCurrentEditId.value) :
        this.addClient()
    }

  }


  // add client 
  addClient() {


    let client: Client = this.clientForm.value;
    client.phoneNumber = this.clientService.subjectvalidtePhoneNumber.value.e164Number
    console.log("this.clientForm.value" + client.phoneNumber);
    //console.log(this.updatePhoneNumberFormat(client))

    this.clientService.saveClient(client).toPromise().then(

      rep => {
        console.log(rep)
        this.navigatetoAllClient()
      },
      error => {
        console.log(error)
      }

    )
  }

  //update client 
  updateClient(id: number) {
    let client: Client = this.clientForm.value;

    client.phoneNumber = this.clientService.subjectvalidtePhoneNumber.value.e164Number

    this.clientService.updateClient(id, client).toPromise().then(

      rep => {
        console.log(rep)
        this.navigatetoAllClient()
      },
      error => {
        console.log(error)
      }

    )


  }

  initClientForm() {
    this.clientForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      registerDate: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      zipcode: ['', Validators.required],
      city: ['', Validators.required]

    });
  }

  onChange(event: PhoneNumber) {

    this.clientService.subjectvalidtePhoneNumber.next(event)
    //if(event.e164Number!=null){
    // console.log(event.e164Number);

    //}
  }

  initEditClient() {
    this.arouter.paramMap.subscribe(params => {

      if (params.get('id') !== null) {
        {
          this.clientService.initEditClient(Number(params.get('id')));
          this.clientService.subjecttitleButton.next("Update Client");
          this.clientService.subjecttitleHedar.next("UPDATE CLIENT ");
          this.clientService.subjectIsUpdate.next(true);
          this.clientService.subjectCurrentEditId.next(Number(params.get('id')));

        }

      }
      else {
        {
          this.clientService.subjectClient.value.firstname = ""
          this.clientService.subjectClient.value.lastname = ""
          this.clientService.subjectClient.value.address = ""
          this.clientService.subjectClient.value.zipcode = undefined
          this.clientService.subjectClient.value.city = ""
          this.clientService.subjectClient.value.email = ""
          this.clientService.subjectClient.value.phoneNumber = ""
          this.clientService.subjecttitleButton.next("Add  Client");
          this.clientService.subjecttitleHedar.next("ADD NEW CLIENT ");

          this.clientService.subjectIsUpdate.next(false);
        }

      }

    });
  }


  get formControls() {
    return this.clientForm.controls;
  }

  navigatetoAllClient() {
    this.router.navigateByUrl("/admin/all-client")

  }


  navigatetoAllClientt() {
    this.router.navigateByUrl("/admin/all-client")
  }
  showErrorDialog(message: string) {
    const that = this;

    this.dialogService.confirmThis(message, 2, function () {


    }, function () {

    })


  }




}
