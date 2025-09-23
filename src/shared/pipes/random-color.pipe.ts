import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appRandomColor',
})
export class RandomColorPipe implements PipeTransform {
  private colors: string[] = [
    'from-blue-50 to-blue-100',
    'from-green-50 to-green-100',
    'from-purple-50 to-purple-100',
    'from-orange-50 to-orange-100',
    'from-red-50 to-red-100',
    'from-teal-50 to-teal-100',
    'from-pink-50 to-pink-100',
    'from-yellow-50 to-yellow-100',
    'from-indigo-50 to-indigo-100',
  ];

  transform(index: number): string {
    return this.colors[index % this.colors.length];
  }
}
