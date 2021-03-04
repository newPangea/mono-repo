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
          path: 'preferences',
          loadChildren: () => import('./preference/preference.module').then((m) => m.PreferenceModule),
          canActivate: [IsUserCompleteGuard]
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
    AngularFireModule.initializeApp(environment.fire),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    IonicModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
