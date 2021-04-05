import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { ConnectionService } from '@pang/core';
import { ConnectionInterface } from '@pang/interface';
import { ConnectionStatus } from '@pang/const';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'pang-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  $pendingConnection: Observable<ConnectionInterface[]>;
  load = true;

  constructor(private connection: ConnectionService) {}

  ngOnInit(): void {
    this.$pendingConnection = this.connection
      .getPendingConnections()
      .pipe(tap(() => (this.load = false)));
  }

  validateRequest(accept: boolean, request: ConnectionInterface) {
    if (accept) {
      this.connection.connection().doc(request.key).update({ status: ConnectionStatus.ACCEPTED });
    } else {
      this.connection.connection().doc(request.key).delete();
    }
  }
}
