export const checkPasswordLength = (password: string) => {
  return password.length >= 8;
};

export const hasUppercaseInPassword = (password: string) => {
  return password.toLowerCase() !== password;
}

export const hasLowercaseInPassword = (password: string) => {
  return password.toUpperCase() !== password;
}

export const hasNumberInPassword = (password: string) => {
  const regex: RegExp = /\d/g;
  return regex.test(password);
}

export const comparePassword = (
  firstPassword: string,
  secondPassword: string,
) => {
  return firstPassword === secondPassword;
};
