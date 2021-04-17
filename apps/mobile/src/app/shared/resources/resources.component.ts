import { AfterViewInit, Component, ElementRef, Input, Renderer2 } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { AddResourceComponent } from '@pang/mobile/app/shared/resources/components/add-resource/add-resource.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { ViewFilesComponent } from '@pang/mobile/app/shared/resources/components/view-files/view-files.component';
import { ResourceType } from '@pang/const';
import { TeamInterface } from '@pang/interface';

@Component({
  selector: 'pang-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
})
export class ResourcesComponent implements AfterViewInit {
  @Input() owner: string;
  @Input() team: TeamInterface;

  uid: string;

  constructor(
    private auth: AngularFireAuth,
    private elementRef: ElementRef<HTMLElement>,
    private render: Renderer2,
    public modalController: ModalController,
  ) {
    this.auth.currentUser.then(({ uid }) => (this.uid = uid));
  }
  ngAfterViewInit(): void {
    if (this.elementRef) {
      this.scaleComponent();
    }
  }

  scaleComponent() {
    const element = this.elementRef.nativeElement;
    const factor = element.parentElement.offsetWidth / 600;
    this.render.setStyle(element, 'transform', `scale(${factor})`);
  }

  async addNewFile() {
    const modal = await this.modalController.create({
      component: AddResourceComponent,
      swipeToClose: true,
      componentProps: {
        owner: this.team ? this.uid : this.owner,
        team: this.team?.key,
      },
    });
    await modal.present();
  }

  async viewImage() {
    const modal = await this.modalController.create({
      component: ViewFilesComponent,
      swipeToClose: true,
      componentProps: {
        owner: this.owner,
        typeFile: ResourceType.IMAGE,
        team: this.team?.key,
      },
      cssClass: 'ionic-modal',
    });
    await modal.present();
  }

  async viewDoc() {
    const modal = await this.modalController.create({
      component: ViewFilesComponent,
      swipeToClose: true,
      componentProps: {
        owner: this.owner,
        typeFile: ResourceType.FILE,
        team: this.team?.key,
      },
      cssClass: 'ionic-modal',
    });
    await modal.present();
  }

  async viewVideo() {
    const modal = await this.modalController.create({
      component: ViewFilesComponent,
      swipeToClose: true,
      componentProps: {
        owner: this.owner,
        typeFile: ResourceType.VIDEO,
        team: this.team?.key,
      },
      cssClass: 'ionic-modal',
    });
    await modal.present();
  }

  get canUpload() {
    return this.owner === this.uid || this.team?.members.includes(this.uid);
  }
}
