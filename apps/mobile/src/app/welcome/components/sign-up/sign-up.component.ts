import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { COUNTRIES } from '@pang/const';
import { Student, studentConvert } from '@pang/interface';
import { Plugins } from '@capacitor/core';
import { SchoolService } from '@pang/core';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

const { Keyboard } = Plugins;

@Component({
  selector: 'pang-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  readonly countries = COUNTRIES;

  signFom: FormGroup;
  loading = false;
  constructor(
    formBuild: FormBuilder,
    private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private router: Router,
    private schoolService: SchoolService,
    private snackBar: MatSnackBar,
  ) {
    this.signFom = formBuild.group({
      name: ['', Validators.required],
      country: ['', Validators.required],
      date: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      schoolCode: ['', [Validators.required, Validators.pattern('[a-zA-Z]{1}[0-9]{8}')]],
    });
  }

  ngOnInit(): void {
    Keyboard.addListener('keyboardDidShow', () => {
      document.activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    Keyboard.setAccessoryBarVisible({ isVisible: true });
  }

  getErrorMessageByField(field: string): string {
    if (this.signFom.controls[field].hasError('required')) {
      return 'This field is required';
    } else if (this.signFom.controls[field].hasError('pattern') && field == 'email') {
      return 'Incorrect format, must be a valid email';
    } else if (this.signFom.controls[field].hasError('pattern') && field == 'schoolCode') {
      return 'Incorrect format, must be one letter and eight numbers';
    } else {
      if (field != 'password') return 'El campo no es válido';
    }
  }

  createAccount() {
    this.loading = true;
    const { email, password, schoolCode, date, ...rest } = this.signFom.value;
    const years13 = 410240376000;
    const differenceTime = Date.now() - (date as Date).getTime();
    if (differenceTime < years13) {
      this.loading = false;
      this.snackBar.open('you must be over 13 years old', 'close', { duration: 2000 });
      return
    }
    this.schoolService
      .findSchoolCode(schoolCode)
      .pipe(take(1))
      .subscribe((school) => {
        if (school.length > 0) {
          this.fireAuth
            .createUserWithEmailAndPassword(email, password)
            .then((data) => {
              const { uid } = data.user;
              const student: Student = {
                uid,
                email,
                validateCode: false,
                date,
                ...rest,
              };
              return this.fireStore.firestore.collection('student').withConverter(studentConvert).add(student);
            })
            .then(() => {
              this.router.navigate(['welcome', 'confirm']);
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
              this.loading = false;
            });
        } else {
          this.snackBar.open('The code submitted is invalid', 'close', { duration: 2000 });
          this.loading = false;
        }
      });
  }
}
