import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

const iconPinActive = '../assets/icons/icon-pin-active.svg';
const iconSchoolActive = '../assets/icons/icon-school-active.svg';
const iconTeam = '../assets/icons/icon-team.svg';
const iconConnection = '../assets/icons/icon-connections.svg';
const iconFilter = '../assets/icons/icon-filter.svg';
const iconMail = '../assets/icons/icon-mail.svg';

@Component({
  selector: 'new-pangea-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'dashboard';

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.registerIcons();
  }

  private registerIcons() {
    this.matIconRegistry.addSvgIcon('new-pangea-pin', this.domSanitizer.bypassSecurityTrustResourceUrl(iconPinActive));
    this.matIconRegistry.addSvgIcon(
      'new-pangea-school',
      this.domSanitizer.bypassSecurityTrustResourceUrl(iconSchoolActive),
    );
    this.matIconRegistry.addSvgIcon('new-pangea-team', this.domSanitizer.bypassSecurityTrustResourceUrl(iconTeam));
    this.matIconRegistry.addSvgIcon(
      'new-pangea-connection',
      this.domSanitizer.bypassSecurityTrustResourceUrl(iconConnection),
    );
    this.matIconRegistry.addSvgIcon('new-pangea-filter', this.domSanitizer.bypassSecurityTrustResourceUrl(iconFilter));
    this.matIconRegistry.addSvgIcon('new-pangea-mail', this.domSanitizer.bypassSecurityTrustResourceUrl(iconMail));
  }
}
