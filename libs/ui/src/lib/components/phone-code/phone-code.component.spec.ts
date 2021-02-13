import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneCodeComponent } from './phone-code.component';

describe('PhoneCodeComponent', () => {
  let component: PhoneCodeComponent;
  let fixture: ComponentFixture<PhoneCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
