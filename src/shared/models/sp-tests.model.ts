import { IBaseModel } from '../../core/base/base.model';

export interface ISpTests extends IBaseModel {
  name: string;
  name_uz?: string;
  name_ru?: string;
  name_kr?: string;

  description: string;
  description_uz?: string;
  description_ru?: string;
  description_kr?: string;

  icon: string;
  duration: number;
  questions_count?: number;
  code: string;
  sp_category_id: string;
  sp_level_id: string;
  sp_tests_quessions: ISpTestsQuession[];
}

export interface ISpTestsQuession extends IBaseModel {
  question: string;
  explanation: string;
  sp_tests_id: string;
  sp_quession_options: ISpQuessionOption[];
}

export interface ISpQuessionOption extends IBaseModel {
  text: string;
  is_result: boolean;
  sp_tests_quession_id: string;
}

export interface IClientResult extends IBaseModel {
  score: number;
  correct_answers: number;
  total_questions: number;
  time_spent: number;
  sp_tests_id: string;
  client_user_id: any;
  client_result_answer: IClientResultAnswer[];
}

export interface IClientResultAnswer extends IBaseModel {
  is_result: boolean;
  sp_tests_quession_id: string;
  client_result_id: string;
  sp_tests_quession_option_id: string;
}
