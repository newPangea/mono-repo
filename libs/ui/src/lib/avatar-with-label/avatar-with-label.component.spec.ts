import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarWithLabelComponent } from './avatar-with-label.component';

describe('AvatarWithLabelComponent', () => {
  let component: AvatarWithLabelComponent;
  let fixture: ComponentFixture<AvatarWithLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvatarWithLabelComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarWithLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
