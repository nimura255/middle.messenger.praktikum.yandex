export type ChangePasswordParams = {
  oldPassword: string;
  newPassword: string;
};

export type ChangeUserProfileParams = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};
