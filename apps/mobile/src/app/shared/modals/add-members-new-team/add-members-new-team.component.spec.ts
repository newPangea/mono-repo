import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMembersNewTeamComponent } from './add-members-new-team.component';

describe('AddMembersNewTeamComponent', () => {
  let component: AddMembersNewTeamComponent;
  let fixture: ComponentFixture<AddMembersNewTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddMembersNewTeamComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMembersNewTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
