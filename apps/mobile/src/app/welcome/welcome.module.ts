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


const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'confirm', component: ConfirmComponent },
];

@NgModule({
  declarations: [WelcomeComponent, SignUpComponent, ConfirmComponent],
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
