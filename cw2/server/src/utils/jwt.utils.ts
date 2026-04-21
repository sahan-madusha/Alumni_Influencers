import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const generateToken = (id: string): string => {
  return jwt.sign({ id }, JWT_SECRET as string, {
    expiresIn: "1d",
  });
};
