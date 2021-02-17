import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolService } from './services/school.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { UserRoleLabelPipe } from './pipes/user-role-label/user-role-label.pipe';
import { UserRoleColorPipe } from './pipes/user-role-color/user-role-color.pipe';

@NgModule({
  imports: [CommonModule, AngularFireAuthModule, AngularFirestoreModule, AngularFireFunctionsModule],
  providers: [SchoolService],
  declarations: [UserRoleLabelPipe, UserRoleColorPipe],
  exports: [UserRoleLabelPipe, UserRoleColorPipe],
})
export class CoreModule {}
