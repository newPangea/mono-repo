import { Component, Input, OnChanges } from '@angular/core';
import { ResourceInterface, UserAlgolia } from '@pang/interface';
import { AlgoliaService } from '@pang/algolia';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'pang-item-resource',
  templateUrl: './item-resource.component.html',
  styleUrls: ['./item-resource.component.scss'],
})
export class ItemResourceComponent implements OnChanges {
  @Input() resource: ResourceInterface;
  @Input() user: UserAlgolia;
  isOwner: boolean;

  constructor(private algolia: AlgoliaService, private auth: AngularFireAuth) {}

  ngOnChanges(): void {
    if (this.resource && this.resource.uploadBy) {
      this.auth.currentUser.then(({ uid }) => (this.isOwner = this.resource.owner === uid));
    }
  }
}
