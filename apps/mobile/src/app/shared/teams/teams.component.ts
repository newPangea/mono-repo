import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { Subscription } from 'rxjs';

import { TeamService } from '@pang/core';
import { Team } from '@pang/models';

import { CreateTeamComponent } from './components/create-team/create-team.component';

@Component({
  selector: 'pang-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit, OnDestroy {
  @Input() scaleFactor = 1;
  @Input() maxScale: number;
  @Input() owner: string;
  teamSubscription: Subscription;
  hasTeams = false;
  teams: Team[];

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private render: Renderer2,
    public modalController: ModalController,
    private teamService: TeamService,
  ) {}

  ngOnInit(): void {
    if (this.elementRef && this.scaleFactor > 1) {
      this.scaleComponent();
    }
    this.teamSubscription = this.teamService.getMyTeams().subscribe((teams) => {
      this.teams = teams;
      console.log(teams);
    });
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

  ngOnDestroy() {
    if (this.teamSubscription) {
      this.teamSubscription.unsubscribe();
    }
  }

  async createTeam() {
    const modal = await this.modalController.create({
      component: CreateTeamComponent,
      swipeToClose: true,
      componentProps: {
        owner: this.owner,
      },
      cssClass: 'create-team',
    });
    await modal.present();
  }
}
