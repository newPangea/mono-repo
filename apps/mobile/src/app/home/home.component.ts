import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';
import { UserAlgolia } from '@pang/interface';

const { Device, PushNotifications, Modals } = Plugins;

@Component({
  selector: 'pang-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private routrer: Router) {}

  goToUser(user: UserAlgolia) {
    this.routrer.navigate(['/home/user/', user.uid]);
  }

  ngOnInit(): void {
    Device.getInfo().then((data) => {
      if (data.platform !== 'web') {
        this.registerNotification();
      }
    });
  }

  registerNotification() {
    PushNotifications.requestPermission().then((result) => {
      if (result.granted) {
        return PushNotifications.register();
      } else {
        console.error('error ----->', 'error permits', result);
        return Modals.alert({
          title: 'Error notification',
          message: 'We have a error try to register notification',
        });
      }
    });
  }
}
