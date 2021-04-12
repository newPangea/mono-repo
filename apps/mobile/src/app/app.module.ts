import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { environment } from '@pang/mobile/environments/environment';

import { AlgoliaModule } from '@pang/algolia';
import {
  connectionFeatureKey,
  ConnectionReducer,
} from '@pang/mobile/app/state/connection/connection.reducer';
import { ConnectionEffects } from '@pang/mobile/app/state/connection/connection.effects';
import { CoreModule } from '@pang/core';
import { IsUserCompleteGuard } from '@pang/mobile/app/guards/is-user-complete.guard';

import { AppComponent } from './app.component';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/database';
import { ResourcesEffects } from '@pang/mobile/app/state/resources/resources.effects';
import {
  resourcesFeatureKey,
  resourcesReducer,
} from '@pang/mobile/app/state/resources/resources.reducer';

const app = firebase.initializeApp(environment.fire, 'myApp');
if (environment.emulate) {
  app.auth().useEmulator('http://localhost:9099');
  app.firestore().useEmulator('localhost', 8081);
  app.functions().useEmulator('localhost', 5001);
  app.database().useEmulator('localhost', 9000);
}

const routes: Routes = [
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
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    AlgoliaModule.forRoot({ apiKey: environment.algolia.apiKey, appId: environment.algolia.appId }),
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.fire, 'myApp'),
    AngularFireStorageModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    MatIconModule,
    EffectsModule.forRoot([ConnectionEffects, ResourcesEffects]),
    HttpClientModule,
    IonicModule.forRoot(),
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
    StoreModule.forRoot(
      {
        [connectionFeatureKey]: ConnectionReducer,
        [resourcesFeatureKey]: resourcesReducer,
      },
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      },
    ),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
