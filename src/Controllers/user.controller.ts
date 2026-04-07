import { Request, Response, NextFunction } from "express";
import { userService } from "../service/user.service";
import {
  CreateUserDTO,
  VerifyEmailDTO,
  LoginDTO,
  RequestPasswordResetDTO,
  ResetPasswordDTO,
} from "../models/user.model";

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
    req: Request<any, any, CreateUserDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { email, password, name } = req.body;
      const user = await userService.createUser({ email, password, name });

      return res.status(201).json({
        success: true,
        data: user,
        message: "User registered successfully.Please verify your email",
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  loginUser: async (
    req: Request<any, any, LoginDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { email, password } = req.body;

      const result = await userService.loginUser({ email, password });

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  },

  verifyEmail: async (
    req: Request<any, any, VerifyEmailDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id, token } = req.body;

      const user = await userService.verifyEmail(id, token);
      return res.status(200).json({
        success: true,
        data: user,
        message: "Email verified successfully",
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  logoutUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new Error("User not found in request");
      }

      await userService.logoutUser(userId);

      return res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  requestPasswordReset: async (
    req: Request<any, any, RequestPasswordResetDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { email } = req.body;
      const token = await userService.requestPasswordReset(email);

      return res.status(200).json({
        success: true,
        message: "Password reset token generated",
        data: { token },
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  resetPassword: async (
    req: Request<any, any, ResetPasswordDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id, token, password } = req.body;
      if (!token || !id || !password) {
        throw new Error("ID, Token, and Password are required");
      }

      await userService.verifyResetToken(id, token, password);

      return res.status(200).json({
        success: true,
        message: "Password has been reset successfully",
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};
