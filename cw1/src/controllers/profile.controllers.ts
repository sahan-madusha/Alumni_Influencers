import { NextFunction, Request, Response } from "express";
import { profileService } from "../service";

export const profileController = {
  getProfile: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;

      console.log(userId);

      if (!userId) {
        throw new Error("User not found in request");
      }

      const profile = await profileService.getProfile(userId);
      return res.status(200).json({
        success: true,
        message: "Profile fetched successfully",
        data: profile,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};
