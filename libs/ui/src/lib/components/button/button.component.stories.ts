import { Component, Input } from '@angular/core';
import { select, text } from '@storybook/addon-knobs';
import { Story, Meta } from "@storybook/angular";
import { ButtonComponent } from './button.component';

@Component({
  selector: 'test-btn',
  template: `<button pangButton [color]="color">{{text}}</button>`
})
class TestComponent {
  @Input() text: string
  @Input() color: 'primary' | 'secondary' | 'alert' = 'primary';
}

export default {
  title: 'Button',
  component: TestComponent
} as Meta

export const bigButton: Story<ButtonComponent> = () => ({
  moduleMetadata: {
    declarations: [ButtonComponent]
  },
  component: TestComponent,
  props: {
    color: select('color', ['primary', 'secondary'], 'primary'),
    text: text('text', 'button')
  },
})
