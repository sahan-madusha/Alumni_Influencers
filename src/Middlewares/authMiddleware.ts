import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface UserPayload {
  id: string;
  email: string;
  role: string;
  instituteId: string | null;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET not defined");
}

export const protect = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Not authorized",
      section: "AUTH",
    });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
    next();
  } catch {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Invalid token",
      section: "AUTH",
    });
  }
};


export const authorize = (...roles: string[]) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        statusCode: 403,
        message: "Not authorized to access this route",
        section: "AUTH",
      });
    }
    next();
  };
};
