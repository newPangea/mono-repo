import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPangeaLabelComponent } from './new-pangea-label.component';

describe('NewPangeaLabelComponent', () => {
  let component: NewPangeaLabelComponent;
  let fixture: ComponentFixture<NewPangeaLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewPangeaLabelComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPangeaLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
