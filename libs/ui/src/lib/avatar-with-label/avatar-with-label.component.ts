import { Component, Input } from '@angular/core';

@Component({
  selector: 'pang-avatar-with-label',
  templateUrl: './avatar-with-label.component.html',
  styleUrls: ['./avatar-with-label.component.scss'],
})
export class AvatarWithLabelComponent {
  @Input() userAvatar: string = 'assets/images/logo-1.png'; // TO DO: USE CONSTANT
  @Input() badgeLabel: string;
  @Input() badgeColor: string;
}