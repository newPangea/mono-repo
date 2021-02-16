import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'new-pangea-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
})
export class SidebarMenuComponent {
  usersActive = false;
  schoolsActive = false;
  preferencesActive = false;

  constructor(private router: Router) {}

  goto(page: string) {
    switch (page) {
      case 'users':
        alert('Under development, please comeback soon!');
        break;
      case 'schools':
        this.router.navigate(['/', 'dashboard']);
        this.usersActive = false;
        this.schoolsActive = true;
        this.preferencesActive = false;
        break;
      case 'preferences':
        this.router.navigate(['/', 'dashboard', 'preferences']);
        this.usersActive = false;
        this.schoolsActive = false;
        this.preferencesActive = true;
        break;
    }
  }
}
