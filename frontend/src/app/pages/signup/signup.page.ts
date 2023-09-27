import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'signup-page',
  templateUrl: './signup.page.html',
})
export class SignupPage {
  showError: boolean = false;
  errorText: string = '';
  email: string = '';
  password: string = '';
  confirmpassword: string = '';
  passwordVisible: boolean = false;
  confirmpasswordVisible: boolean = false;
  constructor(private router: Router) {}

  navigateToLoginRoute() {
    this.router.navigate(['/login']);
  }

  togglePasswordVisibility(fieldId: string) {
    const field = document.getElementById(fieldId) as HTMLInputElement;

    if (field) {
      field.type = this.passwordVisible ? 'password' : 'text';
      this.passwordVisible = !this.passwordVisible;
    }
  }

  toggleConfirmPasswordVisibility(fieldId: string) {
    const field = document.getElementById(fieldId) as HTMLInputElement;

    if (field) {
      field.type = this.confirmpasswordVisible ? 'password' : 'text';
      this.confirmpasswordVisible = !this.confirmpasswordVisible;
    }
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    const confirmpassword = form.value.confirmpassword;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (form.valid && password === confirmpassword && emailRegex.test(email)) {
      axios
        .post('http://localhost:4000/auth/signup', {
          email,
          password,
          confirmpassword,
        })
        .then((response) => {
          if (response.status === 201) {
            this.router.navigate(['/home']);
          }
        })
        .catch((error) => {
          this.showError = true;
          this.errorText = error.response.data as string;
        });
    } else if (!emailRegex.test(email)) {
      this.showError = true;
      this.errorText = 'Email is not in a valid format';
    } else {
      this.showError = true;
      this.errorText = 'Password does not match';
    }

    return false;
  }
}