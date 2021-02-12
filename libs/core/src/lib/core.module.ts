import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolService } from './services/school.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireFunctionsModule } from '@angular/fire/functions';

@NgModule({
  imports: [CommonModule, AngularFireAuthModule, AngularFirestoreModule, AngularFireFunctionsModule],
  providers: [SchoolService],
})
export class CoreModule {}
