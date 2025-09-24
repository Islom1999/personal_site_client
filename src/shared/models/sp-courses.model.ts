import { IBaseModel } from '../../core/base/base.model';

export enum PremiumType {
  free = 'free',
  premium = 'premuim',
}

export enum LessonType {
  text = 'text',
  video_youtube = 'video_youtube',
  video_server = 'video_server',
  gibrid = 'gibrid',
}

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
  sp_courses_modules: ISpCoursesModule[];
}

export interface ISpCoursesModule extends IBaseModel {
  name_uz: string;
  name_ru: string;
  name_kr: string;
  duration: string;
  sp_courses_id: string;
  sp_courses_module_parts: ISpCoursesModulePart[];
}

export interface ISpCoursesModulePart extends IBaseModel {
  file_video_id: string;
  name_uz: string;
  name_ru: string;
  name_kr: string;
  duration: string;
  type: LessonType;
  content?: string;
  sp_courses_module_id: string;
}
