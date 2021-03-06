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
import { NewPangeaLabelComponent } from './new-pangea-label/new-pangea-label.component';
import { GoBackDirective } from './directives/go-back.directive';
import { MatIconModule } from '@angular/material/icon';
import { HighlightPipe } from './pipes/highlight.pipe';
import { IconComponent } from './components/icon/icon.component';
import { HttpClientModule } from '@angular/common/http';
import { CountryFlagPipe } from './pipes/country-flag/country-flag.pipe';

@NgModule({
  imports: [
    CommonModule,
    MatRippleModule,
    IonicModule,
    MatInputModule,
    FormsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatIconModule,
    HttpClientModule,
  ],
  declarations: [
    ButtonComponent,
    DatePickerComponent,
    PhoneCodeComponent,
    AvatarWithLabelComponent,
    NewPangeaLabelComponent,
    GoBackDirective,
    HighlightPipe,
    IconComponent,
    CountryFlagPipe,
  ],
  providers: [DatePipe],
  exports: [
    ButtonComponent,
    DatePickerComponent,
    PhoneCodeComponent,
    AvatarWithLabelComponent,
    NewPangeaLabelComponent,
    GoBackDirective,
    HighlightPipe,
    IconComponent,
    CountryFlagPipe,
  ],
})
export class UiModule {}
