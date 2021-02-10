import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { COUNTRIES } from '@pang/const';
import { Student, studentConvert } from '@pang/interface';

@Component({
  selector: 'pang-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  readonly countries = COUNTRIES;

  signFom: FormGroup;
  loading = false;

  constructor(
    formBuild: FormBuilder,
    private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private router: Router,
  ) {
    this.signFom = formBuild.group({
      name: ['', Validators.required],
      country: ['', Validators.required],
      date: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      schoolCode: ['', [Validators.required]],
    });
  }

  createAccount() {
    this.loading = true;
    const { email, password, ...rest } = this.signFom.value;
    this.fireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        const { uid } = data.user;
        const student: Student = {
          uid,
          email,
          validateCode: false,
          ...rest,
        };
        return this.fireStore.firestore.collection('student').withConverter(studentConvert).add(student);
      })
      .then(() => {
        this.router.navigate(['welcome', 'confirm'])
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        this.loading = false;
      })
  }
}
