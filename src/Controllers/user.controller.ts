import { Request, Response, NextFunction } from "express";
import { userService } from "../service/user.service";
import { CreateUserDTO } from "../models/user.model";

export const userController = {
  getAllUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await userService.findAllUsers();
      res.json({
        success: true,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  },

  registerUser: async (
    req: Request<CreateUserDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { email, password, name } = req.body;
      const user = await userService.createUser({ email, password, name });

      return res.status(201).json({
        success: true,
        data: user,
        message: "User registered successfully",
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  loginUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new Error("Please provide email and password");
      }

      const user = await userService.findUserByEmail(email);

      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
};
