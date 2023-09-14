import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'login-pages',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private router: Router) {}

  navigateToSignupRoute() {
    this.router.navigate(['/signup']);
  }
}
