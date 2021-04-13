import { AngularFireAuth } from '@angular/fire/auth';
import { Component, Input, OnChanges } from '@angular/core';

import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

import { AlgoliaService } from '@pang/algolia';
import { Plugins } from '@capacitor/core';
import { ResourceInterface, UserAlgolia } from '@pang/interface';
import { ResourceService } from '@pang/core';
import { ResourceType } from '@pang/const';

const { App } = Plugins;

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
    private previewAnyFile: PreviewAnyFile,
    private resourceService: ResourceService,
    private photoViewer: PhotoViewer,
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

  openFile() {
    switch (this.resource.type) {
      case ResourceType.FILE:
        this.previewAnyFile.preview(this.resource.url).then();
        break;
      case ResourceType.IMAGE:
        this.photoViewer.show(this.resource.url, this.resource.name, { share: true });
        break;
      case ResourceType.VIDEO:
        App.openUrl({ url: this.resource.link }).then();
        break;
    }
  }
}
