import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { MatRippleModule } from '@angular/material/core';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { IonicModule } from '@ionic/angular';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AvatarWithLabelComponent } from './avatar-with-label/avatar-with-label.component';

@NgModule({
  imports: [CommonModule, MatRippleModule, IonicModule, MatInputModule, FormsModule, MatProgressSpinnerModule],
  declarations: [ButtonComponent, DatePickerComponent, AvatarWithLabelComponent],
  providers: [DatePipe],
  exports: [ButtonComponent, DatePickerComponent, AvatarWithLabelComponent],
})
export class UiModule {}
