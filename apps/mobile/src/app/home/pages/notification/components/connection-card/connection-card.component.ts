import { Component, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { ConnectionInterface, UserAlgolia } from '@pang/interface';
import { AlgoliaService } from '@pang/algolia';
import { environment } from '@pang/mobile/environments/environment';

@Component({
  selector: 'pang-connection-card',
  templateUrl: './connection-card.component.html',
  styleUrls: ['./connection-card.component.scss'],
})
export class ConnectionCardComponent implements OnChanges {
  @Input() connection: ConnectionInterface;
  @Output() acceptRequest = new EventEmitter<boolean>();

  requestUser: UserAlgolia;

  constructor(private algolia: AlgoliaService) {}

  ngOnChanges(): void {
    if (this.connection) {
      this.loadConnectionData();
    }
  }

  private async loadConnectionData() {
    this.requestUser = await this.algolia.getHit<UserAlgolia>(
      environment.userAlgoliaIndex,
      this.connection.to,
    );
  }
}
