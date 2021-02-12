import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolService } from './services/school.service';

@NgModule({
  imports: [CommonModule],
  providers: [SchoolService]
})
export class CoreModule {}
