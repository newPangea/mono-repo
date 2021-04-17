import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';

import { ModalController } from '@ionic/angular';

import { Subscription } from 'rxjs';

import { TeamService } from '@pang/core';

import { CreateTeamComponent } from './components/create-team/create-team.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { TeamInterface } from '@pang/interface';

import { USER_CONST } from '../../home/pages/user/user.constants';

@Component({
  selector: 'pang-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit, OnDestroy, OnChanges {
  @Input() scaleFactor = 1;
  @Input() maxScale: number;
  @Input() owner: string;
  teamSubscription: Subscription;
  hasTeams = false;
  teams: TeamInterface[];
  uid: string;
  level2 = USER_CONST.levelZoom.level2;

  constructor(
    private auth: AngularFireAuth,
    private elementRef: ElementRef<HTMLElement>,
    private render: Renderer2,
    public modalController: ModalController,
    private teamService: TeamService,
  ) {
    this.auth.currentUser.then(({ uid }) => (this.uid = uid));
  }

  ngOnChanges(): void {
    if (this.elementRef && this.scaleFactor > 1) {
      this.scaleComponent();
    }
  }

  ngOnInit(): void {
    this.teamSubscription = this.teamService.getMyTeams(this.owner).subscribe((teams) => {
      this.teams = teams;
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

  get changeState() {
    return this.scaleFactor < this.level2 - 3;
  }
}
