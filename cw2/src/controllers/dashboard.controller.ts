import { Request, Response } from "express";
import { dashboardService } from "../service";

export const dashboardController = {
  renderDashboard: async (req: Request, res: Response) => {
    try {
      const { programme, year, sector } = req.query;
      const profiles = await dashboardService.getDashboardData({
        programme: programme as string,
        year: year as string,
        sector: sector as string,
      });
      const analytics = await dashboardService.getAnalyticsData();
      res.render("dashboard", { profiles, analytics, filters: req.query });
    } catch (error) {
      console.error("Dashboard error:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  renderGraphs: async (req: Request, res: Response) => {
    try {
      const analytics = await dashboardService.getAnalyticsData();
      res.render("graphs", { analytics });
    } catch (error) {
      console.error("Graphs error:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  renderUsage: async (req: Request, res: Response) => {
    try {
      const stats = await dashboardService.getUsageStats();
      res.render("usage", { stats });
    } catch (error) {
      console.error("Usage stats error:", error);
      res.status(500).send("Internal Server Error");
    }
  },
};
