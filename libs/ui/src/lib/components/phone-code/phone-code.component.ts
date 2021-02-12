import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, filter } from 'rxjs/operators';

@Component({
  selector: 'pang-phone-code',
  templateUrl: './phone-code.component.html',
  styleUrls: ['./phone-code.component.scss'],
})
export class PhoneCodeComponent implements OnInit {
  @Output() value: EventEmitter<number> = new EventEmitter();
  @ViewChild('digit1') digit1: ElementRef;
  @ViewChild('digit2') digit2: ElementRef;
  @ViewChild('digit3') digit3: ElementRef;
  @ViewChild('digit4') digit4: ElementRef;
  @ViewChild('digit5') digit5: ElementRef;
  codeForm: FormGroup;
  private readonly DELAY_LAST_DIGIT: number = 500;

  constructor(formBuilder: FormBuilder) {
    this.codeForm = formBuilder.group({
      digit1: [null, [Validators.required, Validators.min(0), Validators.max(9)]],
      digit2: [null, [Validators.required, Validators.min(0), Validators.max(9)]],
      digit3: [null, [Validators.required, Validators.min(0), Validators.max(9)]],
      digit4: [null, [Validators.required, Validators.min(0), Validators.max(9)]],
      digit5: [null, [Validators.required, Validators.min(0), Validators.max(9)]],
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.codeForm.controls['digit1'].valueChanges.pipe(filter(this.isValidDigit)).subscribe(() => {
      this.digit2.nativeElement.focus();
    });
    this.codeForm.controls['digit2'].valueChanges.pipe(filter(this.isValidDigit)).subscribe(() => {
      this.digit3.nativeElement.focus();
    });
    this.codeForm.controls['digit3'].valueChanges.pipe(filter(this.isValidDigit)).subscribe(() => {
      this.digit4.nativeElement.focus();
    });
    this.codeForm.controls['digit4'].valueChanges.pipe(filter(this.isValidDigit)).subscribe(() => {
      this.digit5.nativeElement.focus();
    });
    this.codeForm.controls['digit5'].valueChanges
      .pipe(filter(this.isValidDigit), debounceTime(this.DELAY_LAST_DIGIT))
      .subscribe(() => {
        this.digit5.nativeElement.blur();
        this.value.emit(this.getValue());
      });
  }

  private isValidDigit(value: number): boolean {
    return value != null;
  }

  private getValue(): number {
    const { digit1, digit2, digit3, digit4, digit5 } = this.codeForm.value;
    const value = Number(`${digit1}${digit2}${digit3}${digit4}${digit5}`);
    return isNaN(value) ? null : value;
  }
}
