/// <reference types="@types/googlemaps" />
import { MapsAPILoader } from '@agm/core';
import { OnInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { mapStyle } from '../../../../assets/globe-data/styles';

@Component({
  selector: 'pang-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss'],
})
export class MapViewComponent implements OnInit {
  latitude = 32.7068176;
  longitude = -117.190456;
  zoom = 12;
  progress = false;
  addres: string;
  city: string;

  styles = mapStyle;

  private geoCoder: google.maps.Geocoder;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {}

  ngOnInit() {
    console.log('inits');
    console.log(this.styles);
    //load Places Autocomplete
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
          window.alert('No results found');
        }
      } else {
        this.progress = false;
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }
}
