import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { COUNTRIES } from '@pang/const';
import { User } from '@pang/interface';
import { Plugins } from '@capacitor/core';
import { SchoolService, UserService } from '@pang/core';
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
    private router: Router,
    private schoolService: SchoolService,
    private snackBar: MatSnackBar,
    private userService: UserService,
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
    Keyboard.setAccessoryBarVisible({ isVisible: true })
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
    const code = 'S' + schoolCode.substr(1);
    if (differenceTime < years13) {
      this.loading = false;
      this.snackBar.open('you must be over 13 years old', 'close', { duration: 2000 });
      return;
    }
    this.schoolService
      .findSchoolCode(code)
      .pipe(take(1))
      .subscribe((school) => {
        if (school.length > 0) {
          const user: User = {
            uid: null,
            email,
            validateCode: false,
            date,
            schoolCode: code,
            code: schoolCode,
            ...rest,
          };
          this.userService
            .createStudent(user, password)
            .then(() => {
              return this.router.navigate(['welcome', 'confirm']);
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
