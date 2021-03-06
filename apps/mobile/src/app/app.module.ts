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

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions';

const app = firebase.initializeApp(environment.fire, 'myApp');
if (environment.emulate) {
  app.auth().useEmulator('http://localhost:9099');
  app.firestore().useEmulator('localhost', 8081);
  app.functions().useEmulator('localhost', 5001);
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
          path: 'globe',
          loadChildren: () => import('./globe/globe.module').then((m) => m.GlobeModule),
        },
        {
          path: '',
          redirectTo: 'welcome',
          pathMatch: 'full',
        },
      { path: 'globe', loadChildren: () => import('./globe/globe.module').then(m => m.GlobeModule) },
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
