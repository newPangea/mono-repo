import { AngularFirestore } from '@angular/fire/firestore';
import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ModalController } from '@ionic/angular';

import { ResourceService, TeamService } from '@pang/core';
import { ResourceInterface, TeamInterface } from '@pang/interface';

import { AddMembersNewTeamComponent } from '../../../modals/add-members-new-team/add-members-new-team.component';
import { AddResourcesNewTeamComponent } from '../../../modals/add-resources-new-team/add-resources-new-team.component';
import { MemberData } from '../../../modals/interfaces/member-interface';
import { ResourcesTeam } from '../../../modals/interfaces/resources';
import { take } from 'rxjs/operators';

@Component({
  selector: 'pang-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss'],
})
export class CreateTeamComponent implements OnInit {
  @Input() owner: string;

  incomplete = true;
  members: MemberData[] = [];
  resource: ResourceInterface;
  resources: ResourcesTeam[] = [];
  teamGroup: FormGroup;

  constructor(
    private bottomSheet: MatBottomSheet,
    private teamService: TeamService,
    private resourceService: ResourceService,
    private db: AngularFirestore,
    private elementRef: ElementRef<HTMLDivElement>,
    private modal: ModalController,
    private render: Renderer2,
    private snackBar: MatSnackBar,
    public builder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.teamGroup = this.builder.group({
      name: ['', Validators.required],
    });

    this.render.setStyle(this.elementRef.nativeElement, 'height', window.innerHeight + 'px');
  }

  createTeam() {
    const { name } = this.teamGroup.value;
    const members = [];
    this.members.forEach((element) => {
      members.push(element.uid);
    });
    members.push(this.owner);

    const team: TeamInterface = {
      key: this.db.createId(),
      name,
      members,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.teamService.add(team);
    if (this.resources && this.resources.length > 0) {
      this.resources.forEach((element) => {
        this.resourceService
          .getResourceByKey(element.uid)
          .pipe(take(1))
          .subscribe((resource) => {
            this.resource = resource[0];
            if (this.resource && this.resource.team && this.resource.team.length > 0) {
              this.resource.team.push(team.key);
            } else {
              this.resource.team = [team.key];
            }
            this.resourceService.addToTeam(this.resource.uid, this.resource.team);
          });
      });
    }
    this.snackBar.open('"' + name + '" has been uploaded', 'close', { duration: 2000 });
    this.closeModal();
  }

  addMembers() {
    const aux = this.bottomSheet.open(AddMembersNewTeamComponent, {
      panelClass: 'profile_sheet',
      data: {
        members: this.members,
      },
    });
    aux.afterDismissed().subscribe((members) => {
      this.addSelectedMembers(members);
    });
  }

  addResources() {
    const aux = this.bottomSheet.open(AddResourcesNewTeamComponent, {
      panelClass: 'profile_sheet',
      data: {
        resources: this.resources,
      },
    });
    aux.afterDismissed().subscribe((resources) => {
      this.addSelectedResources(resources);
    });
  }

  addSelectedMembers(members: MemberData[]) {
    if (members && members.length > 0) {
      this.members = members;
    }
  }

  addSelectedResources(resources: ResourcesTeam[]) {
    console.log(resources, 'resources receive');

    if (resources && resources.length > 0) {
      this.resources = resources;
      console.log(this.resources, 'resources assign');
    }
  }

  remove(member: MemberData) {
    this.members.forEach((element, index) => {
      if (element.uid == member.uid) {
        this.members.splice(index, 1);
      }
    });
  }

  removeResource(resource: ResourcesTeam) {
    this.resources.forEach((element, index) => {
      if (element.uid == resource.uid) {
        this.resources.splice(index, 1);
      }
    });
  }

  closeModal() {
    return this.modal.dismiss();
  }
}
