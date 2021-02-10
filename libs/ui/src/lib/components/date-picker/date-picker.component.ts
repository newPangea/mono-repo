import { Component, Input, ViewChild, forwardRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { IonDatetime } from '@ionic/angular';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'pang-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DatePickerComponent), multi: true }],
})
export class DatePickerComponent implements ControlValueAccessor {
  @Input() displayFormat: string;
  @ViewChild(IonDatetime) date: IonDatetime;

  private isOpenCalendar = false;

  dateValue: Date;
  isDisable: boolean;

  onChange: (date: Date) => void;
  onTouch : () => void;

  constructor(private datePipe: DatePipe) {}

  writeValue(obj: Date | string): void {
    if (typeof obj === 'string') {
      this.dateValue = obj !== '' ? new Date(obj) : this.dateValue;
    } else {
      this.dateValue = obj;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisable = isDisabled;
  }

  openCalendar() {
    if (!this.isOpenCalendar) {
      this.isOpenCalendar = true;
      this.date.open();
    }
  }

  blurCalendar() {
    this.isOpenCalendar = false;
  }

  changeDate(date: CustomEvent) {
    this.dateValue = new Date(date.detail.value);
    this.onTouch();
    this.onChange(this.dateValue);
  }

  get dateFormat() {
    return this.dateValue ? this.datePipe.transform(this.dateValue, 'dd/MM/YYYY') : null;
  }
}
