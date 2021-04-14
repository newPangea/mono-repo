import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateTeamComponent } from './components/create-team/create-team.component';

@Component({
  selector: 'pang-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit {
  @Input() scaleFactor = 1;
  @Input() maxScale: number;
  hasTeams = false;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private render: Renderer2,
    public modalController: ModalController,
  ) {}

  ngOnInit(): void {
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

  async createTeam() {
    const modal = await this.modalController.create({
      component: CreateTeamComponent,
      swipeToClose: true,
      cssClass: 'create-team',
    });
    await modal.present();
  }
}
