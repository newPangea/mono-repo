import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Router } from '@angular/router';
import { FUNCTION } from '@pang/const';
import { take } from 'rxjs/operators';

@Component({
  selector: 'pang-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFn: AngularFireFunctions,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.validateEnabledUser();
  }

  private isActivedUser(): Promise<boolean> {
    return new Promise(async (resolve) => {
      const currentUserUid = (await this.angularFireAuth.currentUser).uid;
      if (!currentUserUid) {
        resolve(true);
      }
      this.angularFn
        .httpsCallable(FUNCTION.isActiveAuthUser)({ uid: currentUserUid })
        .pipe(take(1))
        .subscribe(
          (isActive) => resolve(isActive),
          () => resolve(false),
        );
    });
  }

  private async kickOutUser(): Promise<void> {
    await this.angularFireAuth.signOut();
    this.router.navigate(['/']);
  }

  private async validateEnabledUser(): Promise<void> {
    const isActiveUser = await this.isActivedUser();
    if (!isActiveUser) {
      this.kickOutUser();
    }
  }
}
