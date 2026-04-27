import { Router } from "express";
import { dashboardController } from "../controllers";

const router = Router();

router.get(
  "/",
  dashboardController.renderDashboard,
  /* 
    #swagger.tags = ['Dashboard']
    #swagger.description = 'Render the University Analytics Dashboard view.'
  */
);
router.get(
  "/graphs",
  dashboardController.renderGraphs,
  /* 
    #swagger.tags = ['Dashboard']
    #swagger.description = 'Render the Advanced Analytics Graphs view.'
  */
);
router.get(
  "/usage",
  dashboardController.renderUsage,
  /* 
    #swagger.tags = ['Dashboard']
    #swagger.description = 'Render the System Usage Statistics view.'
  */
);

export const dashboardRoutes = router;
