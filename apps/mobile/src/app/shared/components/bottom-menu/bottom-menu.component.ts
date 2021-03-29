import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'pang-bottom-menu',
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.scss'],
})
export class BottomMenuComponent {
  constructor(private snackBar: MatSnackBar, private router: Router) {}

  soon() {
    this.snackBar.open('Available in the next update', 'close', { duration: 2000 });
  }

  goToGlobe() {
    this.router.navigate(['/', 'home']);
  }
}
