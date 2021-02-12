import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, switchMap, take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { FIRESTORE_COLLECTION } from '@pang/const';
import { Student } from '@pang/interface';

@Injectable({
  providedIn: 'root',
})
export class IsNewUserGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private router: Router, private db: AngularFirestore) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.afAuth.user.pipe(
      switchMap((user) => {
        if (user) {
          return this.db
            .doc<Student>(`${FIRESTORE_COLLECTION.student}/${user.uid}`)
            .valueChanges()
            .pipe(
              take(1),
              map((student) => {
                if (student.validateCode) {
                  this.router.navigate(['/preferences']);
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
