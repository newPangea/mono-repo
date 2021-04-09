import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pang-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
})
export class TemplateComponent {
  @Input() title: string;
  @Output() back = new EventEmitter<void>();
}
