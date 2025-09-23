import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appUnicObjById',
})
export class UnicObjByIdPipe implements PipeTransform {
  transform(value: any[], key: string = 'id'): any[] {
    if (!Array.isArray(value)) return [];

    const seen = new Set();
    return value.filter((item) => {
      const val = item?.[key];
      if (seen.has(val)) return false;
      seen.add(val);
      return true;
    });
  }
}
