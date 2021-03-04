import { Component } from '@angular/core';
import { MessageService, UserService } from '@pang/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'pang-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent {
  code = '';
  load = false;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private route: Router,
    private auth: AngularFireAuth,
    private messageService: MessageService,
  ) {}

  confirmCode() {
    this.load = true;
    this.userService.validateCode(this.code).subscribe(
      (data) => {
        this.load = false;
        if (!data.valid) {
          this.snackBar.open('Your code is incorrect', 'close', { duration: 2000 });
        } else {
          this.route.navigate(['/welcome/preferences'])
        }
      },
      (err) => {
        this.load = false;
        console.log(err);
        this.snackBar.open('We can\'t validate your code', 'close', { duration: 2000 });
      },
    );
  }

  async generateCode() {
    const user = await this.auth.currentUser;
    this.messageService.sendConfirmationCode(user.email).subscribe();
    this.snackBar.open('New code was generated', 'close', { duration: 2000 });
  }
}
