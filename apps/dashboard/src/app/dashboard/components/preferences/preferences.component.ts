import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { FIRESTORE_COLLECTION } from '@pang/const';
import { Preference } from '@pang/interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'new-pangea-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss'],
})
export class PreferencesComponent implements OnInit {
  preferences$: Observable<Preference[]>;
  preferenceForm: FormGroup;
  loading = false;
  constructor(private fireStore: AngularFirestore, formBuilder: FormBuilder) {
    this.preferenceForm = formBuilder.group({
      name: formBuilder.control(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.preferences$ = this.getAllPreferences();
  }

  createPreference(formGroupDirective: FormGroupDirective) {
    this.loading = true;
    const { name } = this.preferenceForm.value;
    const preference: Preference = {
      key: this.fireStore.createId(),
      name,
      createdAt: new Date().getTime(),
    };
    this.addPreference(preference)
      .then(() => {
        formGroupDirective.resetForm();
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
  }

  private addPreference(preference: Preference) {
    return this.fireStore
      .collection(FIRESTORE_COLLECTION.preference)
      .doc(preference.key)
      .set({ ...preference });
  }

  private getAllPreferences() {
    return this.fireStore
      .collection<Preference>(FIRESTORE_COLLECTION.preference, (ref) => ref.orderBy('name', 'asc'))
      .valueChanges();
  }
}
