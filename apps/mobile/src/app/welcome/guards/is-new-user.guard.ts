import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, switchMap, take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { FIRESTORE_COLLECTION } from '@pang/const';
import { User } from '@pang/interface';

@Injectable({
  providedIn: 'root',
})
export class IsNewUserGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private router: Router, private db: AngularFirestore) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.afAuth.user.pipe(
      switchMap((user) => {
        if (user) {
          return this.db
            .doc<User>(`${FIRESTORE_COLLECTION.user}/${user.uid}`)
            .valueChanges()
            .pipe(
              take(1),
              map((student) => {
                if (student.validateCode) {
                  this.router.navigate(['/home']);
                } else {
                  this.router.navigate(['/welcome/confirm']);
                }
                return false;
              }),
            );
        } else {
          return of(true);
        }
      }),
    );
  }
}
