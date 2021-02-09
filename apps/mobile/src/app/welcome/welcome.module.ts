import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import { UiModule } from '@pang/ui';

const routes: Routes = [{ path: '', component: WelcomeComponent }];

@NgModule({
  declarations: [WelcomeComponent],
  imports: [CommonModule, RouterModule.forChild(routes), UiModule],
})
export class WelcomeModule {}
