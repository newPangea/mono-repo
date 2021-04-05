import { Component, Input, OnChanges } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'pang-icon',
  template: `<mat-icon [svgIcon]="this.name"></mat-icon>`,
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent implements OnChanges {
  @Input() url: string;
  @Input() name: string;

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {}

  ngOnChanges(): void {
    this.iconRegistry.addSvgIcon(
      this.name,
      this.sanitizer.bypassSecurityTrustResourceUrl(this.url),
    );
  }
}
