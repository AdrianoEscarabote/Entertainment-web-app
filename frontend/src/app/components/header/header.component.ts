import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  activeRoute: string = '';
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.activeRoute =
          this.activatedRoute.snapshot.firstChild?.routeConfig?.path || '';
      });
  }
}
