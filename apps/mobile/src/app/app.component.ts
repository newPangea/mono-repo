import { AngularFireAuth } from '@angular/fire/auth';
import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from '@capacitor/core';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';

import { loadPendingConnection } from '@pang/mobile/app/state/connection/connection.actions';

import { UserService } from '@pang/core';
import { NavigationService } from '@pang/ui';
import {
  loadResourcesDoc,
  loadResourcesImage,
  loadResourcesVideo,
} from '@pang/mobile/app/state/resources/resources.actions';

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
    private ngZone: NgZone,
    private navigate: NavigationService,
  ) {
    this.auth.authState.pipe(filter((user) => !!user)).subscribe(() => {
      this.store.dispatch(loadPendingConnection());
      this.store.dispatch(loadResourcesVideo());
      this.store.dispatch(loadResourcesImage());
      this.store.dispatch(loadResourcesDoc());
    });
    this.navigate.initService();
  }

  ngOnInit(): void {
    Device.getInfo().then((data) => {
      if (data.platform !== 'web') {
        PushNotifications.addListener('registration', (token: PushNotificationToken) => {
          this.ngZone.run(async () => {
            const user = await this.auth.currentUser;
            if (user) {
              await this.userService.updateUser(user.uid, { token: token.value });
            }
          });
        });

        PushNotifications.addListener('registrationError', (error) => {
          console.error('Error on registration', JSON.stringify(error));
        });

        PushNotifications.addListener(
          'pushNotificationReceived',
          (notification: PushNotification) => {
            this.ngZone.run(() => {
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
            });
          },
        );

        PushNotifications.addListener(
          'pushNotificationActionPerformed',
          ({ notification }: PushNotificationActionPerformed) => {
            this.ngZone.run(() => {
              switch (notification.data.event) {
                case 'connection':
                  this.router.navigate(['/home/notification']);
                  break;
              }
            });
          },
        );
      }
    });
  }
}
