import { Router } from "express";
import { dashboardController } from "../controllers";

const router = Router();

router.get("/", dashboardController.renderDashboard);

export const dashboardRoutes = router;
