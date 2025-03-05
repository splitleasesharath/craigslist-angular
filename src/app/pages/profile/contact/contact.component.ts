import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {


  @ViewChild('phonePanel') phonePanel: MatExpansionPanel;
  @ViewChild('emailPanel') emailPanel: MatExpansionPanel;
  @ViewChild('addressPanel') addressPanel: MatExpansionPanel;

  phoneList = ['Phone 1', 'Phone 2', 'Phone 3', 'Phone 4'];
  emailList = ['Email 1', 'Email 2', 'Email 3', 'Email 4'];
  addressList = ['Address 1', 'Address 2', 'Address 3', 'Address 4'];

  phoneFormGroup!: FormGroup;
  emailFormGroup!: FormGroup;
  public addressFormGroup!: FormGroup;

  userName = '';

  constructor() { }

  ngOnInit(): void {

    this.buildPhoneForm()
    this.buildEmailForm()
    this.buildAddressForm()
  }

  buildPhoneForm() {
    this.phoneFormGroup = new FormGroup({
      idcompany_contact_phone: new FormControl(),
      phone_number: new FormControl(),
      phone_type: new FormControl("2"),
      usFormat: new FormControl(true),
      isprimary: new FormControl(true),

    });
  }

  buildEmailForm() {
    this.emailFormGroup = new FormGroup({
      idcompany_contact_email_address: new FormControl(),
      email_address: new FormControl('', Validators.email),
      isprimary: new FormControl(true),
    });
  }

  buildAddressForm() {
    this.addressFormGroup = new FormGroup({
      address_type: new FormControl('2'),
      idcompany_contact_address: new FormControl(''),
      address: new FormControl('', [Validators.required]),
      address2: new FormControl(''),
      country: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      pincode: new FormControl('', [Validators.required]),
      isprimary: new FormControl(true),
    });
  }


  openPanel(panel: MatExpansionPanel) {
    panel.open();
  }

  getAddressOnZip() {

  }

  checkValidations() {
    if (
      (this.addressFormGroup.get('idcompany_contact_address').value == '' ||
        this.addressFormGroup.get('idcompany_contact_address').value == null) &&
      !this.checkFieldsValid()
    ) {
      this.addressFormGroup.controls['address'].setValidators([
        Validators.required,
      ]);
      this.addressFormGroup.controls['city'].setValidators([
        Validators.required,
      ]);
      this.addressFormGroup.controls['state'].setValidators([
        Validators.required,
      ]);
      this.addressFormGroup.controls['country'].setValidators([
        Validators.required,
      ]);
      this.addressFormGroup.controls['pincode'].setValidators([
        Validators.required,
      ]);
      this.addressFormGroup.controls['address2'].setValidators([
        Validators.required,
      ]);
      this.addressFormGroup.controls['isprimary'].setValidators([
        Validators.required,
      ]);
    } else {
      this.addressFormGroup.controls['address'].clearValidators();
      this.addressFormGroup.controls['city'].clearValidators();
      this.addressFormGroup.controls['state'].clearValidators();
      this.addressFormGroup.controls['country'].clearValidators();
      this.addressFormGroup.controls['pincode'].clearValidators();
      this.addressFormGroup.controls['address2'].clearValidators();
      this.addressFormGroup.controls['isprimary'].clearValidators();
    }

    this.addressFormGroup.controls[
      'idcompany_contact_address'
    ].updateValueAndValidity();
    this.addressFormGroup.controls['address'].updateValueAndValidity();
    this.addressFormGroup.controls['city'].updateValueAndValidity();
    this.addressFormGroup.controls['state'].updateValueAndValidity();
    this.addressFormGroup.controls['country'].updateValueAndValidity();
    this.addressFormGroup.controls['pincode'].updateValueAndValidity();
    this.addressFormGroup.controls['address2'].updateValueAndValidity();
    this.addressFormGroup.controls['isprimary'].updateValueAndValidity();
  }

  checkFieldsValid() {
    const a = this.addressFormGroup.controls['address'].value;
    const b = this.addressFormGroup.controls['address'].value;
    const c = this.addressFormGroup.controls['city'].value;
    const d = this.addressFormGroup.controls['state'].value;
    const e = this.addressFormGroup.controls['country'].value;
    const f = this.addressFormGroup.controls['pincode'].value;
    const g = this.addressFormGroup.controls['address2'].value;
    // const h  = this.addressFormGroup.controls['isprimary'].value;
    return a || b || c || d || e || f || g; // || h );
  }

  copyToClipBoard() {
    const usrName = this.userName + '\n';
    const address = this.addressFormGroup.get('address').value
      ? this.addressFormGroup.get('address').value
      : '';
    const address2 = this.addressFormGroup.get('address2').value
      ? ', ' + this.addressFormGroup.get('address2').value + '\n'
      : '';

    const city = this.addressFormGroup.get('city').value
      ? this.addressFormGroup.get('city').value
      : '';
    const state = this.addressFormGroup.get('state').value
      ? ', ' + this.addressFormGroup.get('state').value
      : '';
    const country = this.addressFormGroup.get('country').value
      ? ', ' + this.addressFormGroup.get('country').value
      : '';
    const pincode = this.addressFormGroup.get('pincode').value
      ? ', ' + this.addressFormGroup.get('pincode').value
      : '';

    const copyToText =
      usrName + address + address2 + city + state + pincode + country;
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = copyToText;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

}
