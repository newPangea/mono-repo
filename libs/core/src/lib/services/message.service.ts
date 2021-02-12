import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { FUNCTION } from '@pang/const';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private angularFn: AngularFireFunctions, private auth: AngularFireAuth) {}

  sendConfirmationCode(email: string) {
    const generateCode = this.angularFn.httpsCallable(FUNCTION.generateCode);
    return generateCode({ email });
  }

  confirmCode(code: string): Observable<{valid: boolean}> {
    const confirmCode = this.angularFn.httpsCallable(FUNCTION.confirmCode);
    return from(this.auth.currentUser).pipe(switchMap((user) => confirmCode({ code, email: user.email })));
  }
}
