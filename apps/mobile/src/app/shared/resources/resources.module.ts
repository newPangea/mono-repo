import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';

import { UiModule } from '@pang/ui';

import { ResourcesComponent } from './resources.component';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [ResourcesComponent],
  exports: [ResourcesComponent],
  imports: [CommonModule, MatButtonModule, UiModule, MatRippleModule],
})
export class ResourcesModule {}
