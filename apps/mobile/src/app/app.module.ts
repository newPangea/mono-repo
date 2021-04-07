import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '@pang/mobile/environments/environment';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AlgoliaModule } from '@pang/algolia';
import { CoreModule } from '@pang/core';
import { IsUserCompleteGuard } from '@pang/mobile/app/guards/is-user-complete.guard';

import { AppComponent } from './app.component';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/database';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { HttpClientModule } from '@angular/common/http';

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
    AlgoliaModule.forRoot({
      apiKey: environment.algolia.apiKey,
      appId: environment.algolia.appId,
    }),
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.fire, 'myApp'),
    AngularFireStorageModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    HttpClientModule,
    IonicModule.forRoot(),
    MatIconModule,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
