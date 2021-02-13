import { Component, Input } from '@angular/core';

@Component({
  selector: 'pang-new-pangea-label',
  templateUrl: './new-pangea-label.component.html',
  styleUrls: ['./new-pangea-label.component.scss'],
})
export class NewPangeaLabelComponent {
  @Input() badgeLabel: string;
  @Input() badgeColor: string;
}
