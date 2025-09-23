import { IBaseModel } from '../../core/base/base.model';

export interface ISpCategory extends IBaseModel {
  name: string;
  name_uz?: string;
  name_ru?: string;
  name_kr?: string;
  icon: string;
}
