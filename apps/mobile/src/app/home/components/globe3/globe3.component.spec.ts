import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Globe3Component } from './globe3.component';

describe('Globe3Component', () => {
  let component: Globe3Component;
  let fixture: ComponentFixture<Globe3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Globe3Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Globe3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
