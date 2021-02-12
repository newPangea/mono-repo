import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { FUNCTION } from '@pang/const';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private angularFn: AngularFireFunctions) {}

  sendConfirmationCode(email: string) {
    const generateCode = this.angularFn.httpsCallable(FUNCTION.generateCode);
    return generateCode({ email });
  }
}
