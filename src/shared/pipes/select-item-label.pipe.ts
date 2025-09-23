import { Pipe, type PipeTransform } from '@angular/core';
import { ObjToStringPipe } from './obj-to-string.pipe';

export interface ISelectItem {
  id: string;
  name: string;
}

@Pipe({
  name: 'selectItemLabel',
  standalone: true,
})
export class SelectItemLabelPipe extends ObjToStringPipe implements PipeTransform {
  override transform(value: number | string, _items: ISelectItem[] | any[] | null) {
    return super.transform(value, _items, 'id');
  }
}
