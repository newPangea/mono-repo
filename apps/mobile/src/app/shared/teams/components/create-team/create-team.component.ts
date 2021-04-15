import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { ModalController } from '@ionic/angular';

import { take } from 'rxjs/operators';

import { GeneralService, ResourceService, TeamService } from '@pang/core';
import { ResourceInterface } from '@pang/interface';
import { Team } from '@pang/models';

import { AddMembersNewTeamComponent } from '../../../modals/add-members-new-team/add-members-new-team.component';
import { AddResourcesNewTeamComponent } from '../../../modals/add-resources-new-team/add-resources-new-team.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResourcesTeam } from '../../../modals/interfaces/resources';

@Component({
  selector: 'pang-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss'],
})
export class CreateTeamComponent implements OnInit {
  @Input() owner: string;
  teamGroup: FormGroup;
  members: {
    avatar: string;
    uid: string;
  }[] = [];
  resources: ResourcesTeam[] = [];
  incomplete = true;
  resource: ResourceInterface;

  constructor(
    private bottomSheet: MatBottomSheet,
    private generalService: GeneralService,
    private modal: ModalController,
    private resourceService: ResourceService,
    private teamService: TeamService,
    public builder: FormBuilder,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    console.log(this.owner);
    this.teamGroup = this.builder.group({
      name: ['', Validators.required],
    });
  }

  createTeam() {
    console.log('creando');
    const { name } = this.teamGroup.value;
    const members = [];
    this.members.forEach((element) => {
      members.push(element.uid);
    });
    members.push(this.owner);
    const teamID = this.generalService.getFirestoreId();
    const team = new Team(teamID, name, members);
    console.log('adding team');
    this.teamService.add(team);
    if (this.resources && this.resources.length > 0) {
      this.resources.forEach((element) => {
        this.resourceService
          .getResourceByKey(element.uid)
          .pipe(take(1))
          .subscribe((resource) => {
            this.resource = resource[0];
            if (this.resource && this.resource.team && this.resource.team.length > 0) {
              this.resource.team.push(element.uid);
            } else {
              this.resource.team = [element.uid];
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
      console.log(members);
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
      console.log(resources);
      this.addSelectedResources(resources);
    });
  }

  addSelectedMembers(members) {
    if (members && members.length > 0) {
      this.members = members;
    }
  }

  addSelectedResources(resources) {
    if (resources && resources.length > 0) {
      this.resources = resources;
    }
  }

  remove(member) {
    this.members.forEach((element, index) => {
      if (element.uid == member.uid) {
        this.members.splice(index, 1);
      }
    });
  }

  removeResource(resource) {
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
