export type UserType = {
  device_id?: string;
  country?: string;
  created_date?: string;
  updated_date?: string;
  id?: string;
  device_code?: string;
  subscription_status?: boolean;
  fcm_token?: string;
  avatar?: string;
  nickname?: string;
  color_user?: string;
  is_check_notification?: boolean;
  automaticDarkMode?: boolean;
};

export type AvatarType = {
  id: number;
  avatar: any;
  color: string;
  bgColorItem: any;
};
