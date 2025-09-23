import { IBaseModel } from '../../core/base/base.model';

export interface ISpMaterials extends IBaseModel {
  name: string;
  name_uz?: string;
  name_ru?: string;
  name_kr?: string;

  description: string;
  description_uz?: string;
  description_ru?: string;
  description_kr?: string;

  file_id: string;
  download_count: number;
  file_size: number;
  icon: string;
  sp_category_id: string;
  sp_level_id: string;
}
