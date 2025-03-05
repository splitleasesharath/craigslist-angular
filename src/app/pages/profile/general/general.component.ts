import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.buildForm()
  }

  ngOnInit(): void {
  }

  buildForm(){
    this.form = this.fb.group({
      title: ['mr', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      spouse: [''],
      company: [''],
      jobtitle: [''],
      url: [''],
      dob: [''],
      dod: [''],
      consignment: [''],
      maxDiscount: [0, Validators.min(0)],
      normalDiscount: [0, Validators.min(0)],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      console.log('Form is invalid');
    }
  }

}
