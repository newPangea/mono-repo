import { Component, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { AddResourceComponent } from '@pang/mobile/app/shared/resources/components/add-resource/add-resource.component';

@Component({
  selector: 'pang-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
})
export class ResourcesComponent implements OnChanges {
  @Input() scaleFactor = 1;
  @Input() maxScale: number;
  @Input() owner: string;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private render: Renderer2,
    public modalController: ModalController,
  ) {}

  ngOnChanges(): void {
    if (this.elementRef && this.scaleFactor > 1) {
      this.scaleComponent();
    }
  }

  scaleComponent() {
    const element = this.elementRef.nativeElement;
    const { width, height } = element.parentElement.getClientRects()[0];
    if (this.maxScale) {
      if (this.scaleFactor <= this.maxScale) {
        this.render.setStyle(element, 'transform', `scale(${1 / this.scaleFactor})`);
        this.render.setStyle(element, 'width', width + 'px');
        this.render.setStyle(element, 'height', height + 'px');
      }
    } else {
      this.render.setStyle(element, 'transform', `scale(${1 / this.scaleFactor})`);
      this.render.setStyle(element, 'width', width + 'px');
      this.render.setStyle(element, 'height', height + 'px');
    }
  }

  async addNewFile() {
    const modal = await this.modalController.create({
      component: AddResourceComponent,
      swipeToClose: true,
      componentProps: {
        owner: this.owner,
      },
    });
    await modal.present();
  }
}
