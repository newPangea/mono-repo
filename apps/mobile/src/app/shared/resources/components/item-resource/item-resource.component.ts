import { Component, Input, OnChanges } from '@angular/core';
import { ResourceInterface, UserAlgolia } from '@pang/interface';
import { AlgoliaService } from '@pang/algolia';
import { AngularFireAuth } from '@angular/fire/auth';
import { ResourceService } from '@pang/core';

@Component({
  selector: 'pang-item-resource',
  templateUrl: './item-resource.component.html',
  styleUrls: ['./item-resource.component.scss'],
})
export class ItemResourceComponent implements OnChanges {
  @Input() resource: ResourceInterface;
  @Input() user: UserAlgolia;

  private uid: string;

  constructor(
    private algolia: AlgoliaService,
    private auth: AngularFireAuth,
    private resourceService: ResourceService,
  ) {}

  ngOnChanges(): void {
    if (this.resource && this.resource.uploadBy) {
      this.auth.currentUser.then(({ uid }) => (this.uid = uid));
    }
  }

  get isOwner() {
    return this.resource?.owner === this.uid;
  }

  get isShare() {
    return this.resource?.share?.includes(this.uid);
  }

  addResource() {
    return this.resourceService
      .resourceCollection()
      .doc(this.resource.uid)
      .update({ share: [...(this.resource.share ? this.resource.share : []), this.uid] });
  }

  removeResource() {
    return this.resourceService
      .resourceCollection()
      .doc(this.resource.uid)
      .update({ share: this.resource.share.filter((res) => res !== this.uid) });
  }
}
