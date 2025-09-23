import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'objToString',
  standalone: true,
})
export class ObjToStringPipe implements PipeTransform {
  transform(value: any, items: any[] | null, valueKey: string = 'id', labelKey: string = 'name') {
    if (!value || !items) {
      return '';
    }

    return items.find((item) => item[valueKey] == value)?.[labelKey] || '';
  }
}
