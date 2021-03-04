import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UiModule } from '@pang/ui';
import { CoreModule } from '@pang/core';

import { WelcomeComponent } from './welcome.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { IsNewUserGuard } from './guards/is-new-user.guard';
import { SuccessSignUpComponent } from './components/success-sign-up/success-sign-up.component';
import { IsUserCompleteGuard } from '../guards/is-user-complete.guard';
import { ToggleComponent } from './components/toggle/toggle.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { IsLoginGuard } from '../guards/is-login.guard';
import { WelcomeContainerComponent } from './components/welcome-container/welcome-container.component';
import { MatButtonModule } from '@angular/material/button';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { MatRippleModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';

const routes: Routes = [
  { path: '', component: WelcomeComponent, canActivate: [IsNewUserGuard] },
  { path: 'confirm', component: ConfirmComponent, canActivate: [IsLoginGuard] },
  { path: 'preferences', component: PreferencesComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent, canActivate: [IsNewUserGuard] },
  { path: 'success-sign-up', component: SuccessSignUpComponent, canActivate: [IsUserCompleteGuard] },
];

@NgModule({
  declarations: [
    WelcomeComponent,
    SignUpComponent,
    ConfirmComponent,
    SuccessSignUpComponent,
    ToggleComponent,
    SignInComponent,
    WelcomeContainerComponent,
    PreferencesComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    UiModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    CoreModule,
    MatSnackBarModule,
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatChipsModule,
  ],
})
export class WelcomeModule {}
