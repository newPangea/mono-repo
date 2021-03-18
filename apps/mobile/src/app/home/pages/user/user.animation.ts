import {
  animate,
  group,
  query,
  sequence,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const circleAnimation2 = trigger('circles', [
  transition(':enter', [
    sequence([
      group([
        query('@info', [style({ opacity: 0 })]),
        query('.user-action', [style({ opacity: 0, transform: 'scale(0)' })]),
      ]),
      query('.circle', [
        style({ opacity: 0, transform: 'scale(0)' }),
        stagger(600, [animate('0.6s ease-out', style({ opacity: 1, transform: 'scale(1)' }))]),
      ]),
      query('@info', [stagger(300, [animate(600, style({ opacity: 1 }))])]),
      query('.user-action', [
        stagger(600, [animate('0.5s ease-out', style({ opacity: 1, transform: 'scale(1)' }))]),
      ]),
    ]),
  ]),
]);

export const info = trigger('info', []);
