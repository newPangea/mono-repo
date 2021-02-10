import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './services/loginService/login.service';

@Component({
  selector: 'new-pangea-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public hidePassword = true;
  public isLogin = false;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private loginService: LoginService,
    ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['admin@newpangea.com', [Validators.required, Validators.email]],
      password: ['12345678', [Validators.required]],
    });
  }

  login() {
    const { email } = this.loginForm.value;
    const { password } = this.loginForm.value;
    if ((email && email != 'admin@newpangea.com') || (password && password != '12345678')) {
      alert('Incorrect credentials');
    } else {
      this.isLogin = true;
      this.loginService
      .loginWithEmail(email, password)
      .then((fireUser) => {
        if (fireUser) {
          this.router.navigate(['/', 'dashboard']);
          this.isLogin = false;
        }else{
          alert('Incorrect credentials');
        }
      })
    }
  }

  forgotPassword(): void {
    const { email } = this.loginForm.value;
    console.log(email);
  }
}
