import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Preference } from '@pang/interface';

@Component({
  selector: 'new-pangea-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss'],
})
export class PreferencesComponent implements OnInit {
  preferenceForm: FormGroup;
  loading = false;
  constructor(private fireStore: AngularFirestore, formBuilder: FormBuilder) {
    this.preferenceForm = formBuilder.group({
      name: formBuilder.control(null, [Validators.required]),
    });
  }

  ngOnInit(): void {}

  createPreference() {
    this.loading = true;
    this;
  }

  private addPreference(preference: Preference) {}
}
