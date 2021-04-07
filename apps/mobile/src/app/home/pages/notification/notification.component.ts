import { Component, OnDestroy, OnInit, TrackByFunction } from '@angular/core';

import { select, State } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from '@pang/mobile/app/state/app.state';
import { ConnectionInterface } from '@pang/interface';
import { ConnectionService } from '@pang/core';
import { ConnectionStatus } from '@pang/const';
import { selectConnectionNotification } from '@pang/mobile/app/state/connection/connection.selectors';

@Component({
  selector: 'pang-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit, OnDestroy {
  load = true;
  pendingConnection: ConnectionInterface[] = [];
  private subscribe: Subscription;
  trackByFn: TrackByFunction<ConnectionInterface>;

  constructor(private connection: ConnectionService, private state: State<AppState>) {
    this.trackByFn = (index, item) => {
      return item.key;
    };
  }

  ngOnInit(): void {
    this.subscribe = this.state.pipe(select(selectConnectionNotification)).subscribe((value) => {
      this.pendingConnection = value;
      this.load = false;
    });
  }

  ngOnDestroy(): void {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
  }

  validateRequest(accept: boolean, request: ConnectionInterface) {
    this.pendingConnection = this.pendingConnection.filter((req) => req.key !== request.key);
    if (accept) {
      this.connection.connection().doc(request.key).update({ status: ConnectionStatus.ACCEPTED });
    } else {
      this.connection.connection().doc(request.key).delete();
    }
  }
}
