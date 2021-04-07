import { AngularFireModule } from '@angular/fire';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { UiModule } from '@pang/ui';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './pages/login/login.component';

import { environment } from 'dashboard/environments/environment';
import { SharedModule } from 'dashboard/app/shared/shared.module';

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
  declarations: [AppComponent, LoginComponent],
  imports: [
    AngularFireModule.initializeApp(environment.fire, 'myApp'),
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatTableModule,
    ReactiveFormsModule,
    SharedModule,
    UiModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
