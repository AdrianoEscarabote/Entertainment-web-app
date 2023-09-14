import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'signup-page',
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  constructor(private router: Router) {}

  navigateToLoginRoute() {
    this.router.navigate(['/login']);
  }
}
