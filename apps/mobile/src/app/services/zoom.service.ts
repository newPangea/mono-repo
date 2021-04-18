import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ZoomService {
  private elementSubject = new Subject<HTMLElement>();
  $element = this.elementSubject.asObservable();

  setElement(element: HTMLElement) {
    this.elementSubject.next(element);
  }
}
