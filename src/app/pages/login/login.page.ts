import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'login-page',
  templateUrl: './login.page.html',
})
export class LoginPage {
  constructor(private router: Router) {}

  navigateToSignupRoute() {
    this.router.navigate(['/signup']);
  }
}
