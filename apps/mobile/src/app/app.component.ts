import { Component, OnInit } from '@angular/core';

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
  title = 'mobile';

  ngOnInit(): void {
    PushNotifications.addListener('registration', (token: PushNotificationToken) => {
      console.log(token.value, 'token');
    });

    PushNotifications.addListener('registrationError', (error: any) => {
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
