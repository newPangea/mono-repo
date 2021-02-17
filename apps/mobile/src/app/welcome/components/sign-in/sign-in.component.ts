import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Plugins } from '@capacitor/core';

const { Keyboard, Device } = Plugins;

@Component({
  selector: 'pang-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signFom: FormGroup;
  loading = false;
  constructor(formBuild: FormBuilder, private fireAuth: AngularFireAuth) {
    this.signFom = formBuild.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    Device.getInfo().then((data) => {
      if (data.platform !== 'web') {
        Keyboard.addListener('keyboardDidShow', () => {
          document.activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
        Keyboard.setAccessoryBarVisible({ isVisible: true });
      }
    });
  }

  signIn(): void {
    this.loading = true;
    const { email, password } = this.signFom.value;
    this.fireAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
  }
}
