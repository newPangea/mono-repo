import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { Hit } from '@algolia/client-search';
import { map, switchMap } from 'rxjs/operators';
import { from } from 'rxjs';

import { AlgoliaService } from '@pang/algolia';
import { UserAlgolia } from '@pang/interface';

import { environment } from '@pang/mobile/environments/environment';
import { circleAnimation2, info } from '@pang/mobile/app/home/pages/user/user.animation';

@Component({
  selector: 'pang-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss'],
  animations: [circleAnimation2, info],
})
export class CommunityComponent {
  user: Hit<UserAlgolia>;

  constructor(private route: ActivatedRoute, private algolia: AlgoliaService) {
    this.route.params
      .pipe(
        map((data) => data.id),
        switchMap((id) => from(this.algolia.search<UserAlgolia>(environment.userAlgoliaIndex, id))),
      )
      .subscribe(({ hits }) => {
        this.user = hits[0];
      });
  }
}
