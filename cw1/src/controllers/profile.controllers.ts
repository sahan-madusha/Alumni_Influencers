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

  addDegree: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new Error("User not found");
      const degree = await profileService.addDegree(userId, req.body);
      return res.status(201).json({ success: true, data: degree });
    } catch (error: any) {
      next(error);
    }
  },

  updateDegree: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new Error("User not found");
      const degree = await profileService.updateDegree(
        userId,
        req.params.id,
        req.body,
      );
      return res.status(200).json({ success: true, data: degree });
    } catch (error: any) {
      next(error);
    }
  },

  deleteDegree: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new Error("User not found");
      await profileService.deleteDegree(userId, req.params.id);
      return res.status(200).json({ success: true, message: "Degree deleted" });
    } catch (error: any) {
      next(error);
    }
  },

  addEmployment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new Error("User not found");
      const employment = await profileService.addEmployment(userId, req.body);
      return res.status(201).json({ success: true, data: employment });
    } catch (error: any) {
      next(error);
    }
  },

  updateEmployment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new Error("User not found");
      const employment = await profileService.updateEmployment(
        userId,
        req.params.id,
        req.body,
      );
      return res.status(200).json({ success: true, data: employment });
    } catch (error: any) {
      next(error);
    }
  },

  deleteEmployment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new Error("User not found");
      await profileService.deleteEmployment(userId, req.params.id);
      return res
        .status(200)
        .json({ success: true, message: "Employment deleted" });
    } catch (error: any) {
      next(error);
    }
  },

  addCertification: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new Error("User not found");
      const certification = await profileService.addCertification(
        userId,
        req.body,
      );
      return res.status(201).json({ success: true, data: certification });
    } catch (error: any) {
      next(error);
    }
  },

  updateCertification: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new Error("User not found");
      const certification = await profileService.updateCertification(
        userId,
        req.params.id,
        req.body,
      );
      return res.status(200).json({ success: true, data: certification });
    } catch (error: any) {
      next(error);
    }
  },

  deleteCertification: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new Error("User not found");
      await profileService.deleteCertification(userId, req.params.id);
      return res
        .status(200)
        .json({ success: true, message: "Certification deleted" });
    } catch (error: any) {
      next(error);
    }
  },

  addLicense: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new Error("User not found");
      const license = await profileService.addLicense(userId, req.body);
      return res.status(201).json({ success: true, data: license });
    } catch (error: any) {
      next(error);
    }
  },

  updateLicense: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new Error("User not found");
      const license = await profileService.updateLicense(
        userId,
        req.params.id,
        req.body,
      );
      return res.status(200).json({ success: true, data: license });
    } catch (error: any) {
      next(error);
    }
  },

  deleteLicense: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new Error("User not found");
      await profileService.deleteLicense(userId, req.params.id);
      return res.status(200).json({ success: true, message: "License deleted" });
    } catch (error: any) {
      next(error);
    }
  },
};


