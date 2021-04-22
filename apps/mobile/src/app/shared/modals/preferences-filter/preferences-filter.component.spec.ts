import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferencesFilterComponent } from './preferences-filter.component';

describe('PreferencesFilterComponent', () => {
  let component: PreferencesFilterComponent;
  let fixture: ComponentFixture<PreferencesFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreferencesFilterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferencesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
