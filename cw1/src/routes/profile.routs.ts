import { Router } from "express";
import { protect } from "../middlewares";
import { profileController } from "../controllers";

const router = Router();

router.get(
    "/",
    protect,
    profileController.getProfile,
    /* 
      #swagger.tags = ['User']
      #swagger.description = 'Retrieve a list of all users. Required authorization.'
    */
);

export const profileRoutes = router;