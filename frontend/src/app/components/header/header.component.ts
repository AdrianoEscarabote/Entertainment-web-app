import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(private route: ActivatedRoute) {}

  isRouteActive(routeName: string): boolean {
    return this.route.snapshot.url[0]?.path === routeName;
  }
}
