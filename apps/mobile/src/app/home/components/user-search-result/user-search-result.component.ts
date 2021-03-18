import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { UserAlgolia } from '@pang/interface';

@Component({
  selector: 'pang-user-search-result',
  template: `<a class="user-search" [routerLink]="link">
    <pang-avatar-with-label [size]="24" [userAvatar]="user.imgUrl"></pang-avatar-with-label>
    <span class="text" [innerHTML]="user.name | highlight: searchText"></span>
  </a>`,
  styleUrls: ['./user-search-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSearchResultComponent {
  @Input() user: UserAlgolia;
  @Input() searchText: string;

  get link() {
    return this.user ? `/home/user/${this.user.objectID}` : '';
  }
}
