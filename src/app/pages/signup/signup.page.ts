import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'signup-page',
  templateUrl: './signup.page.html',
})
export class SignupPage {
  constructor(private router: Router) {}

  navigateToLoginRoute() {
    this.router.navigate(['/login']);
  }
}
