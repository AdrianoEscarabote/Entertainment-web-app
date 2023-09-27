import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'login-page',
  templateUrl: './login.page.html',
})
export class LoginPage {
  email: string = '';
  password: string = '';
  passwordVisible: boolean = false;
  constructor(private router: Router) {}

  navigateToSignupRoute() {
    this.router.navigate(['/signup']);
  }

  togglePasswordVisibility(fieldId: string) {
    const field = document.getElementById(fieldId) as HTMLInputElement;

    if (field) {
      field.type = this.passwordVisible ? 'password' : 'text';
      this.passwordVisible = !this.passwordVisible;
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const email = form.value.email;
      const password = form.value.password;

      axios
        .post('http://localhost:4000/auth/login', { email, password })
        .then((response) => {
          if (response.status === 200) {
            this.router.navigate(['/home']);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    return false;
  }
}
