export interface UserInfosLogin {
  usernameOrEmail: string;
  password: string;
}

export interface UserInfosRegister {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface UserInfos {
  activityMessage: string;
  email: string;
  isConnected: boolean;
  username: string;
}
