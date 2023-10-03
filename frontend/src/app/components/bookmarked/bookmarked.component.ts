import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'bookmarked-component',
  templateUrl: './bookmarked.component.html',
})
export class BookmarkedComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    axios
      .get('https://real-erin-cow-boot.cyclic.app/auth/checktoken')
      .then((response) => {
        if (response.status === 200) {
          return;
        }
      })
      .catch((error) => {
        this.router.navigate(['/login']);
      });
  }
}
