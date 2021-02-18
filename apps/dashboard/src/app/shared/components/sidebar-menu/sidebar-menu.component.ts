import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'new-pangea-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
})
export class SidebarMenuComponent {
  constructor(private router: Router) {}

  goTo(page: string) {
    switch (page) {
      case 'users':
        this.router.navigate(['/', 'dashboard', 'users']);
        break;
      case 'schools':
        this.router.navigate(['/', 'dashboard']);
        break;
      case 'preferences':
        this.router.navigate(['/', 'dashboard', 'preferences']);
        break;
    }
  }
}
