import PasswordValidator from "password-validator";

const schema = new PasswordValidator();

schema
  .is().min(4)      
  .has().not().spaces();

export const validatePassword = (password: string): boolean => {
  return schema.validate(password) as boolean;
};