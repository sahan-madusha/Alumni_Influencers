import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "52125952d7ce2f4422e519bd4907a3c316a7e089600115370d06900f86580f48";
const JWT_EXPIRES_IN = "10h";

export const generateToken = (user: {
  id: string;
  email: string;
  name: string;
  role: string;
  instituteId?: string;
}) => {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    instituteId: user.instituteId,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  return token;
};

export const generateHashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};