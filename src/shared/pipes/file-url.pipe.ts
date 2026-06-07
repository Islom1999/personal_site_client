import { Pipe, type PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'fileUrl',
  standalone: true,
})
export class FileUrlPipe implements PipeTransform {
  transform(fileId?: string | null): string | null {
    if (!fileId) return null;
    if (/^https?:\/\//i.test(fileId)) return fileId;
    return `${environment.apiBaseUrl}/files/${fileId}/stream`;
  }
}
