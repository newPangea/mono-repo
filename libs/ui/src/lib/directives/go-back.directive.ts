import { Directive, HostListener } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import { Router } from '@angular/router';

@Directive({
  selector: 'button[pangGoBack], a[pangGoBack]',
})
export class GoBackDirective {
  constructor(private router: Router, private navigation: NavigationService) {}

  @HostListener('click')
  goBack() {
    this.navigation.goBack();
  }
}
