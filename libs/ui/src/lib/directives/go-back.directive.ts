import { Directive, HostListener } from '@angular/core';
import { Location } from '@angular/common';

@Directive({
  selector: 'button[pangGoBack], a[pangGoBack]',
})
export class GoBackDirective {
  constructor(private location: Location) {}

  @HostListener('click')
  goBack() {
    this.location.back();
  }
}
