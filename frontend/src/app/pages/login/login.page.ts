import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';

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

  constructor(private router: Router, private Title: Title) {}

  navigateToSignupRoute() {
    this.router.navigate(['/signup']);
  }

  ngOnInit(): void {
    this.Title.setTitle('Login | Entertainment web App');
    setTimeout(() => {
      axios
        .get(`${environment.apiUrl}/auth/checktoken`, {
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
          `${environment.apiUrl}/auth/login`,
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
