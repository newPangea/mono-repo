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
        stagger(400, [animate('0.4s ease-out', style({ opacity: 1, transform: 'scale(1)' }))]),
      ]),
      query('@info', [stagger(400, [animate(400, style({ opacity: 1 }))])]),
      query('.user-action', [
        stagger(300, [animate('0.4s ease-out', style({ opacity: 1, transform: 'scale(1)' }))]),
      ]),
    ]),
  ]),
]);

export const info = trigger('info', []);

export const resourceAnimation = trigger('root', [
  transition(':enter', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]),
  transition(':leave', [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]),
]);
