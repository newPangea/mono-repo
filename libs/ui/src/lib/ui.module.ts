import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { MatRippleModule } from '@angular/material/core';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { IonicModule } from '@ionic/angular';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [CommonModule, MatRippleModule, IonicModule, MatInputModule, FormsModule, MatProgressSpinnerModule],
  declarations: [ButtonComponent, DatePickerComponent],
  providers: [DatePipe],
  exports: [ButtonComponent, DatePickerComponent],
})
export class UiModule {}
