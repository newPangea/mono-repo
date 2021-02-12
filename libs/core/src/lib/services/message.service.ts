import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { FUNCTION } from '@pang/const';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private angularFn: AngularFireFunctions) {}

  sendConfirmationCode(email: string) {
    const generateCode = this.angularFn.httpsCallable(FUNCTION.generateCode);
    return generateCode({ email });
  }

  confirmCode(code: string, email: string): Observable<{ valid: boolean }> {
    const confirmCode = this.angularFn.httpsCallable(FUNCTION.confirmCode);
    return confirmCode({ code, email });
  }
}
