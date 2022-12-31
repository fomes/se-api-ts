import bcrypt from "bcrypt";

export const createPassword = async (password: string) => {
  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(password, saltRounds);

  return String(hashPassword);
};

export const validatePassord = async (
  password: string,
  hashPassword: string
) => {
  const isMatch = await bcrypt.compare(password, hashPassword);

  return isMatch;
};
