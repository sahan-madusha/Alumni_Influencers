import { Request, Response } from "express";
import { dashboardService } from "../service";

export const dashboardController = {
  renderDashboard: async (req: Request, res: Response) => {
    try {
      const profiles = await dashboardService.getDashboardData();
      res.render("dashboard", { profiles });
    } catch (error) {
      console.error("Dashboard error:", error);
      res.status(500).send("Internal Server Error");
    }
  },
};
