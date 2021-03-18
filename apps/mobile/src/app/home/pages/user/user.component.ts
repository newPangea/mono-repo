import { Component, OnDestroy } from '@angular/core';
import { circleAnimation2, info } from './user.animation';
import { ActivatedRoute } from '@angular/router';
import { AlgoliaService } from '@pang/algolia';
import { map, switchMap } from 'rxjs/operators';
import { ConnectionInterface, UserAlgolia } from '@pang/interface';
import { environment } from '@pang/mobile/environments/environment';
import { from, Subscription } from 'rxjs';
import { Hit } from '@algolia/client-search';
import { codeToName } from '@pang/utils';
import { ConnectionService, UserService } from '@pang/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'pang-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [circleAnimation2, info],
})
export class UserComponent implements OnDestroy {
  user: Hit<UserAlgolia>;
  connection: ConnectionInterface[] = [];
  private subscribe: Subscription;

  constructor(
    private route: ActivatedRoute,
    private algolia: AlgoliaService,
    private userService: UserService,
    private snack: MatSnackBar,
    private connectionService: ConnectionService,
    private auth: AngularFireAuth,
  ) {
    this.route.params
      .pipe(
        map((data) => data.id),
        switchMap((id) => from(this.algolia.search<UserAlgolia>(environment.userAlgoliaIndex, id))),
      )
      .subscribe(({ hits }) => {
        this.user = hits[0];
        this.loadConnection();
      });
  }

  ngOnDestroy(): void {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
  }

  get nameCode() {
    return this.user ? codeToName(this.user.code) : '';
  }

  cancelRequest() {
    return this.connectionService.connection().doc(this.connection[0].key).delete();
  }

  async sendRequest() {
    await this.userService.sendConnectionRequest(this.user.objectID);
    this.snack.open(`You invited to ${this.user.name} to connect`, 'close', { duration: 2000 });
  }

  private loadConnection() {
    this.subscribe = this.auth.user
      .pipe(switchMap(({ uid }) => this.connectionService.getConnection(uid, this.user.objectID)))
      .subscribe((connection) => (this.connection = connection));
  }
}
