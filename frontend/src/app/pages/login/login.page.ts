import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'login-page',
  templateUrl: './login.page.html',
})
export class LoginPage implements OnInit {
  loading: boolean = false;
  showError: boolean = false;
  email: string = '';
  password: string = '';
  passwordVisible: boolean = false;
  constructor(private router: Router) {}

  navigateToSignupRoute() {
    this.router.navigate(['/signup']);
  }

  ngOnInit(): void {
    setTimeout(() => {
      axios
        .get('https://real-erin-cow-boot.cyclic.app/auth/checktoken', {
          withCredentials: true,
        })
        .then((response) => {
          if (response.status === 200) {
            this.router.navigate(['/home']);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }, 2000);
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
      this.loading = true;

      axios
        .post(
          'https://real-erin-cow-boot.cyclic.app/auth/login',
          {
            email,
            password,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response.status === 200) {
            this.showError = false;
            this.router.navigate(['/home']);
          }
        })
        .catch((error) => {
          this.loading = false;
          this.showError = true;
          console.error(error);
        });
    }
    return false;
  }
}
