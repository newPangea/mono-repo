import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { MatRippleModule } from '@angular/material/core';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { IonicModule } from '@ionic/angular';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PhoneCodeComponent } from './components/phone-code/phone-code.component';
import { AvatarWithLabelComponent } from './avatar-with-label/avatar-with-label.component';

@NgModule({
  imports: [
    CommonModule,
    MatRippleModule,
    IonicModule,
    MatInputModule,
    FormsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
  ],
  declarations: [ButtonComponent, DatePickerComponent, PhoneCodeComponent, AvatarWithLabelComponent],
  providers: [DatePipe],
  exports: [ButtonComponent, DatePickerComponent, PhoneCodeComponent, AvatarWithLabelComponent],
})
export class UiModule {}
