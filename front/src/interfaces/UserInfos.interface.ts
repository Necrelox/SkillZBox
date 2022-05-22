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
