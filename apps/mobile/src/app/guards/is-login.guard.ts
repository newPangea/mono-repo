import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class IsLoginGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.afAuth.user.pipe(
      map((user) => !!user),
      tap((isLogin) => {
        if (!isLogin) {
          this.router.navigate(['/welcome']);
        }
      }),
    );
  }
}
