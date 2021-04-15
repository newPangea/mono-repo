import { AngularFireAuth } from '@angular/fire/auth';
import { AfterViewInit, Component, Input } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { first, map, switchMap, tap } from 'rxjs/operators';

import { AlgoliaService } from '@pang/algolia';
import { ResourceInterface, UserAlgolia } from '@pang/interface';
import { ResourceService } from '@pang/core';
import { ResourceType } from '@pang/const';
import { environment } from '@pang/mobile/environments/environment';
import { select, State } from '@ngrx/store';
import { AppState } from '@pang/mobile/app/state/app.state';
import { selectResourcesState } from '@pang/mobile/app/state/resources/resources.selectors';

@Component({
  selector: 'pang-view-files',
  templateUrl: './view-files.component.html',
  styleUrls: ['./view-files.component.scss'],
})
export class ViewFilesComponent implements AfterViewInit {
  @Input() typeFile: ResourceType;
  @Input() owner: string;

  resources$: Observable<ResourceInterface[]>;
  search: string;
  users: { [key: string]: UserAlgolia } = {};

  constructor(
    private algolia: AlgoliaService,
    private auth: AngularFireAuth,
    private modal: ModalController,
    private resources: ResourceService,
    private state: State<AppState>,
  ) {}

  ngAfterViewInit(): void {
    this.loadFies();
  }

  loadFies() {
    this.resources$ = this.auth.user.pipe(
      first(),
      switchMap(({ uid }) => {
        if (uid === this.owner) {
          return this.state.pipe(
            select(selectResourcesState),
            map((data) => data[this.typeFile]),
          );
        } else {
          return this.resources.getResources(this.owner, this.typeFile);
        }
      }),
      tap((resources) =>
        resources.forEach(async (resource) => {
          if (!this.users[resource.uploadBy]) {
            this.users[resource.uploadBy] = await this.algolia.getHit(
              environment.userAlgoliaIndex,
              resource.uploadBy,
            );
          }
        }),
      ),
    );
  }

  closeModal() {
    return this.modal.dismiss();
  }
}
