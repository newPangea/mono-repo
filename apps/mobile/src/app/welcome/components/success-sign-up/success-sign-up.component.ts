import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'pang-success-sign-up',
  templateUrl: './success-sign-up.component.html',
  styleUrls: ['./success-sign-up.component.scss'],
})
export class SuccessSignUpComponent {
  constructor(private auth: AngularFireAuth, private router: Router)  {}

  logOut() {
    this.auth.signOut();
    this.router.navigate(['/welcome'])
  }
}
