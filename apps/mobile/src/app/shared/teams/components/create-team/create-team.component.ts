import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ModalController } from '@ionic/angular';
import { AddMembersNewTeamComponent } from '../../../modals/add-members-new-team/add-members-new-team.component';
import { AddResourcesNewTeamComponent } from '../../../modals/add-resources-new-team/add-resources-new-team.component';

@Component({
  selector: 'pang-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss'],
})
export class CreateTeamComponent implements OnInit {
  teamGroup: FormGroup;
  members: {
    avatar: string;
    uid: string;
  }[] = [];
  resources: {
    avatar: string;
    uid: string;
  }[] = [];

  constructor(
    public builder: FormBuilder,
    private modal: ModalController,
    private bottomSheet: MatBottomSheet,
  ) {}

  ngOnInit(): void {
    this.teamGroup = this.builder.group({
      name: ['', Validators.required],
    });
  }

  createTeam() {
    console.log('creating');
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
    this.members = members;
  }

  addSelectedResources(resources) {
    this.resources = resources;
  }

  remove(member) {
    this.members.forEach((element, index) => {
      if (element.uid == member.uid) {
        this.members.splice(index, 1);
      }
    });
  }

  closeModal() {
    return this.modal.dismiss();
  }
}
