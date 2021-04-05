import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '@pang/mobile/environments/environment';
import { IonicModule } from '@ionic/angular';
import { IsUserCompleteGuard } from '@pang/mobile/app/guards/is-user-complete.guard';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AlgoliaModule } from '@pang/algolia';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/database';

const app = firebase.initializeApp(environment.fire, 'myApp');
if (environment.emulate) {
  app.auth().useEmulator('http://localhost:9099');
  app.firestore().useEmulator('localhost', 8081);
  app.functions().useEmulator('localhost', 5001);
  app.database().useEmulator('localhost', 9000);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        {
          path: 'welcome',
          loadChildren: () => import('./welcome/welcome.module').then((m) => m.WelcomeModule),
        },
        {
          path: 'home',
          loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
          canActivate: [IsUserCompleteGuard],
        },
        {
          path: 'map',
          loadChildren: () => import('./map/map.module').then((m) => m.MapModule),
          canActivate: [IsUserCompleteGuard],
        },
        {
          path: '',
          redirectTo: 'welcome',
          pathMatch: 'full',
        },
      ],
      { initialNavigation: 'enabled' },
    ),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.fire, 'myApp'),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireFunctionsModule,
    IonicModule.forRoot(),
    AlgoliaModule.forRoot({
      apiKey: environment.algolia.apiKey,
      appId: environment.algolia.appId,
    }),
    MatIconModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
