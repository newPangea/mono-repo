import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'pang-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  signFom: FormGroup

  constructor(formBuild: FormBuilder) {
    this.signFom = formBuild.group({
      name: ['', Validators.required],
      country: ['', Validators.required],
      date: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.email]],
      schoolCode: ['', [Validators.required, Validators.email]],
    })
  }
}
