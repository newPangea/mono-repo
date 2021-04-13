import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  previousUrl: string;
  actualUrl: string;
  private history: string[] = [];
  private isBack = false;

  constructor(private router: Router) {}

  initService() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.isBack) {
          this.isBack = false;
        } else {
          this.history.push(event.urlAfterRedirects);
          console.log(this.history);
        }
      }
    });
  }

  goBack() {
    this.isBack = true;
    this.history.pop();
    const back = this.history.length ? this.history[this.history.length - 1] : '/';
    const splitUrl = back.split('?');
    const query = splitUrl[1]?.split('&').reduce((previousValue, currentValue) => {
      const splitValue = currentValue.split('=');
      return { ...previousValue, [splitValue[0]]: splitValue[1] };
    }, {});
    this.router.navigate([splitUrl[0]], { queryParams: query ? query : {} });
  }
}
