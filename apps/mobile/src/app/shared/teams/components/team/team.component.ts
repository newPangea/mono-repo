import { Component, ElementRef, HostListener, Input, OnChanges, Renderer2 } from '@angular/core';

@Component({
  selector: 'pang-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnChanges {
  @Input() scaleFactor = 1;
  @Input() maxScale: number;

  constructor(private elementRef: ElementRef<HTMLElement>, private render: Renderer2) {}

  ngOnChanges(): void {
    if (this.elementRef && this.scaleFactor >= 1) {
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

  @HostListener('click', ['$event'])
  clickTeam(event: MouseEvent) {
    event.stopPropagation();
    console.log('click');
  }
}
