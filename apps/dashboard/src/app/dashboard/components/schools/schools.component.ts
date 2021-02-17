/// <reference types="@types/googlemaps" />
import { Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { School } from '@pang/models';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { GeneralService } from 'dashboard/app/shared/services/generalService/general.service';
import { SchoolService } from '@pang/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'new-pangea-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.scss'],
})
export class SchoolsComponent implements OnInit, OnDestroy {
  public schoolForm: FormGroup;
  public isLoading = false;
  public schoolSubscription: Subscription;
  public title: string;
  public schools: School[];
  showFiller = false;
  public progress = false;
  public isPublishing = false;
  opened = false;
  updating = false;
  public school: School;

  //codes
  public tCode: string;
  public sCode: string;
  public pCode: string;
  public aCode: string;
  public eCode: string;
  public code: string;

  //map
  latitude = 32.7068176;
  longitude = -117.190456;
  zoom = 12;
  addres: string;
  city: string;
  mapVisible = false;

  //table
  dataSource: MatTableDataSource<School>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('epltable') epltable: ElementRef;

  displayedColumns: string[] = ['name', 'tcode', 'scode', 'pcode', 'acode', 'ecode', 'see'];

  private geoCoder: google.maps.Geocoder;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(
    private formBuilder: FormBuilder,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private generalService: GeneralService,
    private schoolsService: SchoolService,
    private snackBar: MatSnackBar,
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.isLoading = true;
    this.updating = false;
    //subscribe to schools to load data table
    this.schoolSubscription = this.schoolsService.getAll().subscribe((schools) => {
      this.schools = schools;
      this.dataSource.data = schools;
      this.isLoading = false;
    });

    //initialize map data for scenario 0
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.isPublishing = false;
    this.addres = '';
    this.title = 'Schools';
    this.schoolForm = this.formBuilder.group({
      schoolName: ['', [Validators.required]],
      geoLocation: ['', [Validators.required]],
    });
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder();

      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          this.progress = true;
          //get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.getAddress(this.latitude, this.longitude);
          this.addres = place.formatted_address;
        });
      });
    });
  }

  markerDragEnd($event: MouseEvent) {
    this.progress = true;
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
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

  generateCodes() {
    this.code = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 8; i++) {
      this.code += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    this.tCode = 'T' + this.code;
    this.sCode = 'S' + this.code;
    this.pCode = 'P' + this.code;
    this.aCode = 'A' + this.code;
    this.eCode = 'E' + this.code;
  }

  addSchool() {
    this.isPublishing = true;
    const { schoolName } = this.schoolForm.value;
    const school = new School(
      this.generalService.getFirestoreId(),
      schoolName,
      this.addres,
      this.latitude,
      this.longitude,
      this.aCode,
      this.tCode,
      this.sCode,
      this.pCode,
      this.eCode,
    );
    this.schoolsService.add(school);
    //remove data from drawer
    this.schoolForm.controls['schoolName'].setValue(null);
    this.schoolForm.controls['geoLocation'].setValue(null);
    this.isPublishing = false;
    this.opened = false;
    this.ngOnInit();
  }

  toggleMap() {
    this.mapVisible = !this.mapVisible;
  }

  seeSchool(key: string) {
    this.mapVisible = false;

    this.school = null;
    if (key) {
      this.opened = true;
      this.updating = true;
      this.dataSource.data.forEach((element) => {
        if (element.key == key) {
          this.school = element;
          this.schoolForm.controls['schoolName'].setValue(this.school.name);
          this.schoolForm.controls['geoLocation'].setValue(this.school.addres);
          this.tCode = this.school.tcode;
          this.sCode = this.school.scode;
          this.pCode = this.school.pcode;
          this.aCode = this.school.acode;
          this.eCode = this.school.ecode;
          this.latitude = this.school.latitude;
          this.longitude = this.school.longitude;
        }
      });
    }
  }

  restartDrawer() {
    this.opened = true;
    this.mapVisible = false;
    this.schoolForm.controls['schoolName'].setValue(null);
    this.schoolForm.controls['geoLocation'].setValue(null);
    this.latitude = 32.7068176;
    this.longitude = -117.190456;
    this.generateCodes();
  }

  update() {
    this.isPublishing = true;
    const { schoolName } = this.schoolForm.value;
    const data = {
      name: schoolName,
      addres: this.addres,
      latitude: this.latitude,
      longitude: this.longitude,
      acode: this.aCode,
      pcode: this.tCode,
      tcode: this.sCode,
      scode: this.pCode,
      ecode: this.eCode,
    };

    this.schoolsService.updateSchool(this.school.key, data);
    this.snackBar.open('School updated!', 'close', { duration: 2000 });
    //remove data from drawer
    this.schoolForm.controls['schoolName'].setValue(null);
    this.schoolForm.controls['geoLocation'].setValue(null);
    this.isPublishing = false;
    this.opened = false;
  }

  ngOnDestroy() {
    if (this.schoolSubscription) {
      this.schoolSubscription.unsubscribe();
    }
  }
}
