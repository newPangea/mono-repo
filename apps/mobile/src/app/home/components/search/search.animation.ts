import { animate, state, style, transition, trigger } from '@angular/animations';

export const positionSearch = trigger('positionSearch', [
  state('false', style({ padding: '0 20px', top: '70px' })),
  transition('false => true', animate('0.3s ease-out', style({ padding: 0, top: 0 }))),
  transition('true => false', animate('0.3s ease-out')),
]);
