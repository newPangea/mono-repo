/// <reference types="@types/googlemaps" />
import { MapsAPILoader } from '@agm/core';
import { OnInit, Component, NgZone, Input, OnDestroy, OnChanges } from '@angular/core';
import { UserService } from '@pang/core';
import { User } from '@pang/interface';
import { Subscription } from 'rxjs';
import { mapStyle } from '../../../../assets/globe-data/styles';

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
  locations;

  styles = mapStyle;

  private geoCoder: google.maps.Geocoder;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private userService: UserService,
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
      console.log(this.locations);
    });
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder();
    });
  }

  ngOnDestroy() {
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
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
          window.alert('No results found');
        }
      } else {
        this.progress = false;
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }
}
