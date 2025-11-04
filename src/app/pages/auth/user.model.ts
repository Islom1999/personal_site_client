export interface IRootTokenRes {
  success: boolean;
  message: string;
  data: IDataToken;
}

export interface IDataToken {
  access_token: string;
  refresh_token: string;
  user: IUser;
}

export interface IUser {
  id: string;
  fullname: string;
  phone: string;
  email: string;
  is_success: boolean;
  file_image_id: string;
}
