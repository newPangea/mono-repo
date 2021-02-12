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

const routes: Routes = [
  { path: '', component: WelcomeComponent, canActivate: [IsNewUserGuard] },
  { path: 'sign-up', component: SignUpComponent, canActivate: [IsNewUserGuard] },
  { path: 'confirm', component: ConfirmComponent },
  { path: 'success-sign-up', component: SuccessSignUpComponent, canActivate: [IsUserCompleteGuard] },
];

@NgModule({
  declarations: [WelcomeComponent, SignUpComponent, ConfirmComponent, SuccessSignUpComponent],
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
  ],
})
export class WelcomeModule {}
