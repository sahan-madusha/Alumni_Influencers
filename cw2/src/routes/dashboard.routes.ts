import { Router } from "express";
import { dashboardController } from "../controllers";
import { protect } from "../middlewares";

const router = Router();

router.get("/", dashboardController.renderDashboard);

export const dashboardRoutes = router;
