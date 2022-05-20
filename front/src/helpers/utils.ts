export const checkPasswordLength = (password: string) => {
  return password.length >= 8;
};

export const comparePassword = (
  firstPassword: string,
  secondPassword: string,
) => {
  return firstPassword === secondPassword;
};
