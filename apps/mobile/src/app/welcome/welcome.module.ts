import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UiModule } from '@pang/ui';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'sign-up', component: SignUpComponent },
];

@NgModule({
  declarations: [WelcomeComponent, SignUpComponent],
  imports: [CommonModule, RouterModule.forChild(routes), UiModule],
})
export class WelcomeModule {}
