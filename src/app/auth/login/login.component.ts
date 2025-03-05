import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLogin = true; 

  constructor() { }

  ngOnInit(): void {
  }


  toggleForm() {
    this.isLogin = !this.isLogin; // Toggle the form state
  }

  onSubmit() {
    if (this.isLogin) {
      // Handle login form submission
      console.log('Logging in...');
    } else {
      // Handle registration form submission
      console.log('Registering new user...');
    }
  }

}
