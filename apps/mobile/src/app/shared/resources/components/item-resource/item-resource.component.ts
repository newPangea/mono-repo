import { AngularFireAuth } from '@angular/fire/auth';
import { Component, Input, OnChanges } from '@angular/core';

import { LoadingController } from '@ionic/angular';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';

import { AlgoliaService } from '@pang/algolia';
import { Plugins } from '@capacitor/core';
import { ResourceInterface, UserAlgolia } from '@pang/interface';
import { ResourceService } from '@pang/core';
import { ResourceType } from '@pang/const';

const { App, Modals } = Plugins;

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
    public loadingController: LoadingController,
    private previewAnyFile: PreviewAnyFile,
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

  async openFile() {
    const loading = await this.loadingController.create({
      message: 'Downloading file...',
    });
    await loading.present();
    switch (this.resource.type) {
      case ResourceType.FILE:
      case ResourceType.IMAGE:
        this.previewAnyFile
          .preview(this.resource.url)
          .then(() => {
            loading.dismiss();
          })
          .catch(() => {
            loading.dismiss();
            return Modals.alert({
              title: 'Error',
              message: 'We have a error, try again later',
            });
          });
        break;
      case ResourceType.VIDEO:
        App.openUrl({ url: this.resource.link }).then(() => {
          loading.dismiss();
        });
        break;
    }
  }

  get fileIcon() {
    switch (this.resource.type) {
      case ResourceType.IMAGE:
        return 'assets/img/Image.svg';
      case ResourceType.VIDEO:
        return 'assets/img/Video icon.svg';
      case ResourceType.FILE:
        if (/^.*\.(pdf|PDF)/.test(this.resource.ref)) {
          return 'assets/img/PDF icon.svg';
        } else if (/^.*\.(docx|ppt)/.test(this.resource.ref)) {
          return 'assets/img/Wrod icon.svg';
        } else {
          return 'assets/img/Excel. icon.svg';
        }
    }
  }
}
