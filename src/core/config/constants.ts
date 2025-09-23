import { FileType } from '../../shared/enums/file_type';

export class Constants {
  public static get DEFAULT_PAGINATION_PARAMS() {
    return {
      rows: 8,
      page: 1,
      totalItems: 0,
    };
  }

  public static readonly FILE_MAX_SIZE = {
    [FileType.image]: 4 * 1024 * 1024,
    [FileType.video]: 40 * 1024 * 1024,
    [FileType.pdf]: 15 * 1024 * 1024,
    [FileType.word]: 15 * 1024 * 1024,
  };

  public static readonly FILE_ALLOWED_MIMES = {
    [FileType.image]: ['image/jpeg', 'image/png', 'image/gif'],
    [FileType.video]: ['video/mp4'],
    [FileType.pdf]: ['application/pdf'],
    [FileType.word]: [
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
  };
}
