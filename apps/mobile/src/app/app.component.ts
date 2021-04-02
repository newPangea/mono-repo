import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { UserService } from '@pang/core';

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from '@capacitor/core';
import { Router } from '@angular/router';

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
  ) {}

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
                    this.router.navigate(['/home/user/', notification.data.to]);
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
                this.router.navigate(['/home/user/', notification.data.to]);
                break;
            }
          },
        );
      }
    });
  }
}
