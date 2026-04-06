import { Request, Response, NextFunction } from "express";
import { userModel } from "../models/user.model";

export const userController = {
  getAllUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await userModel.findAllUsers();
      res.json({
        success: true,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  },

  registerUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, name } = req.body;
      
      const userExists = await userModel.findUserByEmail(email);
      if (userExists) {
        throw new Error("User already exists");
      }
      
      const user = await userModel.saveUser({ email, password, name });
      res.status(201).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
};
