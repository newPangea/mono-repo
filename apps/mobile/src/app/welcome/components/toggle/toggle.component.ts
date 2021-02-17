import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToggleComponentTab } from '@pang/interface';

@Component({
  selector: 'pang-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
})
export class ToggleComponent implements OnInit {
  @Input() tabs: ToggleComponentTab[] = [];
  @Input() currentTab: number;
  @Output() selectedTab: EventEmitter<number> = new EventEmitter();

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