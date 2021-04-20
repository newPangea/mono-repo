import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Plugins, CameraResultType, CameraPhoto } from '@capacitor/core';

import { FIRESTORE_COLLECTION } from '@pang/const';
import { Preference } from '@pang/interface';
import { UserService } from '@pang/core';
import { MatSnackBar } from '@angular/material/snack-bar';

const { Camera, Device, Keyboard } = Plugins;

@Component({
  selector: 'pang-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss'],
})
export class PreferencesComponent implements OnInit {
  imgSrc: string;
  preferenceTags: Observable<Preference[]>;
  tagSelected: { [key: string]: Preference } = {};
  bio: string;
  load = false;
  private image: CameraPhoto;

  constructor(
    private db: AngularFirestore,
    private userService: UserService,
    private auth: AngularFireAuth,
    private router: Router,
    private storage: AngularFireStorage,
    private snackBar: MatSnackBar,
  ) {
    this.preferenceTags = this.db
      .collection<Preference>(FIRESTORE_COLLECTION.preference)
      .valueChanges();
  }

  ngOnInit(): void {
    Device.getInfo().then((data) => {
      if (data.platform !== 'web') {
        Keyboard.addListener('keyboardDidShow', () => {
          document.activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
        Keyboard.setAccessoryBarVisible({ isVisible: true });
      }
    });
  }

  async takePicture() {
    try {
      this.image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
      });
      this.imgSrc = this.image.dataUrl;
    } catch (e) {}
  }

  checkItem(tag: Preference) {
    if (this.tagSelected[tag.key]) {
      delete this.tagSelected[tag.key];
    } else {
      this.tagSelected[tag.key] = tag;
    }
  }

  async saveData() {
    this.load = true;
    let urlImag: string;
    if (this.image) {
      this.snackBar.open('Uploading photo', 'close', { duration: 1500 });
      urlImag = await this.loadPhoto();
      this.snackBar.open('Uploading complete', 'close', { duration: 1500 });
    }
    const preferences = Object.values(this.tagSelected);
    const user = await this.auth.currentUser;
    const preferencesKey = [];
    preferences.forEach((element) => {
      preferencesKey.push(element.key);
    });
    await this.userService.savePreferences(
      user.uid,
      preferences,
      preferencesKey,
      this.bio,
      urlImag,
    );
    await this.router.navigate(['/home']);
  }

  async loadPhoto() {
    const user = await this.auth.currentUser;
    const ref = this.storage.ref(`${user.uid}/profile.${this.image.format}`);
    const file = await fetch(this.imgSrc).then((res) => res.blob());
    const task = ref.put(file);
    task.percentageChanges().subscribe((num) => {
      this.snackBar.open(`${num.toFixed(2)}% uploading...`, 'close', { duration: 500 });
    });
    return task.then((data) => data.ref.getDownloadURL());
  }
}
