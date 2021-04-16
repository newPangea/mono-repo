import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResourcesNewTeamComponent } from './add-resources-new-team.component';

describe('AddResourcesNewTeamComponent', () => {
  let component: AddResourcesNewTeamComponent;
  let fixture: ComponentFixture<AddResourcesNewTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddResourcesNewTeamComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddResourcesNewTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
