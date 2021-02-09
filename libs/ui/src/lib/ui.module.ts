import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  imports: [CommonModule, MatRippleModule],
  declarations: [ButtonComponent],
  exports: [ButtonComponent],
})
export class UiModule {}
