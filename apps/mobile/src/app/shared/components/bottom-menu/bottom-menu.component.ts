import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { select, State } from '@ngrx/store';

import { AppState } from '@pang/mobile/app/state/app.state';
import { ConnectionService } from '@pang/core';
import { selectConnectionNotification } from '@pang/mobile/app/state/connection/connection.selectors';

@Component({
  selector: 'pang-bottom-menu',
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.scss'],
})
export class BottomMenuComponent implements OnInit {
  $notification: Observable<number>;

  constructor(
    private snackBar: MatSnackBar,
    private connection: ConnectionService,
    private state: State<AppState>,
  ) {}

  ngOnInit(): void {
    this.state.pipe(select(selectConnectionNotification)).subscribe(console.log);
    this.$notification = this.connection
      .getPendingConnections()
      .pipe(map((connections) => connections.length));
  }

  soon() {
    this.snackBar.open('Available in the next update', 'close', { duration: 2000 });
  }
}
