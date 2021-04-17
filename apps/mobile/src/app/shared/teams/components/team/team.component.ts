import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { TeamInterface } from '@pang/interface';
import { resourceAnimation } from '@pang/mobile/app/home/pages/user/user.animation';
import { ZoomService } from '@pang/mobile/app/services/zoom.service';
@Component({
  selector: 'pang-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  animations: [resourceAnimation],
})
export class TeamComponent {
  @Input() team: TeamInterface;
  @Input() changeState = true;
  @Input() owner: string;

  constructor(private zoomService: ZoomService, private element: ElementRef<HTMLElement>) {}

  @HostListener('click', ['$event'])
  clickTeam(event: MouseEvent) {
    event.stopPropagation();
    this.zoomService.setElement(this.element.nativeElement);
  }
}
