import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { environment } from '@pang/mobile/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([{ path: 'welcome', loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomeModule) }], { initialNavigation: 'enabled' }),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.fire),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
