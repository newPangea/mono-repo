import { Component, Input } from '@angular/core';
import { select, text } from '@storybook/addon-knobs';
import { Story, Meta } from '@storybook/angular';
import { UiModule } from '../../ui.module';
import { ButtonComponent } from './button.component';

@Component({
  selector: 'pang-btn',
  template: `<button pang-button [color]="color">{{text}}</button>`
})
class TestComponent {
  @Input() text: string
  @Input() color: 'primary' | 'secondary' | 'alert' = 'primary';
}

@Component({
  selector: 'pang-btn',
  template: `<button pang-flat-button [color]="color">{{text}}</button>`
})
class FlatTestComponent {
  @Input() text: string
  @Input() color: 'primary' | 'secondary' | 'alert' = 'primary';
}

export default {
  title: 'atomic/button',
  component: TestComponent,
} as Meta

export const Basic: Story<ButtonComponent> = () => ({
  moduleMetadata: {
    imports: [UiModule]
  },
  component: TestComponent,
  props: {
    color: select('color', ['primary', 'secondary', 'white'], 'primary'),
    text: text('text', 'button')
  },
})


export const Flat: Story<ButtonComponent> = () => ({
  moduleMetadata: {
    imports: [UiModule]
  },
  component: FlatTestComponent,
  props: {
    color: select('color', ['primary', 'secondary', 'white'], 'primary'),
    text: text('text', 'button')
  },
})
