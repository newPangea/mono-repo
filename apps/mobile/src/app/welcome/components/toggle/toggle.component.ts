import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'pang-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
})
export class ToggleComponent implements OnInit {
  // TO DO: REMOVE COMPONENT FROM HERE
  @Input() tabs: ToggleComponentTab[] = [];
  @Input() currentTab: number;
  @Output() selectedTab: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    if (!this.currentTab) {
      this.currentTab = this.tabs.length ? this.tabs[0].id : null;
    }
  }

  selectTab(id: number): void {
    this.currentTab = id;
    this.selectedTab.emit(id);
  }
}

export interface ToggleComponentTab {
  label: string;
  id: number;
}
