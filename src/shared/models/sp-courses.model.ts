import { IBaseModel } from '../../core/base/base.model';

export interface ISpCourses extends IBaseModel {
  name: string;
  name_uz?: string;
  name_ru?: string;
  name_kr?: string;

  description: string;
  description_uz?: string;
  description_ru?: string;
  description_kr?: string;

  file_image_id: string;
  instructor: string;
  duration: string;
  rating: string;
  premium_type: string;
  price: number;
  tags: string[];
  code: string;
  sp_category_id: string;
  sp_level_id: string;
}
