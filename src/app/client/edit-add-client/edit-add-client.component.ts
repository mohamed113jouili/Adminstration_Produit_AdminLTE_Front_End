import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { ErrorService } from 'src/app/services/error.service';


@Component({
  selector: 'app-edit-add-client',
  templateUrl: './edit-add-client.component.html',
  styleUrls: ['./edit-add-client.component.css'],
  providers: [ErrorService]

})
export class EditAddClientComponent implements OnInit {
  clientForm!: FormGroup;
  inputDate = "12/3/2020"

  constructor(private router: Router, private formBuilder: FormBuilder,
    public clientService: ClientService, private arouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.initClientForm();
    this.initEditClient();

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

    console.log(this.updatePhoneNumberFormat(client))

    this.clientService.saveClient(this.updatePhoneNumberFormat(client)).toPromise().then(

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
    console.log(this.updatePhoneNumberFormat(client))
    this.clientService.updateClient(id, this.updatePhoneNumberFormat(client)).toPromise().then(

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




  initEditClient() {
    this.arouter.paramMap.subscribe(params => {

      if (params.get('id') !== null) {
        {
          this.clientService.initEditClient(Number(params.get('id')));
          this.clientService.subjecttitleButton.next("Update Client");
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


  updatePhoneNumberFormat(client: Client) {
    var array: string[] = Array.from(client.phoneNumber!);

    let correctPhoneNumberFormat = ""

    for (let i = 0; i < array.length; i++) {


      if (array[i] == "(" || array[i] == ")" || array[i] == "-") {

        array.splice(i, 1)
      }

      correctPhoneNumberFormat = correctPhoneNumberFormat + array[i];

    }
    client.phoneNumber = "";
    client.phoneNumber = correctPhoneNumberFormat;
    if (!correctPhoneNumberFormat.startsWith("+")) {
      client.phoneNumber = "+" + correctPhoneNumberFormat;

    }

    return client;


  }

  navigatetoAllClientt() {
    this.router.navigateByUrl("/admin/all-client")
  }
}
