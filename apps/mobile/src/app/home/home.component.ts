import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Plugins } from '@capacitor/core';

import { User, UserAlgolia } from '@pang/interface';
import { School } from '@pang/models';

const { Device, PushNotifications, Modals } = Plugins;

@Component({
  selector: 'pang-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  //test: string;
  @Output() user: User;
  school: School;

  constructor(private router: Router) {}

  goToUser(user: UserAlgolia) {
    this.user = user;
  }

  goToSchool(school: School) {
    this.school = school;
    this.router.navigate(['map'], {
      queryParams: {
        sLatitude: this.school.latitude,
        sLongitude: this.school.longitude,
      },
    });
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
