import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
  transform(value: string, search: string): string {
    if (!search) {
      return value;
    }
    const re = new RegExp(search, 'gi');
    return value.replace(re, '<mark class="mark">$&</mark>');
  }
}
