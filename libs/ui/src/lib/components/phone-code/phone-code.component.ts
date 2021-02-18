import { AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { debounceTime, filter } from 'rxjs/operators';

@Component({
  selector: 'pang-phone-code',
  templateUrl: './phone-code.component.html',
  styleUrls: ['./phone-code.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => PhoneCodeComponent), multi: true }],
})
export class PhoneCodeComponent implements ControlValueAccessor, AfterViewInit {
  @Output() value: EventEmitter<number> = new EventEmitter();
  @ViewChild('digit1') digit1: ElementRef;
  @ViewChild('digit2') digit2: ElementRef;
  @ViewChild('digit3') digit3: ElementRef;
  @ViewChild('digit4') digit4: ElementRef;
  @ViewChild('digit5') digit5: ElementRef;
  codeForm: FormGroup;
  disable: boolean;

  private readonly DELAY_LAST_DIGIT: number = 100;
  private onChange: (value: string) => void;
  private onTouch: () => void;

  constructor(formBuilder: FormBuilder) {
    this.codeForm = formBuilder.group({
      digit1: ['', [Validators.required, Validators.min(0), Validators.max(9)]],
      digit2: ['', [Validators.required, Validators.min(0), Validators.max(9)]],
      digit3: ['', [Validators.required, Validators.min(0), Validators.max(9)]],
      digit4: ['', [Validators.required, Validators.min(0), Validators.max(9)]],
      digit5: ['', [Validators.required, Validators.min(0), Validators.max(9)]],
    });
  }

  writeValue(obj: number): void {
    if (typeof obj === 'number') {
      const numArray = String(obj).split('');
      numArray.forEach((value, index) => {
        this.codeForm.controls['digit' + (index + 1)].setValue(value);
      });
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disable = isDisabled;
  }

  ngAfterViewInit(): void {
    this.codeForm.controls['digit1'].valueChanges
      .pipe(filter(this.isValidInput), debounceTime(this.DELAY_LAST_DIGIT))
      .subscribe(() => {
        this.digit2.nativeElement.focus();
        this.getValue();
      });
    this.codeForm.controls['digit2'].valueChanges
      .pipe(filter(this.isValidInput), debounceTime(this.DELAY_LAST_DIGIT))
      .subscribe(() => {
        this.digit3.nativeElement.focus();
        this.getValue();
      });
    this.codeForm.controls['digit3'].valueChanges
      .pipe(filter(this.isValidInput), debounceTime(this.DELAY_LAST_DIGIT))
      .subscribe(() => {
        this.digit4.nativeElement.focus();
        this.getValue();
      });
    this.codeForm.controls['digit4'].valueChanges
      .pipe(filter(this.isValidInput), debounceTime(this.DELAY_LAST_DIGIT))
      .subscribe(() => {
        this.digit5.nativeElement.focus();
        this.getValue();
      });
    this.codeForm.controls['digit5'].valueChanges
      .pipe(filter(this.isValidInput), debounceTime(this.DELAY_LAST_DIGIT))
      .subscribe(() => {
        this.digit5.nativeElement.blur();
        this.getValue();
      });
  }

  public isValidInput(value: number | string): boolean {
    return value != null && value !== '' && 0 <= Number(value) && Number(value) <= 9;
  }

  public getValue() {
    const { digit1, digit2, digit3, digit4, digit5 } = this.codeForm.value;
    this.onTouch();
    this.onChange(`${digit1}${digit2}${digit3}${digit4}${digit5}`);
  }
}
