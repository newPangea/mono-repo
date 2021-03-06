/* eslint-disable @angular-eslint/component-selector */
import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  ViewEncapsulation,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatRipple } from '@angular/material/core';

const BUTTON_HOST_ATTRIBUTES = ['pang-flat-button'];

@Component({
  selector: 'button[pang-button], button[pang-flat-button]',
  exportAs: 'pangButton',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent implements OnChanges {
  element: HTMLButtonElement;

  @Input() color: 'primary' | 'secondary' | 'alert' | 'white' = 'primary';
  @Input() disabled: boolean;
  @Input() loading = false;

  @ViewChild(MatRipple) ripple: MatRipple;

  constructor(elementRef: ElementRef<HTMLButtonElement>) {
    this.element = elementRef.nativeElement;
    this.element.classList.add('btn-basic');
    this.element.classList.add(this.color);
    this.element.disabled = this.disabled;

    for (const att of BUTTON_HOST_ATTRIBUTES) {
      if (this.element.hasAttribute(att)) {
        this.element.classList.add(att);
      }
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    const colorChange = changes['color'];
    if (colorChange) {
      if (colorChange.previousValue) {
        this.element.classList.remove(colorChange.previousValue);
      }
      this.element.classList.add(colorChange.currentValue);
    }
    if (changes['disabled'] || changes['loading']) {
      this.element.disabled = this.disabled || this.loading;
    }
  }
}
