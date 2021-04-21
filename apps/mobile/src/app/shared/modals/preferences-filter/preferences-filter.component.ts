import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { FIRESTORE_COLLECTION } from '@pang/const';
import { Preference } from '@pang/interface';
import { Observable, Subscription } from 'rxjs';
import { PreferenceInterface } from '../interfaces/preferences-interface';

@Component({
  selector: 'pang-preferences-filter',
  templateUrl: './preferences-filter.component.html',
  styleUrls: ['./preferences-filter.component.scss'],
})
export class PreferencesFilterComponent implements OnInit, OnDestroy {
  selectedPreferences: PreferenceInterface[] = [];
  preferences: PreferenceInterface[] = [];
  preferenceTags: Observable<Preference[]>;
  preferenceSubscription: Subscription;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { preferences: PreferenceInterface[] },
    private db: AngularFirestore,
    private bottomSheetRef: MatBottomSheetRef<PreferencesFilterComponent>,
  ) {
    this.preferenceTags = this.db
      .collection<Preference>(FIRESTORE_COLLECTION.preference)
      .valueChanges();
  }

  ngOnInit(): void {
    this.preferenceSubscription = this.preferenceTags.subscribe((preferences) => {
      preferences.forEach((element) => {
        this.preferences.push({
          name: element.name,
          key: element.key,
          checked: false,
        });
      });
      if (this.data && this.data.preferences && this.data.preferences.length > 0) {
        this.selectedPreferences = this.data.preferences;
        this.activateChecks();
      }
    });
  }

  activateChecks() {
    if (this.selectedPreferences && this.selectedPreferences.length > 0) {
      this.preferences.forEach((selected) => {
        this.selectedPreferences.forEach((preference) => {
          if (preference.key == selected.key) {
            selected.checked = true;
          }
        });
      });
    }
  }

  togglePreference(preference: PreferenceInterface, event: MatCheckboxChange) {
    if (event.checked == true) {
      this.selectedPreferences.push({
        name: preference.name,
        key: preference.key,
        checked: true,
      });
    } else {
      this.selectedPreferences = this.selectedPreferences.filter(
        (element) => element.key !== preference.key,
      );
    }
  }

  ngOnDestroy() {
    if (this.preferenceSubscription) {
      this.preferenceSubscription.unsubscribe();
    }
  }

  filter() {
    this.bottomSheetRef.dismiss(this.selectedPreferences);
  }
}
