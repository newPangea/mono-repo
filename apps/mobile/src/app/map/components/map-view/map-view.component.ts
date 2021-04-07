/// <reference types="@types/googlemaps" />
import { OnInit, Component, Input, OnDestroy, OnChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { User } from '@pang/interface';
import { UserService } from '@pang/core';
import { mapStyle } from '@pang/const';

import { MapsAPILoader } from '@agm/core';

import { Subscription } from 'rxjs';

mapStyle;

@Component({
  selector: 'pang-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss'],
})
export class MapViewComponent implements OnInit, OnDestroy, OnChanges {
  @Input() sLatitude;
  @Input() sLongitude;

  usersSubscription: Subscription;
  users: User[];

  latitude = 32.86391;
  longitude = -117.154312;
  zoom = 12;
  progress = false;
  addres: string;
  city: string;
  locations: { lat: number; lng: number }[];

  styles = mapStyle;

  private geoCoder: google.maps.Geocoder;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnChanges() {
    if (this.sLatitude && this.sLongitude) {
      this.latitude = Number(this.sLatitude);
      this.longitude = Number(this.sLongitude);
    }
  }

  ngOnInit() {
    this.usersSubscription = this.userService.getAll().subscribe((users) => {
      this.locations = [];
      this.users = users;
      this.users.forEach((user) => {
        if (user.school && user.school?.latitude) {
          this.locations.push({
            lng: user.school?.longitude,
            lat: user.school?.latitude,
          });
        }
      });
    });
    this.initPlacesAutocomplete();
  }

  ngOnDestroy() {
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
  }

  initPlacesAutocomplete() {
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder();
    });
  }

  getAddress(latitude: number, longitude: number) {
    this.geoCoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 18;
          this.addres = results[0].formatted_address;
          this.city = results[0].address_components[3].long_name;
          this.progress = false;
        } else {
          this.snackBar.open(
            'We couldn’t find results for your search, Try again using other keywords',
            'close',
            { duration: 2000 },
          );
        }
      } else {
        this.progress = false;
        this.snackBar.open(
          'Something went wrong fletching the information, please try again',
          'close',
          { duration: 2000 },
        );
      }
    });
  }
}
