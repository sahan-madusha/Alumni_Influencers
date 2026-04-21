import { Request, Response, NextFunction } from "express";
import { bidService } from "../service/bid.service";

export const bidController = {
  createBid: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new Error("User not authenticated");

      const { amount } = req.body;
      const bid = await bidService.createBid(userId, amount);

      res.status(201).json({
        success: true,
        message: "Bid placed successfully",
        data: bid,
      });
    } catch (error) {
      next(error);
    }
  },

  updateBid: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new Error("User not authenticated");

      const { amount } = req.body;
      const bid = await bidService.updateBid(userId, amount);

      res.json({
        success: true,
        message: "Bid updated successfully",
        data: bid,
      });
    } catch (error) {
      next(error);
    }
  },

  cancelBid: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new Error("User not authenticated");

      await bidService.cancelBid(userId);

      res.json({
        success: true,
        message: "Bid cancelled successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  getBidStatus: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new Error("User not authenticated");

      const status = await bidService.getBidStatus(userId);

      res.json({
        success: true,
        data: status,
      });
    } catch (error) {
      next(error);
    }
  },

  getRemainingLimit: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new Error("User not authenticated");

      const limit = await bidService.getRemainingLimit(userId);

      res.json({
        success: true,
        data: { remainingLimit: limit },
      });
    } catch (error) {
      next(error);
    }
  },

  getBidingHistory: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new Error("User not authenticated");

      const history = await bidService.getBidHistory(userId);

      res.json({
        success: true,
        data: history,
      });
    } catch (error) {
      next(error);
    }
  },

  getAlumniOfTheDay: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const alumni = await bidService.getAlumniOfTheDay();
      res.json({
        success: true,
        data: alumni,
      });
    } catch (error) {
      next(error);
    }
  },

  getTomorrowSlotStatus: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const status = await bidService.getTomorrowSlotStatus();
      res.json({
        success: true,
        data: status,
      });
    } catch (error) {
      next(error);
    }
  },
};
