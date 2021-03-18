import { Component } from '@angular/core';
import { circleAnimation2, info } from './user.animation';
import { ActivatedRoute } from '@angular/router';
import { AlgoliaService } from '@pang/algolia';
import { map, switchMap } from 'rxjs/operators';
import { UserAlgolia } from '@pang/interface';
import { environment } from '@pang/mobile/environments/environment';
import { from } from 'rxjs';
import { Hit } from '@algolia/client-search';
import { codeToName } from '@pang/utils';
import { UserService } from '@pang/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'pang-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [circleAnimation2, info],
})
export class UserComponent {
  user: Hit<UserAlgolia>;

  constructor(
    private route: ActivatedRoute,
    private algolia: AlgoliaService,
    private userService: UserService,
    private snack: MatSnackBar,
  ) {
    this.route.params
      .pipe(
        map((data) => data.id),
        switchMap((id) => from(this.algolia.search<UserAlgolia>(environment.userAlgoliaIndex, id))),
      )
      .subscribe(({ hits }) => (this.user = hits[0]));
  }

  get nameCode() {
    return this.user ? codeToName(this.user.code) : '';
  }

  async sendRequest() {
    await this.userService.sendConnectionRequest(this.user.objectID);
    this.snack.open(`You invited to ${this.user.name} to connect`, 'close', { duration: 2000 });
  }
}
