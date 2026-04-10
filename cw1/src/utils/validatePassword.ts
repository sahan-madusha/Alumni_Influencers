import PasswordValidator from "password-validator";

const schema = new PasswordValidator();

schema
  .is().min(8)      
  .is().max(100)    
  .has().uppercase()
  .has().lowercase()
  .has().digits(1)  
  .has().symbols(1) 
  .has().not().spaces();

export const validatePassword = (password: string): boolean => {
  return schema.validate(password) as boolean;
};