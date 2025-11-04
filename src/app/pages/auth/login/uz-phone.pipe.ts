import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Injectable({ providedIn: 'root' })
@Pipe({
  name: 'uzPhone',
  standalone: true,
})
export class UzPhonePipe implements PipeTransform {
  transform(value: string | null | undefined, showCountry = true): string {
    if (!value) return '';

    const digits = value.toString().replace(/\D+/g, '');

    let local = digits;

    if (digits.length === 9) {
      local = digits;
    } else if (digits.length === 12 && digits.startsWith('998')) {
      local = digits.slice(3);
    } else if (digits.length === 10 && digits.startsWith('0')) {
      local = digits.slice(1);
    } else {
      return value.toString();
    }

    if (local.length !== 9) return value.toString();

    const a = local.slice(0, 2);
    const b = local.slice(2, 5);
    const c = local.slice(5, 7);
    const d = local.slice(7, 9);

    return showCountry ? `+998 (${a}) ${b}-${c}-${d}` : `(${a}) ${b}-${c}-${d}`;
  }
}
