import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UiModule } from '@pang/ui';
import { LoginComponent } from './pages/login/login.component';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from '../../../material.module'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarMenuComponent } from './common-components/sidebar-menu/sidebar-menu.component';


@NgModule({
  declarations: [AppComponent, LoginComponent, DashboardComponent, SidebarMenuComponent],
  imports: [BrowserModule, UiModule, AppRoutingModule, MaterialModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
