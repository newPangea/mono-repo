import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'new-pangea-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public hidePassword = true;
  public isLogin = false;

  constructor(private formBuilder: FormBuilder, private router: Router,) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        'admin@newpangea.com',
        [Validators.required, Validators.email],
      ],
      password: [
        '12345678',
        [Validators.required],
      ],
    });
  }

  login(){
    this.isLogin = true;
    const { email } = this.loginForm.value;
    const { password } = this.loginForm.value;
    if( (email && email != 'admin@newpangea.com') || (password && password != '12345678')){
      alert('Incorrect credentials')
    }else{
      console.log('login in')
      console.log(this.router.navigate(['/', 'dashboard']))
      this.router.navigate(['/', 'dashboard']);
    }
    this.isLogin = false;
  }

  forgotPassword(): void {
    const { email } = this.loginForm.value;
    console.log(email);
  }

}
