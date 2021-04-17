import { Component, HostListener, Input } from '@angular/core';
import { TeamInterface } from '@pang/interface';

@Component({
  selector: 'pang-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent {
  @Input() team: TeamInterface;
  @Input() changeState = true;

  @HostListener('click', ['$event'])
  clickTeam(event: MouseEvent) {
    event.stopPropagation();
    console.log('click');
  }
}
