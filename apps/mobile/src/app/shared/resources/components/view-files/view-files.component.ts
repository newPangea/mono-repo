import { AngularFireAuth } from '@angular/fire/auth';
import { AfterViewInit, Component, Input } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { ResourceType } from '@pang/const';
import { ResourceService } from '@pang/core';
import { switchMap } from 'rxjs/operators';
import { ResourceInterface } from '@pang/interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'pang-view-files',
  templateUrl: './view-files.component.html',
  styleUrls: ['./view-files.component.scss'],
})
export class ViewFilesComponent implements AfterViewInit {
  @Input() typeFile: ResourceType;
  @Input() owner: string;

  resources$: Observable<ResourceInterface[]>;

  constructor(
    private modal: ModalController,
    private auth: AngularFireAuth,
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
    );
    this.resources$.subscribe(console.log);
  }

  closeModal() {
    return this.modal.dismiss();
  }
}
