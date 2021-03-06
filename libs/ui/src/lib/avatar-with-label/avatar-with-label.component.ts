import { Component, Input } from '@angular/core';

@Component({
  selector: 'pang-avatar-with-label',
  templateUrl: './avatar-with-label.component.html',
  styleUrls: ['./avatar-with-label.component.scss'],
})
export class AvatarWithLabelComponent {
  @Input() size = 64;
  @Input() userAvatar: string;
  @Input() badgeLabel: string;
  @Input() badgeColor: string;
}
