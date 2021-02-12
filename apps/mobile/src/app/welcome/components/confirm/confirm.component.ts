import { Component } from '@angular/core';
import { MessageService } from '@pang/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'pang-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent {
  code = '';
  load = false;

  constructor(private messageService: MessageService, private snackBar: MatSnackBar, private route: Router) {}

  confirmCode() {
    this.load = true;
    this.messageService.confirmCode(this.code).subscribe(
      (data) => {
        this.load = false;
        if (!data.valid) {
          this.snackBar.open('Your code is incorrect', 'close', { duration: 2000 });
        } else {
          this.route.navigate(['/welcome/success-sign-up'])
        }
      },
      (err) => {
        this.load = false;
        console.log(err);
        this.snackBar.open('We can\'t validate your code', 'close', { duration: 2000 });
      },
    );
  }
}
