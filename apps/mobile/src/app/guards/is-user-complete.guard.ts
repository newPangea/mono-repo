import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, switchMap, take } from 'rxjs/operators';
import { User } from '@pang/interface';
import { FIRESTORE_COLLECTION } from '@pang/const';

@Injectable({
  providedIn: 'root'
})
export class IsUserCompleteGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth, private router: Router, private db: AngularFirestore) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
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
                  return true;
                } else {
                  this.router.navigate(['/welcome/confirm']);
                  return false;
                }

              }),
            );
        } else {
          this.router.navigate(['/welcome']);
          return of(false);
        }
      }),
    );
  }

}
