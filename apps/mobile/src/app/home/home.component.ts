import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAlgolia } from '@pang/interface';

@Component({
  selector: 'pang-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private routrer: Router) {}

  goToUser(user: UserAlgolia) {
    this.routrer.navigate(['/home/user/', user.uid]);
  }
}
