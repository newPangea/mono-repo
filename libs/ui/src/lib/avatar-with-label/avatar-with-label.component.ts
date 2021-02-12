import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pang-avatar-with-label',
  templateUrl: './avatar-with-label.component.html',
  styleUrls: ['./avatar-with-label.component.scss'],
})
export class AvatarWithLabelComponent implements OnInit {
  @Input() userAvatar: string;
  @Input() badgeLabel: string;
  @Input() badgeColor: string;

  constructor() {}

  ngOnInit(): void {}
}
