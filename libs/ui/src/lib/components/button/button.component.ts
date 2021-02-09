/* eslint-disable @angular-eslint/component-selector */
import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  ViewEncapsulation,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'button[pangButton]',
  exportAs: 'pangButton',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent implements OnChanges {
  private element: HTMLButtonElement;

  @Input() color: 'primary' | 'secondary' | 'alert' | 'white' = 'primary';

  constructor(elementRef: ElementRef<HTMLButtonElement>) {
    this.element = elementRef.nativeElement;
    this.element.classList.add('btn-basic');
    this.element.classList.add(this.color);
  }
  ngOnChanges(changes: SimpleChanges): void {
    const colorChange = changes['color'];
    if (colorChange) {
      if(colorChange.previousValue) {
        this.element.classList.remove(colorChange.previousValue);
      }
      this.element.classList.add(colorChange.currentValue)
    }
  }

}
