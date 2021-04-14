import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from '@capacitor/core';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';

import {
  loadConnections,
  loadPendingConnection,
} from '@pang/mobile/app/state/connection/connection.actions';
import { UserService } from '@pang/core';

const { PushNotifications, Device, Modals } = Plugins;

@Component({
  selector: 'pang-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private userService: UserService,
    private auth: AngularFireAuth,
    private router: Router,
    private store: Store,
  ) {
    this.auth.authState.pipe(filter((user) => !!user)).subscribe(() => {
      this.store.dispatch(loadPendingConnection());
      this.store.dispatch(loadConnections());
    });
  }

  ngOnInit(): void {
    Device.getInfo().then((data) => {
      if (data.platform !== 'web') {
        PushNotifications.addListener('registration', async (token: PushNotificationToken) => {
          const user = await this.auth.currentUser;
          if (user) {
            await this.userService.updateUser(user.uid, { token: token.value });
          }
        });

        PushNotifications.addListener('registrationError', (error) => {
          console.error('Error on registration', JSON.stringify(error));
        });

        PushNotifications.addListener(
          'pushNotificationReceived',
          (notification: PushNotification) => {
            switch (notification.data.event) {
              case 'connection':
                Modals.confirm({
                  cancelButtonTitle: 'Close',
                  title: 'request Connection',
                  message: 'You have a new request connection',
                  okButtonTitle: 'View',
                }).then(({ value }) => {
                  if (value) {
                    this.router.navigate(['/home/notification']);
                  }
                });
                break;
            }
          },
        );

        PushNotifications.addListener(
          'pushNotificationActionPerformed',
          ({ notification }: PushNotificationActionPerformed) => {
            switch (notification.data.event) {
              case 'connection':
                this.router.navigate(['/home/notification/']);
                break;
            }
          },
        );
      }
    });
  }
}
