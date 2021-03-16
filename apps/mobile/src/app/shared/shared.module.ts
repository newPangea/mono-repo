import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomMenuComponent } from './components/bottom-menu/bottom-menu.component'

@NgModule({
  declarations: [
    BottomMenuComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [BottomMenuComponent]
})

export class SharedModule {}