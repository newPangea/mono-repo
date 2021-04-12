import { AngularFireAuth } from '@angular/fire/auth';
import { AfterViewInit, Component, Input } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { AlgoliaService } from '@pang/algolia';
import { ResourceInterface, UserAlgolia } from '@pang/interface';
import { ResourceService } from '@pang/core';
import { ResourceType } from '@pang/const';
import { environment } from '@pang/mobile/environments/environment';

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
  ) {}

  ngAfterViewInit(): void {
    this.loadFies();
  }

  loadFies() {
    this.resources$ = this.auth.user.pipe(
      switchMap(({ uid }) => {
        if (uid === this.owner) {
          return this.resources
            .resourceCollection((ref) =>
              ref.where('owner', '==', uid).where('type', '==', this.typeFile),
            )
            .valueChanges();
        } else {
          return this.resources
            .resourceCollection((ref) =>
              ref
                .where('owner', '==', this.owner)
                .where('type', '==', this.typeFile)
                .where('public', '==', true),
            )
            .valueChanges();
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
