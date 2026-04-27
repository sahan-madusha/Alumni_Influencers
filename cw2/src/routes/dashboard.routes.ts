import { Router } from "express";
import { dashboardController } from "../controllers";

const router = Router();

router.get("/", dashboardController.renderDashboard);
router.get("/graphs", dashboardController.renderGraphs);
router.get("/usage", dashboardController.renderUsage);

export const dashboardRoutes = router;
