import { Request, Response } from "express";
import { prisma } from "../config/database";

export class HealthController {
  static async check(req: Request, res: Response) {
    try {
      await prisma.user.findFirst();
      res.json({
        status: "OK",
        database: "Connected",
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      res.status(503).json({
        status: "Error",
        database: "Disconnected",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}
