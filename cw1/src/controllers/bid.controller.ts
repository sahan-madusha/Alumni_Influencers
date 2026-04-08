import { Request, Response, NextFunction } from "express";
import { bidService } from "../service/bid.service";

export const bidController = {
  placeBid: async (req: Request, res: Response, next: NextFunction) => {

    try {
      const userId = req.user?.id;
      if (!userId) throw new Error("User not authenticated");

      const { amount } = req.body;
      const bid = await bidService.placeBid(userId, amount);

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

  getRemainingSlots: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) throw new Error("User not authenticated");

      const slots = await bidService.getRemainingSlots(userId);

      res.json({
        success: true,
        data: { remainingSlots: slots },
      });
    } catch (error) {
      next(error);
    }
  },

  triggerSelection: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await bidService.processDailyWinner();
      res.json({
        success: true,
        message: "Daily winner selection processed successfully.",
      });
    } catch (error) {
      next(error);
    }
  },
};
