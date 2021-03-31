import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { UserService } from '@pang/core';

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from '@capacitor/core';

const { PushNotifications } = Plugins;

@Component({
  selector: 'pang-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService, private auth: AngularFireAuth) {}

  ngOnInit(): void {
    PushNotifications.addListener('registration', async (token: PushNotificationToken) => {
      const user = await this.auth.currentUser;
      if (user) {
        await this.userService.updateUser(user.uid, { token: token.value });
      }
    });

    PushNotifications.addListener('registrationError', (error) => {
      console.error('Error on registration', JSON.stringify(error));
    });

    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotification) => {
      alert('Push received');
    });

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        alert('Push action performed: ');
      },
    );
  }
}
