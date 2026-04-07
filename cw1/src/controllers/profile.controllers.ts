import { NextFunction, Request, Response } from "express";
import { profileService } from "../service";

export const profileController = {
  getProfile: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;

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

  updateProfile: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      const profileData = req.body;

      if (!userId) {
        throw new Error("User not found in request");
      }

      const updatedProfile = await profileService.updateProfile(
        userId,
        profileData,
      );

      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: updatedProfile,
      });
    } catch (error: any) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }
  },

  uploadProfilePicture: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      const file = req.file;

      if (!userId) {
        throw new Error("User not found in request");
      }

      if (!file) {
        return res.status(400).json({
          success: false,
          message: "Please upload a file",
        });
      }

      const updatedProfile = await profileService.updateProfilePicture(userId, file.filename);

      return res.status(200).json({
        success: true,
        message: "Profile picture uploaded successfully",
        data: {
          profilePicture: updatedProfile.profilePicture,
          url: `/uploads/${file.filename}`,
        },
      });
    } catch (error: any) {
      next(error);
    }
  },
};

